from apps.utils.serializers import ErrorSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import Request
from channel_plugin.utils.wrappers import OrderMixin

from django.utils.timezone import datetime
from django.core.signals import request_finished



from .permissions import CanReply, IsMember, IsOwner
from .serializers import ThreadSerializer, ThreadUpdateSerializer, ReactionSerializer

class ThreadViewset(ThrottledViewSet, OrderMixin):

    authentication_classes = []

    OrderingFields = {
        "timestamp": datetime.fromisoformat,
    }

    def get_permissions(self):

        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permissions = super().get_permissions()
        if self.action in [
            "thread_message",
            "thread_message_update",
            "thread_message_delete",
            "update_thread_reaction"
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
            result.update({"replies": replies + 1})
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="CreateThreadSignal",
                org_id=org_id,
                channel_id=result.get("channel_id"),
                data=result.copy(),
            )
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ThreadUpdateSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="retrieve-message-threads",
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
    def thread_message_all(self, request, org_id, channelmessage_id):
        """Retrieve all replies to message

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{channelmessage_id}}/threads/" -H  "accept: application/json"
        ```
        """

        data = {"channelmessage_id": channelmessage_id}
        data.update(self._clean_query_params(request))
        result = Request.get(org_id, "thread", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            result = self.perform_ordering(request, result)
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
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="EditThreadSignal",
                org_id=org_id,
                channel_id=result.get("channel_id"),
                data=result.copy(),
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

        request_finished.send(
            sender=self.__class__,
            dispatch_uid="DeleteThreadSignal",
            org_id=org_id,
            channel_id=thread.get("channel_id"),
            data={
                "_id": thread.get("_id"),
                "channel_id": thread.get("channel_id"),
                "user_id": request.query_params.get("user_id"),
            },
        )        
        return Response(status=status.HTTP_204_NO_CONTENT)
    
    @swagger_auto_schema(
        request_body=ReactionSerializer,
        responses={
            201: openapi.Response("Response", ReactionSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="update_thread_reaction",
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
        detail=True,
    )
    @throttle_classes([AnonRateThrottle])
    def update_thread_reaction(self, request, org_id, thread_id):
        thread = Request.get(org_id, "thread", {"_id": thread_id}) or []
        
        status_code = status.HTTP_404_NOT_FOUND

        if isinstance(thread, dict):
            if thread.__contains__("_id"):
                serializer = ReactionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)
                
                data = dict(serializer.data)

                emoji = None

                for i in thread.get("emojis", []):
                    if data.get("title", None) == i.get("title", None):
                        emoji = i.copy()
                        thread.get("emojis", []).remove(emoji)
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
                    thread.get("emojis", []).append(emoji)

                obj_id = thread.pop("_id")

                result = Request.put(
                    org_id=org_id,
                    collection_name="thread", 
                    payload={"emojis": thread.get("emojis")}, 
                    object_id=obj_id) or {}

                if isinstance(result, dict):                
                    if result.__contains__("_id"):
                        # return status code 201 if user reaction was added
                        # return status code 200 if user reaction was removed
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="EditThreadSignal",
                            org_id=org_id,
                            channel_id=result.get("channel_id"),
                            data=result.copy(),
                        )

                        return Response(emoji, status=status_code)
                return Response(result)
        return Response(
            {"error": "thread not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )


thread_views = ThreadViewset.as_view(
    {
        "get": "thread_message_all",
        "post": "thread_message",
    }
)
thread_views_group = ThreadViewset.as_view(
    {   
        "post": "update_thread_reaction",
        "put": "thread_message_update", 
        "delete": "thread_message_delete",
    }
)
