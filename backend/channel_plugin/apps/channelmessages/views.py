import json
from urllib.parse import urlencode

import requests
from apps.utils.serializers import ErrorSerializer
from django.conf import settings
from django.core.signals import request_finished
from django.utils.timezone import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, throttling
from rest_framework.decorators import action, api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from channel_plugin.utils.customexceptions import ThrottledViewSet

from channel_plugin.utils.customrequest import Request, search_db
from channel_plugin.utils.wrappers import OrderMixin

from .permissions import IsMember, IsOwner
from .serializers import (
    ChannelMessageReactionSerializer,
    ChannelMessageReactionsUpdateSerializer,
    ChannelMessageSearchResultSerializer,
    ChannelMessageSearchSerializer,
    ChannelMessageSerializer,
    ChannelMessageUpdateSerializer,
)

from apps.threads.serializers import ReactionSerializer




class ChannelMessageViewset(ThrottledViewSet, OrderMixin):
    
    OrderingFields = {
        "timestamp": datetime.fromisoformat,
        "replies":int,
    }

    authentication_classes = []

    def get_throttled_message(self, request):
        return "request limit exceeded"

    def get_permissions(self):

        """
        Instantiates and returns the list of permissions that this view requires.
        """

        permissions = super().get_permissions()
        if self.action in ["message", "message_delete", "message_update", "update_message_reaction"]:
            permissions.append(IsMember())
            if self.action in ["message_delete", "message_update"]:
                permissions.append(IsOwner())
        return permissions

    @swagger_auto_schema(
        operation_id="create-channel-message",
        request_body=ChannelMessageSerializer,
        responses={
            201: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @throttle_classes([throttling.AnonRateThrottle])
    @action(
        methods=["POST"],
        detail=False,
    )
    def message(self, request, org_id, channel_id):
        """
        Create a channel message and automatically publishes to Centrifugo


        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
        ```

        """
        serializer = ChannelMessageSerializer(
            data=request.data, context={"channel_id": channel_id, "org_id": org_id}
        )
        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("channelmessage")
        result = channelmessage.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            # call signal here
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="CreateMessageSignal",
                org_id=org_id,
                channel_id=channel_id,
                data=result,
            )
            status_code = status.HTTP_201_CREATED
        return Response(result, status=status_code)

    @swagger_auto_schema(
        operation_id="retrieve-channel-messages",
        responses={
            200: openapi.Response(
                "Response", ChannelMessageUpdateSerializer(many=True)
            ),
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
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_all(self, request, org_id, channel_id):
        """Get all the messages sent in a channel.

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
        ```
        """
        data = ""
        status_code = status.HTTP_404_NOT_FOUND

        for chunk in self._stream_message_all(request, org_id, channel_id):
            data += chunk

        try:
            result = json.loads(data)
        except: # noqa
            status_code = status.HTTP_200_OK
            result = []
        
        if isinstance(result, dict):
            if result.get("data"):
                result = self.perform_ordering(request, result.get("data"))
                status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    def _stream_message_all(self, request, org_id, channel_id):
        """
        This method reads the response to a
        zc-core request in streams
        """
        # TODO: Remove this method when zc-core implements pagination
        data = {"channel_id": channel_id}
        params = self._clean_query_params(request)
        data.update(params)

        read = settings.READ_URL

        collection_name = "channelmessage"
        max_chunk_size = 500000

        url = f"{read}/{settings.PLUGIN_ID}/{collection_name}/{org_id}/"
        url += "?" + urlencode(data)

        r = requests.get(url, stream=True, timeout=100)         

        if int(r.headers.get("Content-Length", 10000)) > max_chunk_size:
            raise ValueError("response too large")

        size = 0

        for chunk in r.iter_content(None, True):

            size += len(chunk)
            if size > max_chunk_size:
                raise ValueError("response too large")
            yield chunk

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="retrieve-message-details",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_retrieve(self, request, org_id, msg_id):
        """Retrieve message details

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/" -H  "accept: application/json"
        ```
        """
        data = {"_id": msg_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        request_body=ChannelMessageUpdateSerializer,
        responses={
            200: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
        operation_id="update-message-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def message_update(self, request, org_id, msg_id):

        """
        Updates message based on ID

        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"pinned\": true,
                \"content\": \"string\"
            }"
        ```
        """
        serializer = ChannelMessageUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("message")
        payload.update({"edited": True})
        result = Request.put(org_id, "channelmessage", payload, object_id=msg_id) or {}
        status_code = status.HTTP_404_NOT_FOUND

        if result.__contains__("_id") or isinstance(result, dict):
            # put signal here also
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="EditMessageSignal",
                org_id=org_id,
                channel_id=result.get("channel_id"),
                data=result,
            )

            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
        operation_id="delete-message",
        responses={
            204: openapi.Response("Message deleted successfully"),
            404: openapi.Response("Not found"),
        },
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    def message_delete(self, request, org_id, msg_id):
        """
        Deletes a message based on ID, and organisation

        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}" -H  "accept: application/json""
        ```

        """  # noqa

        result = Request.delete(org_id, "channelmessage", object_id=msg_id)

        if result.get("status_code") == 200:
            if result.get("data", {}).get("deleted_count") > 0:
                Request.delete(
                    org_id, "thread", data_filter={"channelmessage_id": msg_id}
                )

        # add a signal here for delete signal
        channel_id = request.query_params.get("channel_id")
        request_finished.send(
            sender=self.__class__,
            dispatch_uid="DeleteMessageSignal",
            org_id=org_id,
            channel_id=channel_id,
            data={
                "_id": msg_id,
                "channel_id": channel_id,
                "user_id": request.query_params.get("user_id"),
            },
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        responses={
            200: openapi.Response(
                "Successful", ChannelMessageReactionSerializer(many=True)
            )
        },
        operation_id="retrieve-message-reactions",
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
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
    def retrieve_message_reactions(self, request, org_id, msg_id,):
        """Retrieve message reactions

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/reactions/" -H  "accept: application/json"
        ```
        """

        data = {"_id": msg_id}
        
        self.OrderingFields = {
            "count": datetime.fromisoformat,
        }
        params =  self._clean_query_params(request)
        data.update(params)
        result = Request.get(org_id, "channelmessage", data) or {}
        reactions = self.perform_ordering(request, result.get("emojis", []))
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            status_code = status.HTTP_200_OK
        return Response(reactions, status=status_code)

    @swagger_auto_schema(
        request_body=ReactionSerializer,
        responses={
            201: openapi.Response("Response", ReactionSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="update_message_reaction",
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    @throttle_classes([AnonRateThrottle])
    def update_message_reaction(self, request, org_id, msg_id):
        message = Request.get(org_id, "channelmessage", {"_id": msg_id}) or []
        
        status_code = status.HTTP_404_NOT_FOUND

        if isinstance(message, dict):
            if message.__contains__("_id"):
                serializer = ReactionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                data = dict(serializer.data)

                emoji = None

                for i in message.get("emojis", []):
                    if data.get("title", None) == i.get("title", None):
                        emoji = i.copy()
                        message.get("emojis", []).remove(emoji)
                        break
           
                if emoji:
                    if data.get("user_id") in emoji.get("users", []):
                        emoji.get("users", []).remove(data.get("user_id"))
                        emoji["count"] = emoji.get("count", 1) - 1
                        status_code = status.HTTP_200_OK
                    else:
                        emoji.get("users", []).append(data.get("user_id"))
                        emoji["count"] = emoji.get("count", 0) + 1
                        status_code = status.HTTP_201_CREATED
                else:
                    emoji = {
                        "title": data.get("title"),
                        "count": 1,
                        "users": [data.get("user_id")],
                    }
                    status_code = status.HTTP_201_CREATED
            
                if emoji["count"] > 0:
                    message.get("emojis", []).append(emoji)

                obj_id = message.pop("_id")

                result = Request.put(
                    org_id=org_id,
                    collection_name="channelmessage",
                    payload=message, object_id=obj_id) or {}

                if isinstance(result, dict):                
                    if result.__contains__("_id"):
                        # return status code 201 if user reaction was added
                        # return status code 200 if user reaction was removed
                        return Response(emoji, status=status_code)
                return Response(result)
        return Response(
            {"error": "message not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )


channelmessage_views = ChannelMessageViewset.as_view(
    {
        "get": "message_all",
        "post": "message",
    }
)

channelmessage_views_group = ChannelMessageViewset.as_view(
    {"get": "message_retrieve", "put": "message_update", "delete": "message_delete"}
)

channelmessage_reactions = ChannelMessageViewset.as_view(
    {"get": "retrieve_message_reactions", "post": "update_message_reaction"}
)


@swagger_auto_schema(
    method="POST",
    request_body=ChannelMessageSearchSerializer,
    responses={
        200: openapi.Response(
            "Response", ChannelMessageSearchResultSerializer(many=True)
        ),
        400: openapi.Response("Error Response", ErrorSerializer),
    },
    operation_id="search-channel-messages"
)
@api_view(["POST"])
def search_messages(request, org_id, channel_id):
    """Search channel messages based on content, pinned status, file attachments etc.

    ```bash
    curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/search_messages/"
    -H  "accept: application/json"
    -H  "Content-Type: application/json"
    -d "{
            \"user_id\": \"string\",
            \"content\": \"string\",
            \"has_files\": true,
            \"pinned\": true
        }"
    ```
    """

    serializer = ChannelMessageSearchSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.data
    result = search_db(org_id, channel_id, "channelmessage", **data) or []
    if isinstance(result, list):
        response = {"result": result, "query": data}
        return Response(response, status=status.HTTP_200_OK)
    return Response(result, status=status.HTTP_400_BAD_REQUEST)


search_channelmessage = search_messages
