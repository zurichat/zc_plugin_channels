from apps.utils.serializers import ErrorSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import Request

from .permissions import CanReply, IsMember, IsOwner
from .serializers import ThreadSerializer, ThreadUpdateSerializer


class ThreadViewset(ThrottledViewSet):

    authentication_classes = []

    def get_permissions(self):

        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permissions = super().get_permissions()
        if self.action in [
            "thread_message",
            "thread_message_update",
            "thread_message_delete",
        ]:
            permissions.append(IsMember())
            if self.action in ["thread_message_delete", "thread_message_update"]:
                permissions.append(IsOwner())
            if self.action in ["thread_message"]:
                permissions.append(CanReply())
        return permissions

    @swagger_auto_schema(
        request_body=ThreadSerializer,
        responses={
            201: openapi.Response("Response", ThreadUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        manual_parameters=[
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message to be posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
        operation_id="create-message-thread",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    @throttle_classes([AnonRateThrottle])
    def thread_message(self, request, org_id, channelmessage_id):
        """Add reply to message

        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/messages/{{channelmessage_id}}/threads/?channel_id={{channel_id}}"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"user_id\": \"string\",
                \"content\": \"string\",
                \"files\": [
                    \"string\"
                ]
            }"
        ```
        """

        serializer = ThreadSerializer(
            data=request.data,
            context={
                "channelmessage_id": channelmessage_id,
                "org_id": org_id,
                "channel_id": request.query_params.get("channel_id"),
            },
        )
        serializer.is_valid(raise_exception=True)
        thread = serializer.data.get("thread")
        result = thread.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            status_code = status.HTTP_201_CREATED
            replies = Request.get(
                org_id, "channelmessage", {"_id": channelmessage_id}
            ).get("replies", 0)
            Request.put(
                org_id,
                "channelmessage",
                {"replies": replies + 1},
                object_id=channelmessage_id,
            )
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ThreadUpdateSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="retrieve-message-threads",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def thread_message_all(self, request, org_id, channelmessage_id):
        """Retrieve all replies to message

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{channelmessage_id}}/threads/" -H  "accept: application/json"
        ```
        """

        data = {"channelmessage_id": channelmessage_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "thread", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        request_body=ThreadUpdateSerializer,
        responses={
            200: openapi.Response("Response", ThreadUpdateSerializer),
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
        operation_id="update-thread-message",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def thread_message_update(self, request, org_id, thread_id):
        """Update thread message

        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/threads/{{thread_id}}/?user_id={{user_id}}&channel_id={{channel_id}}"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{  \"content\": \"string\"}"
        ```
        """

        serializer = ThreadUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("thread")
        payload.update({"edited": True})
        result = Request.put(org_id, "thread", payload, object_id=thread_id) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
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
        operation_id="delete-thread-message",
        responses={204: openapi.Response("Thread message deleted successfully")},
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    def thread_message_delete(self, request, org_id, thread_id):
        """Delete thread message

        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/threads/{{thread_id}}/?user_id={{user_id}}&channel_id={{channel_id}}" -H  "accept: application/json"
        ```
        """  # noqa

        thread = Request.get(org_id, "thread", {"_id": thread_id})
        message = Request.get(
            org_id, "channelmessage", {"_id": thread.get("channelmessage_id")}
        )
        replies = message.get("replies", 1)
        Request.delete(org_id, "thread", object_id=thread_id)
        Request.put(
            org_id,
            "channelmessage",
            {"replies": replies - 1},
            object_id=message.get("_id"),
        )
        return Response(status=status.HTTP_204_NO_CONTENT)


thread_views = ThreadViewset.as_view(
    {
        "get": "thread_message_all",
        "post": "thread_message",
    }
)
thread_views_group = ThreadViewset.as_view(
    {"put": "thread_message_update", "delete": "thread_message_delete"}
)
