import asyncio

import requests
from apps.centri.helperfuncs import build_room_name
from apps.centri.signals.async_signal import request_finished
from apps.utils.serializers import ErrorSerializer
from django.shortcuts import render
from django.utils.timezone import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, throttling
from rest_framework.decorators import action, throttle_classes
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.custome_response import Response as Custom_Response
from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import AsyncRequest, Request
from channel_plugin.utils.mixins import AsycViewMixin
from channel_plugin.utils.wrappers import OrderMixin

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelAllFilesSerializer,
    ChannelGetSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    NotificationsSettingSerializer,
    RoomSerializer,
    SocketSerializer,
    UserChannelGetSerializer,
    UserSerializer,
)

# Create your views here.


class ChannelViewset(AsycViewMixin, ThrottledViewSet, OrderMixin):

    OrderingFields = {"members": int, "created_on": datetime.fromisoformat}

    @swagger_auto_schema(
        operation_id="create-channel",
        request_body=ChannelSerializer,
        responses={
            201: openapi.Response("Response", ChannelUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @throttle_classes([throttling.AnonRateThrottle])
    @action(
        methods=["POST"],
        detail=False,
    )
    async def channels(self, request, org_id):

        """
        This creates a channel for a
        particular organization identified by ID and creates corresponding Centrifugo room
        ```bash
        curl -X POST "{baseUrl}/v1/{org_id}/channels/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{  \"name\": \"channel name\",  \"owner\": \"member_id\", \"description\": \"channel description\",  \"private\": false, \"default\":false,  \"topic\": \"channel topic\"}"
        ```
        """  # noqa
        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as exc:
            return self.get_exception_response(exc, request)

        channel = serializer.data.get("channel")
        result = await channel.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            result.update({"members": len(result["users"].keys())})
            loop = asyncio.get_event_loop()
            loop.create_task(
                request_finished.send(
                    sender=None,
                    dispatch_uid="UpdateSidebarSignal",
                    org_id=org_id,
                    user_id=result.get("owner"),
                )
            )
            status_code = status.HTTP_201_CREATED
        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        operation_id="create-room",
        request_body=RoomSerializer,
        responses={
            201: openapi.Response("Response", RoomSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @throttle_classes([throttling.AnonRateThrottle])
    @action(
        methods=["POST"],
        detail=False,
    )
    async def create_room(self, request, org_id=None):
        serializer = RoomSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        channel_serializer = serializer.convert_to_channel_serializer()
        channel_serializer.is_valid(raise_exception=True)
        channel = channel_serializer.data.get("channel")
        result = await channel.create(serializer.data.get("ord_id"))
        status_code = status.HTTP_404_NOT_FOUND

        if result.__contains__("_id"):
            loop = asyncio.get_event_loop()
            loop.create_task(
                request_finished.send(
                    sender=str,
                    dispatch_uid="UpdateSidebarSignal",
                    org_id=channel_serializer.data.get("ord_id"),
                    user_id=result.get("owner"),
                )
            )

            status_code = status.HTTP_201_CREATED
            return Custom_Response(
                serializer.data, status=status_code, request=request, view=self
            )
        else:
            return Custom_Response(
                result, status=status_code, request=request, view=self
            )

    @swagger_auto_schema(
        operation_id="retrieve-channels",
        responses={
            200: openapi.Response("Response", ChannelGetSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        manual_parameters=[
            openapi.Parameter(
                "order_by",
                openapi.IN_QUERY,
                description="property to use for payload ordering",
                required=False,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "ascending",
                openapi.IN_QUERY,
                description="direction to order payload ",
                required=False,
                type=openapi.TYPE_BOOLEAN,
            ),
        ],
    )
    @action(methods=["GET"], detail=False)
    async def channel_all(self, request, org_id):
        """Get all channels in the organization
        ```bash
        curl -X GET "{baseUrl}/v1/{org_id}/channels/" -H  "accept: application/json"
        ```
        """
        data = {}
        data.update(self._clean_query_params(request))
        result = await AsyncRequest.get(org_id, "channel", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if result:
                for i, channel in enumerate(result):
                    result[i].update({"members": len(channel["users"].keys())})
                result = self.perform_ordering(request, result)
            status_code = status.HTTP_200_OK
        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelAllFilesSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="list-all-channel-files",
    )
    @action(methods=["GET"], detail=False)
    async def channel_media_all(self, request, org_id, channel_id):
        """Retrieve all files in channel
        This endpoint retrieves a list of URLs for files/media that have been sen sent in a channel.
        Response is split into `channelmessage` and `thread` objects
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/files/" -H  "accept: application/json"
        ```
        """
        data = {"channel_id": channel_id, "has_files": "true", "type": "message"}
        data.update(dict(request.query_params))
        result = {}
        result_message = await AsyncRequest.get(org_id, "channelmessage", data) or []
        result_thread = await AsyncRequest.get(org_id, "thread", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        result_message = result_message if isinstance(result_message, list) else []
        result_thread = result_thread if isinstance(result_thread, list) else []

        message_response = list(
            map(
                lambda item: {
                    "timestamp": item["timestamp"],
                    "files": item["files"],
                    "message_id": item["_id"],
                    "user_id": item["user_id"],
                },
                result_message,
            )
        )

        thread_response = list(
            map(
                lambda item: {
                    "timestamp": item["timestamp"],
                    "files": item["files"],
                    "message_id": item["_id"],
                    "user_id": item["user_id"],
                },
                result_thread,
            )
        )

        result.update(
            {
                "message": "Successfully Retrieved"
                if len(message_response) + len(thread_response) > 1
                else "There are no files in this channel",
                "channelfiles": message_response,
                "threadfiles": thread_response,
            }
        )
        status_code = status.HTTP_200_OK
        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        operation_id="retrieve-channel-details",
        responses={
            200: openapi.Response("Response", ChannelGetSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    async def channel_retrieve(self, request, org_id, channel_id):
        """Get channel details
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
        ```
        """
        data = {"_id": channel_id}
        result = await AsyncRequest.get(org_id, "channel", data) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            if result.__contains__("_id"):
                result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        operation_id="update-channel-details",
        request_body=ChannelUpdateSerializer,
        responses={
            200: openapi.Response("Response", ChannelGetSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    async def channel_update(self, request, org_id, channel_id):
        """Update channel details
        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{  \"name\": \"channel name\",  \"description\": \"channel description\",  \"private\": false,  \"archived\": false,  \"topic\": \"channel topic\",  \"starred\": false}"
        ```
        """  # noqa
        serializer = ChannelUpdateSerializer(
            data=request.data, context={"org_id": org_id, "_id": channel_id}
        )
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("channel")
        result = (
            await AsyncRequest.put(org_id, "channel", payload, object_id=channel_id)
            or {}
        )
        status_code = status.HTTP_404_NOT_FOUND
        if (
            result.__contains__("_id")
            or isinstance(result, dict)
            and not result.__contains__("error")
        ):
            if result.__contains__("_id"):
                result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        operation_id="delete-channel",
        responses={
            204: openapi.Response("Channel deleted successfully"),
            404: openapi.Response("Not found"),
        },
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            )
        ],
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    async def channel_delete(self, request, org_id, channel_id):
        """Delete a channel
        This endpoint deletes a channel and its related objects: messages, roles and threads
        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
        ```
        """
        result = await AsyncRequest.delete(org_id, "channel", object_id=channel_id)

        # delete relationships
        if result.get("status") == 200:
            loop = asyncio.get_event_loop()
            loop.create_task(
                request_finished.send(
                    sender=None,
                    dispatch_uid="UpdateSidebarSignal",
                    org_id=org_id,
                    user_id=request.query_params.get("user_id", None),
                )
            )

            if result.get("data", {}).get("deleted_count") > 0:

                async def delete():
                    await AsyncRequest.delete(
                        org_id, "channelmessage", data_filter={"channel_id": channel_id}
                    )
                    await AsyncRequest.delete(
                        org_id, "thread", data_filter={"channel_id": channel_id}
                    )
                    await AsyncRequest.delete(
                        org_id, "role", data_filter={"channel_id": channel_id}
                    )
                    await AsyncRequest.delete(
                        org_id, "thread", data_filter={"channel_id": channel_id}
                    )
                    await AsyncRequest.delete(
                        org_id, "role", data_filter={"channel_id": channel_id}
                    )

                loop = asyncio.get_event_loop()
                loop.create_task(delete())
        return Custom_Response(
            status=status.HTTP_204_NO_CONTENT, request=request, view=self
        )

    @swagger_auto_schema(
        operation_id="retrieve-user-channels",
        responses={
            200: openapi.Response("Response", UserChannelGetSerializer(many=True)),
            204: openapi.Response("User does not belong to any channel"),
            400: openapi.Response("Not found", ErrorSerializer),
        },
    )
    @action(methods=["GET"], detail=False)
    async def user_channel_retrieve(self, request, org_id, user_id):
        """Retrieve list of channels a user belongs to
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/users/{{user_id}}/" -H  "accept: application/json"
        ```
        """
        data = {}
        data.update(dict(request.query_params))
        response = await AsyncRequest.get(org_id, "channel", data) or []
        result = []
        status_code = status.HTTP_400_BAD_REQUEST
        if isinstance(response, list):
            status_code = (
                status.HTTP_200_OK if len(response) > 0 else status.HTTP_204_NO_CONTENT
            )
            result = list(
                map(
                    lambda item: {
                        "_id": item.get("_id"),
                        "name": item.get("name"),
                        "description": item.get("description"),
                    },
                    list(
                        filter(
                            lambda item: user_id in item.get("users", {}).keys(),
                            response,
                        )
                    ),
                )
            )

        return Custom_Response(result, status=status_code, request=request, view=self)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", SocketSerializer()),
            404: openapi.Response("Not found"),
        },
        operation_id="retrieve-channel-socket-name",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    async def get_channel_socket_name(self, request, org_id, channel_id):
        """
        Retrieve Centrifugo socket channel name based on organisation and channel IDs
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/socket/" -H  "accept: application/json"
        ```
        """
        channel = await ChannelMemberViewset.retrieve_channel(
            request, org_id, channel_id
        )
        data = {
            "socket_name": build_room_name(org_id, channel_id),
            "channel_id": channel_id,
        }
        if channel:
            serializer = SocketSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            return Custom_Response(
                serializer.data, status=status.HTTP_200_OK, request=request, view=self
            )
        else:
            return Custom_Response(
                {"error": "Channel not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )


channel_list_create_view = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

create_room_view = ChannelViewset.as_view({"post": "create_room"})

channel_retrieve_update_delete_view = ChannelViewset.as_view(
    {"get": "channel_retrieve", "put": "channel_update", "delete": "channel_delete"}
)

channel_media_all_view = ChannelViewset.as_view(
    {
        "get": "channel_media_all",
    }
)

user_channel_list = ChannelViewset.as_view(
    {
        "get": "user_channel_retrieve",
    }
)

channel_socket_view = ChannelViewset.as_view({"get": "get_channel_socket_name"})


class ChannelMemberViewset(AsycViewMixin, ViewSet):
    def validate_name(self, name):
        return name

    @staticmethod
    async def retrieve_channel(request, org_id, channel_id):
        """
        This method retrieves a channel's data
        from zc-core
        """
        data = {"_id": channel_id}
        result = await AsyncRequest.get(org_id, "channel", data) or {}
        if result.__contains__("_id") and isinstance(result, dict):
            return result
        return {}

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", NotificationsSettingSerializer),
            404: openapi.Response("Not Found"),
        },
        operation_id="retrieve-user-notifications",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    async def retrieve_notification(self, request, org_id, channel_id, member_id):
        """Retrieve user notification preferences for channel
        bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/" -H  "accept: application/json"
        """  # noqa
        channel = await self.retrieve_channel(request, org_id, channel_id)
        if channel.__contains__("_id"):
            user_data = channel["users"].get(member_id)
            if user_data:
                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)

                # an empty field will be returned for users that have not
                # changed their settings.
                FACTORY_SETTINGS = {
                    "web": "nothing",
                    "mobile": "mentions",
                    "same_for_mobile": False,
                    "mute": False,
                }

                settings = serializer.data.get("notifications", FACTORY_SETTINGS)
                return Custom_Response(
                    settings, status=status.HTTP_200_OK, request=request, view=self
                )

            return Custom_Response(
                {"error": "member not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )
        return Custom_Response(
            {"error": "channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        request_body=NotificationsSettingSerializer,
        responses={
            200: openapi.Response(
                "Response",
                NotificationsSettingSerializer,
            )
        },
        operation_id="update-user-notifications",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    async def update_notification(self, request, org_id, channel_id, member_id):
        """Update user notification preferences for a channel
        bash
        curl -X PUT "{{baseUrl}}v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"web\": \"all\",
                \"mobile\": \"all\",
                \"same_for_mobile\": true,
                \"mute\": true
            }"
        """

        channel = await self.retrieve_channel(request, org_id, channel_id)
        if channel.__contains__("_id"):
            user_data = channel["users"].get(member_id)

            if user_data:
                serializer = NotificationsSettingSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                # by default, users do not have a settings field
                # whether or not this user has a settings field,
                # make an update with the new settings
                notification_settings = dict(serializer.data)
                user_data.setdefault("notifications", {}).update(notification_settings)

                # push the updated user details to the channel object
                channel["users"].update({f"{member_id}": user_data})

                # remove channel id to avoid changing it
                channel.pop("_id", None)

                payload = {"users": channel["users"]}
                result = Request.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if result:
                    if isinstance(result, dict):
                        data = (
                            notification_settings if not result.get("error") else result
                        )
                        status_code = (
                            status.HTTP_201_CREATED
                            if not result.get("error")
                            else status.HTTP_400_BAD_REQUEST
                        )

                        return Custom_Response(
                            data, status=status_code, request=request, view=self
                        )
                    else:
                        return Custom_Response(
                            result,
                            status=result.status_code,
                            request=request,
                            view=self,
                        )

            return Custom_Response(
                {"error": "member not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )
        return Custom_Response(
            {"error": "channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            400: openapi.Response("Error Response"),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="add-channel-members",
        # manual_parameters=[
        #     openapi.Parameter(
        #         "user_id",
        #         openapi.IN_QUERY,
        #         description="User ID (id of active user)",
        #         required=True,
        #         type=openapi.TYPE_STRING,
        #     ),
        # ],
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    async def add_member(self, request, org_id, channel_id):
        """
        This method adds one or more users to a channel
        A JOIN event is published to Centrifugo when users are added to the channel
        **Add one user**
        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{\"_id\": \"string\",
            \"role_id\": \"string\",
            \"is_admin\": false,
            \"notifications\": {
                 \"web\": \"nothing\",
                 \"mobile\": \"mentions\",
                 \"same_for_mobile\": true,
                 \"mute\": false
                }
            }"
        ```
        **Add multiple users**
        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "[
                {\"_id\": \"string\",
                \"role_id\": \"string\",
                \"is_admin\": false,
                \"notifications\": {
                    \"web\": \"nothing\",
                    \"mobile\": \"mentions\",
                    \"same_for_mobile\": true,
                    \"mute\": false
                    }
                },
                {\"_id\": \"string\",
                \"role_id\": \"string\",
                \"is_admin\": false,
                \"notifications\": {
                    \"web\": \"nothing\",
                    \"mobile\": \"mentions\",
                    \"same_for_mobile\": true,
                    \"mute\": false
                    }
                },
                {\"_id\": \"string\",
                \"role_id\": \"string\",
                \"is_admin\": false,
                \"notifications\": {
                    \"web\": \"nothing\",
                    \"mobile\": \"mentions\",
                    \"same_for_mobile\": true,
                    \"mute\": false
                    }
                },
                ...
            ]"
        ```
        """
        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

            output = None

            # if multiple users are been added
            if isinstance(request.data, list):
                serializer = UserSerializer(data=request.data, many=True)
                serializer.is_valid(raise_exception=True)
                user_list = serializer.initial_data

                # add all users not in group
                for user in user_list:
                    if channel["users"].get(user["_id"]):
                        user_list.remove(user)
                    else:
                        channel["users"].update({f"{user['_id']}": user})

                output = user_list

            else:
                user_id = request.data.get("_id")
                user_data = channel["users"].get(user_id)

                if not user_data:
                    serializer = UserSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    user_data = serializer.data

                    # add user to the channel
                    channel["users"].update({f"{user_data['_id']}": serializer.data})

                    output = user_data
                else:
                    return Custom_Response(
                        user_data, status=status.HTTP_200_OK, request=request, view=self
                    )

            # remove channel ID to avoid changing it
            channel_id = channel.pop("_id", None)

            # only update user dict
            payload = {"users": channel["users"]}

            result = Request.put(
                org_id, "channel", payload=payload, object_id=channel_id
            )

            if isinstance(result, dict):
                if not result.get("error"):
                    if isinstance(output, dict):
                        # when only one user is added
                        loop = asyncio.get_event_loop()
                        loop.create_task(
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_id=channel_id,
                                user=output,
                            )
                        )
                        loop.create_task(
                            request_finished.send(
                                sender=None,
                                dispatch_uid="UpdateSidebarSignal",
                                org_id=org_id,
                                user_id=user.get("_id"),
                            )
                        )

                    else:
                        # when output is a list multiple users where added
                        loop = asyncio.get_event_loop()
                        loop.create_task(
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_id=channel_id,
                                # added_by=request.query_params.get("user_id"),
                                added=output,
                            )
                        )
                    status_code = (
                        status.HTTP_201_CREATED if output else status.HTTP_200_OK
                    )
                    return Custom_Response(
                        output, status=status_code, request=request, view=self
                    )
                else:
                    return Custom_Response(
                        result.get("error"),
                        status=status.HTTP_400_BAD_REQUEST,
                        request=request,
                        view=self,
                    )
            else:
                return Custom_Response(
                    result, status=result.status_code, request=request, view=self
                )
        return Custom_Response(
            {"error": "channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="channel-member-can-input",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    async def can_input(self, request, org_id, channel_id):
        """Check if input is enabled for users
        This checks if a user input should be disabled or enabled, i.e \
        should users be able to send messages in the channel or not.
        (incomplete doc)
        ```bash
        curl -X POST "{{baseUrl}}/api/v1/{{org_id}}/channels/{{channel_id}}/members/can_input/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"_id\": \"string\",
                \"role_id\": \"string\",
                \"is_admin\": false,
                \"notifications\": { }
            }"
        ```
        """
        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):
            if channel["allow_members_input"] is True:
                can_input = True
                return Custom_Response(
                    can_input, status=status.HTTP_200_OK, request=request, view=self
                )
            else:
                user_id = request.data.get("_id")
                user_data = channel["users"].get(user_id)

                if user_data:
                    # Check if user is an admin
                    can_input = True if user_data.is_admin else False
                    return Custom_Response(
                        can_input, status=status.HTTP_200_OK, request=request, view=self
                    )
                else:
                    return Custom_Response(
                        {"error": "channel not found"},
                        status=status.HTTP_404_NOT_FOUND,
                        request=request,
                        view=self,
                    )
        return Custom_Response(
            {"error": "channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        operation_id="list-channel-members",
        responses={
            200: openapi.Response("Response", UserSerializer(many=True)),
            404: openapi.Response("Not Found"),
        },
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    async def list_members(self, request, org_id, channel_id):
        """
        This method gets all members for a
        channel identified by ID
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/" -H  "accept: application/json"
        ```
        """

        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):
            users = list(channel.get("users", {}).values())
            serializer = UserSerializer(data=users, many=True)

            serializer.is_valid(raise_exception=True)
            return Custom_Response(
                serializer.data, status=status.HTTP_200_OK, request=request, view=self
            )

        return Custom_Response(
            {"error": "Channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Not Found"),
        },
        operation_id="retrieve-member-details",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    async def get_member(self, request, org_id, channel_id, member_id):
        """Get details of a channel member
        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
        ```
        """  # noqa
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

            # checks if the user is a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:
                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)
                return Custom_Response(
                    serializer.data,
                    status=status.HTTP_200_OK,
                    request=request,
                    view=self,
                )

            return Custom_Response(
                {"error": "member not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )

        return Custom_Response(
            {"error": "Channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            200: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Not found"),
        },
        operation_id="update-member-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    async def update_member(self, request, org_id, channel_id, member_id):
        """Update channel member details
        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{\"_id\": \"string\",
            \"role_id\": \"string\",
            \"is_admin\": false,
            \"notifications\": {
                 \"web\": \"nothing\",
                 \"mobile\": \"mentions\",
                 \"same_for_mobile\": true,
                 \"mute\": false
                }
            }"
        ```
        """
        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

            # check if the user is aleady a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:

                # update the users data
                for key in user_data.keys():
                    if key != "_id":
                        user_data[key] = request.data.get(key, user_data[key])

                if "starred" not in user_data.keys():
                    user_data["starred"] = request.data.get("starred", False)

                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)

                # add user to the channel
                channel["users"].update({f"{member_id}": serializer.data})

                # remove channel id to avoid changing it
                channel.pop("_id", None)

                payload = {"users": channel["users"]}

                result = await AsyncRequest.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if result:
                    if isinstance(result, dict):
                        data = user_data if not result.get("error") else result
                        status_code = (
                            status.HTTP_201_CREATED
                            if not result.get("error")
                            else status.HTTP_400_BAD_REQUEST
                        )

                        return Custom_Response(
                            data, status=status_code, request=request, view=self
                        )
                    else:
                        return Custom_Response(
                            result,
                            status=result.status_code,
                            request=request,
                            view=self,
                        )

            return Custom_Response(
                {"error": "member not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )
        return Custom_Response(
            {"error": "Channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        responses={
            204: openapi.Response("User removed successfully"),
            404: openapi.Response("Not found"),
        },
        operation_id="delete-member-details",
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    async def remove_member(self, request, org_id, channel_id, member_id):
        """Remove member from a channel
        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
        ```
        """  # noqa
        channel = await self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

            # check if the user is aleady a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:
                # Remove  the user from the channel
                del channel["users"][member_id]

                # send signal to centri app to left message centrifugo
                channel_id = channel.pop("_id", None)

                payload = {"users": channel["users"]}

                result = await AsyncRequest.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if isinstance(result, dict):
                    data = {"msg": "success"} if not result.get("error") else result

                    if not result.get("error"):
                        # when only one user is removed
                        loop = asyncio.get_event_loop()
                        loop.create_task(
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="LeftChannelSignal",
                                org_id=org_id,
                                channel_id=channel_id,
                                user=user_data.copy(),
                            )
                        )
                        loop.create_task(
                            request_finished.send(
                                sender=None,
                                dispatch_uid="UpdateSidebarSignal",
                                org_id=org_id,
                                user_id=user_data.get("_id"),
                            )
                        )

                    status_code = (
                        status.HTTP_204_NO_CONTENT
                        if not result.get("error")
                        else status.HTTP_400_BAD_REQUEST
                    )
                    return Custom_Response(
                        data, status=status_code, request=request, view=self
                    )

            return Custom_Response(
                {"error": "member not found"},
                status=status.HTTP_404_NOT_FOUND,
                request=request,
                view=self,
            )
        return Custom_Response(
            {"error": "Channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )


channel_members_can_input_view = ChannelMemberViewset.as_view(
    {
        "post": "can_input",
    }
)

notification_views = ChannelMemberViewset.as_view(
    {"get": "retrieve_notification", "put": "update_notification"}
)

channel_members_list_create_views = ChannelMemberViewset.as_view(
    {
        "get": "list_members",
        "post": "add_member",
    }
)

channel_members_update_retrieve_views = ChannelMemberViewset.as_view(
    {"get": "get_member", "put": "update_member", "delete": "remove_member"}
)


# @api_view(["POST", "GET"])
# # @permission_classes(["IsAdmin"])
# def handle_channel_permissions(request, org_id, channel_id):
#     if request.method == "GET":
#         data = find_match_in_db(
#             org_id, "channelpermissions", "channel_id", channel_id, return_data=True
#         )
#         return Response(data, status=status.HTTP_200_OK)
#     serializer = ChannelPermissions(data=request.data)
#     if serializer.is_valid():
#         payload = dict(serializer.validated_data)
#         payload.update({"channel_id": channel_id})
#         data = manage_channel_permissions(org_id, channel_id, payload)

#         return Response(data, status=status.HTTP_200_OK)
#     return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


def dms_test(request):

    url = "https://dm.zuri.chat//dmapi/v1/ping"
    try:
        response = requests.get(url, headers={"Content-Type": "application/json"})
        if response.status_code == 200:
            dms_server = "Active"

        else:
            dms_server = "Inactive"
    except:  # noqa
        dms_server = "Inactive"
    core_url = "https://api.zuri.chat/health"
    try:
        response = requests.get(core_url, headers={"Content-Type": "application/json"})
        if response.status_code == 200:
            core_server = "Active"
        else:
            core_server = "Inactive"

    except Exception:
        core_server = "Inactive"
    return render(
        request, "dms_test.html", {"dms_server": dms_server, "core_server": core_server}
    )
