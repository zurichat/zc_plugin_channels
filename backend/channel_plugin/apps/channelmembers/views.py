import asyncio

from apps.centri.signals.async_signal import request_finished
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.custome_response import Response as Custom_Response
from channel_plugin.utils.customrequest import AsyncRequest, Request
from channel_plugin.utils.mixins import AsycViewMixin

from .serializers import (
    AddRemoveMembersSerializer,
    JoinSerializer,
    NotificationsSettingSerializer,
    UserSerializer,
)

# Create your views here.

NOTIFICATION_FACTORY_SETTINGS = {
    "web": "nothing",
    "mobile": "mentions",
    "same_for_mobile": False,
    "mute": False,
}


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
                # serializer.is_valid(raise_exception=True)
                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)

                # an empty field will be returned for users that have not
                # changed their settings.

                settings = serializer.data.get(
                    "notifications", NOTIFICATION_FACTORY_SETTINGS
                )
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
                # serializer.is_valid(raise_exception=True)
                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)

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
                # serializer.is_valid(raise_exception=True)
                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)

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
                    # if user is not part of the channel
                    serializer = UserSerializer(data=request.data)
                    # serializer.is_valid(raise_exception=True)
                    try:
                        serializer.is_valid(raise_exception=True)
                    except Exception as exc:
                        return self.get_exception_response(exc, request)

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
                                user_id=output.get("_id"),
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
        request_body=JoinSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            400: openapi.Response("{}"),
        },
        operation_id="join-channel",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    async def join(self, request, org_id, channel_id):

        serializer = JoinSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as exc:
            return self.get_exception_response(exc, request)

        user_id = serializer.data.get("user_id")
        channel = await self.retrieve_channel(request, org_id, channel_id)
        if channel.__contains__("_id"):
            if not channel.get("private", True):
                if channel.get("users", {}).get(user_id) is None:
                    serializer = UserSerializer(
                        data={"_id": user_id, "notifications": {}}
                    )
                    try:
                        serializer.is_valid(raise_exception=True)
                    except Exception as exc:
                        return self.get_exception_response(exc, request)

                    channel["users"].update({user_id: serializer.data})

                    payload = {"users": channel["users"]}

                    result = Request.put(
                        org_id, "channel", payload=payload, object_id=channel_id
                    )

                    if isinstance(result, dict):
                        if not result.get("error"):
                            loop = asyncio.get_event_loop()
                            loop.create_task(
                                request_finished.send(
                                    sender=self.__class__,
                                    dispatch_uid="JoinedChannelSignal",
                                    org_id=org_id,
                                    channel_id=channel_id,
                                    # added_by=request.query_params.get("user_id"),
                                    user=user_id,
                                )
                            )

                            loop.create_task(
                                request_finished.send(
                                    sender=None,
                                    dispatch_uid="UpdateSidebarSignal",
                                    org_id=org_id,
                                    room_id=channel_id,
                                    user_id=user_id,
                                )
                            )

                            return Custom_Response(
                                serializer.data,
                                status=status.HTTP_201_CREATED,
                                request=request,
                                view=self,
                            )
        return Custom_Response(
            dict(), status=status.HTTP_400_BAD_REQUEST, request=request, view=self
        )

    @swagger_auto_schema(
        request_body=AddRemoveMembersSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            400: openapi.Response("Error Response"),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="add-room-members",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    async def add_members_to_room(self, request, org_id, room_id, member_id):
        """ """
        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, room_id)

        if channel.__contains__("_id"):
            serializer = AddRemoveMembersSerializer(data=request.data)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as exc:
                return self.get_exception_response(exc, request)

            data = serializer.data
            users = dict()
            tmp = data.get("member_ids")
            for _, id in enumerate(tmp):
                if channel.get("users", {}).get(id) is not None:
                    data["member_ids"].pop(_)
                    continue
                serializer = UserSerializer(data={"_id": id, "notifications": {}})

                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)
                users.update({id: serializer.data})

            if users:
                users_list = [v for k, v in users.items()]
                # add user to the channel
                channel["users"].update(users)

                #     # only update user dict
                payload = {"users": channel["users"]}

                result = Request.put(
                    org_id, "channel", payload=payload, object_id=room_id
                )

                if isinstance(result, dict):
                    if not result.get("error"):
                        loop = asyncio.get_event_loop()
                        loop.create_task(
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_id=room_id,
                                # added_by=request.query_params.get("user_id"),
                                added=users_list,
                            )
                        )

                        loop.create_task(
                            request_finished.send(
                                sender=None,
                                dispatch_uid="UpdateSidebarSignal",
                                org_id=org_id,
                                room_id=room_id,
                                user_id=list(
                                    map(lambda item: item.get("_id"), users_list)
                                ),
                            )
                        )

                        return Custom_Response(
                            users_list,
                            status=status.HTTP_201_CREATED,
                            request=request,
                            view=self,
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
            else:
                return Custom_Response(
                    {"msg": "All users added"}, status=200, request=request, view=self
                )
        return Custom_Response(
            {"error": "channel not found"},
            status=status.HTTP_404_NOT_FOUND,
            request=request,
            view=self,
        )

    @swagger_auto_schema(
        request_body=AddRemoveMembersSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            400: openapi.Response("Error Response"),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="remove-room-members",
    )
    @action(
        methods=["PATCH"],
        detail=False,
    )
    async def remove_members_from_room(self, request, org_id, room_id, member_id):
        """ """
        # get the channel from zc-core
        channel = await self.retrieve_channel(request, org_id, room_id)

        if channel.__contains__("_id"):
            serializer = AddRemoveMembersSerializer(data=request.data)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as exc:
                return self.get_exception_response(exc, request)

            data = serializer.data
            tmp = data.get("member_ids")
            users = []
            for _, id in enumerate(tmp):
                user = channel["users"].pop(id, None)
                if user is not None:
                    users.append(user.get("_id"))
            if users:
                #     # only update user dict
                payload = {"users": channel["users"]}

                result = await AsyncRequest.put(
                    org_id, "channel", payload=payload, object_id=room_id
                )

                if isinstance(result, dict):
                    if not result.get("error"):
                        loop = asyncio.get_event_loop()
                        loop.create_task(
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="LeftChannelSignal",
                                org_id=org_id,
                                channel_id=room_id,
                                # added_by=request.query_params.get("user_id"),
                                removed=users,
                            )
                        )
                        loop.create_task(
                            request_finished.send(
                                sender=None,
                                dispatch_uid="UpdateSidebarSignal",
                                org_id=org_id,
                                room_id=room_id,
                                user_id=users,
                            )
                        )
                        return Custom_Response(
                            users,
                            status=status.HTTP_200_OK,
                            request=request,
                            view=self,
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
                        result, status=result.status_code,
                        request=request,
                        view=self
                    )
            else:
                return Custom_Response(
                    list(),
                    status=status.HTTP_200_OK,
                    request=request,
                    view=self,
                )
        return Custom_Response(
            list(),
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

            # serializer.is_valid(raise_exception=True)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as exc:
                return self.get_exception_response(exc, request)

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
                # serializer.is_valid(raise_exception=True)
                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)

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

            # check if the user is already a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:

                # update the users data
                for key in user_data.keys():
                    if key != "_id":
                        user_data[key] = request.data.get(key, user_data[key])
                        if "starred" not in user_data.keys():
                            user_data["starred"] = request.data.get("starred", False)

                serializer = UserSerializer(data=user_data)
                # serializer.is_valid(raise_exception=True)
                try:
                    serializer.is_valid(raise_exception=True)
                except Exception as exc:
                    return self.get_exception_response(exc, request)

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

    @action(["PUT"],
            detail=False,
            )
    async def MemberStarredChannels(self, request, org_id, channel_id, member_id):
        """
        for starring and un-starring per workspace member
        it moves a member's starred channel to the sidebar starred list
        """
        channel = await self.retrieve_channel(request, org_id, channel_id)
        if channel:
            if member_id in channel["users"].keys():
                load = await channel["users"][member_id].get("starred")
                if load is None or True:
                    load = await channel["users"][member_id].pop("starred")
                    load["starred"] = request.data.get("starred", False)
                if load is False:
                    load = await channel["users"][member_id].pop("starred")
                    load["starred"] = request.data.get("starred", True)
                    serializer = UserSerializer(data=load)
                    # serializer.is_valid(raise_exception=True)
                    try:
                        serializer.is_valid(raise_exception=True)
                    except Exception as exc:
                        return self.get_exception_response(exc, request)

                    # add user to the channel
                    channel["users"].update({f"{member_id}": serializer.data})

                    # remove channel id to avoid changing it
                    channel.pop("_id", None)

                    payload = {"users": channel["users"]}

                    res = await AsyncRequest.put(
                        org_id, "channel", payload=payload, object_id=channel_id
                    )
                    if res:
                        if isinstance(res, dict):
                            data = load if not res.get("error") else res
                            loop = asyncio.get_event_loop()
                            loop.create_task(
                                request_finished.send(
                                    sender=None,
                                    dispatch_uid="UpdateSidebarSignal",
                                    org_id=org_id,
                                    user_id=member_id,
                                )
                            )
                            status_code = (
                                status.HTTP_201_CREATED
                                if not res.get("error")
                                else status.HTTP_400_BAD_REQUEST
                            )
                            return Custom_Response(
                                data, status=status_code, request=request, view=self
                            )
                        else:
                            return Custom_Response(
                                res,
                                status=res.status_code,
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
channel_member_join_view = ChannelMemberViewset.as_view(
    {
        "post": "join",
    }
)

channel_members_update_retrieve_views = ChannelMemberViewset.as_view(
    {"get": "get_member", "put": "update_member", "delete": "remove_member"}
)

channel_add_remove_member_to_room_view = ChannelMemberViewset.as_view(
    {"post": "add_members_to_room", "patch": "remove_members_from_room"}
)
starr_channel_view = ChannelMemberViewset.as_view(
    {"put": "MemberStarredChannels"}
)


