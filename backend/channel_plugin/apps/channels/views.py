import asyncio

import requests
from apps.centri.helperfuncs import build_room_name
from apps.centri.signals.async_signal import request_finished
from apps.channelmembers.views import ChannelMemberViewset
from apps.channelmessages.views import ChannelMessageViewset
from apps.utils.serializers import ErrorSerializer
from django.shortcuts import render
from django.utils.timezone import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, throttling
from rest_framework.decorators import action, throttle_classes

from channel_plugin.utils.custome_response import Response as Custom_Response
from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import AsyncRequest
from channel_plugin.utils.mixins import AsycViewMixin
from channel_plugin.utils.wrappers import OrderMixin

from .serializers import (
    ChannelAllFilesSerializer,
    ChannelGetSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    RoomSerializer,
    SocketSerializer,
    UserChannelGetSerializer,
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
                    member_id=result.get("owner"),
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
    async def create_room(self, request, org_id, member_id):
        serializer = RoomSerializer(data=request.data)
        # serializer.is_valid(raise_exception=True)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as exc:
            return self.get_exception_response(exc, request)

        channel_serializer = serializer.convert_to_channel_serializer()
        channel_serializer.is_valid(raise_exception=True)
        channel = channel_serializer.data.get("channel")
        result = await channel.create(serializer.data.get("org_id"))
        status_code = status.HTTP_404_NOT_FOUND

        if result.__contains__("_id"):
            loop = asyncio.get_event_loop()
            loop.create_task(
                request_finished.send(
                    sender=str,
                    dispatch_uid="UpdateSidebarSignal",
                    org_id=channel_serializer.data.get("org_id"),
                    user_id=result.get("owner"),
                    room_id=result.get("_id"),
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
            return Custom_Response(
                result, status=status_code, request=request, view=self
            )
        return Custom_Response(list(), status=status_code, request=request, view=self)

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
                return Custom_Response(
                    result, status=status_code, request=request, view=self
                )
        return Custom_Response(dict(), status=status_code, request=request, view=self)

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
        # serializer.is_valid(raise_exception=True)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as exc:
            return self.get_exception_response(exc, request)

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
        # manual_parameters=[
        #     openapi.Parameter(
        #         "user_id",
        #         openapi.IN_QUERY,
        #         description="User ID (Admin)",
        #         required=True,
        #         type=openapi.TYPE_STRING,
        #     )
        # ],
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

            return Custom_Response(
                result, status=status_code, request=request, view=self
            )
        return Custom_Response(list(), status=status_code, request=request, view=self)

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
            # serializer.is_valid(raise_exception=True)
            try:
                serializer.is_valid(raise_exception=True)
            except Exception as exc:
                return self.get_exception_response(exc, request)

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

    @swagger_auto_schema(
        operation_id="workspace_channeld",
        responses={
            200: openapi.Response("Response", ChannelGetSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(methods=["GET"], detail=False)
    async def workspace_channel_all(self, request, org_id):
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
                    channel_id = channel["_id"]
                    channel_created_on = channel["created_on"]
                    last_message_timestamp = (
                        ChannelMessageViewset.last_message_instance(
                            self, request, org_id, channel_id, channel_created_on
                        )
                    )

                    result[i].update(
                        {"last_active": last_message_timestamp.data["timestamp"]}
                    )
                    result[i].update(
                        {"message_count": last_message_timestamp.data["message_count"]}
                    )

                result = self.perform_ordering(request, result)
            status_code = status.HTTP_200_OK
            return Custom_Response(
                result, status=status_code, request=request, view=self
            )
        return Custom_Response(list(), status=status_code, request=request, view=self)


channel_list_create_view = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

create_room_view = ChannelViewset.as_view({"post": "create_room"})

workspace_channel_view = ChannelViewset.as_view({"get": "workspace_channel_all"})

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
