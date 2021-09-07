from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelMessageSerializer,
    ChannelMessageUpdateSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    RoleSerializer,
    ThreadSerializer,
    ThreadUpdateSerializer,
)

# Create your views here.

# Creating mockup data for the messages_data
messages_data = [
	{	"user_name":"Buka",
		"channel_name": "Backend",
		"value": "Submit all assignments on time"
	},
	{	"user_name":"Vuie",
		"channel_name": "Announcements",
		"value": "Sign up on time"
	},
	{	"user_name":"Marxo",
		"channel_name": "Announcements",
		"value": "Welcome to HNGX8"
	}

	]

# messages_data = []


class ChannelViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelSerializer,
        responses={201: openapi.Response("Response", ChannelUpdateSerializer)},
    )
    @action(methods=["POST"], detail=False, url_path="(?P<org_id>[^/.]+)")
    def channels(self, request, org_id):

        """
        This creates a channel for a
        particular organization identified by ID
        """

        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.create(org_id)
        return Response(result, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelUpdateSerializer(many=True))
        }
    )
    @action(methods=["GET"], detail=False, url_path="(?P<org_id>[^/.]+)/all")
    def channel_all(self, request, org_id):

        """
        This gets all channels for a
        particular organization identified by ID
        """
        data = {}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channel", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)}
    )
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/retrieve",
    )
    def channel_retrieve(self, request, org_id, channel_id):
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ChannelUpdateSerializer,
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/update",
    )
    def channel_update(self, request, org_id, channel_id):
        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.update(org_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/delete",
    )
    def channel_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


class ChannelMessageViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelMessageSerializer,
        responses={201: openapi.Response("Response", ChannelMessageUpdateSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)",
    )
    def message(self, request, org_id, channel_id):
        serializer = ChannelMessageSerializer(
            data=request.data, context={"channel_id": channel_id}
        )
        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("channelmessage")
        result = channelmessage.create(org_id)
        return Response(result, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelMessageUpdateSerializer(many=True))
        }
    )
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/all",
    )
    def message_all(self, request, org_id, channel_id):
        data = {"channel_id": channel_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ChannelMessageSerializer)}
    )
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/(?P<msg_id>[^/.]+)/retrieve",
    )
    def message_retrieve(self, request, org_id, msg_id, channel_id):
        data = {"channel_id": channel_id, "_id": msg_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ChannelMessageSerializer,
        responses={200: openapi.Response("Response", ChannelMessageSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/(?P<msg_id>[^/.]+)/update",
    )
    def message_update(self, request, org_id, msg_id, channel_id):
        pass

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/(?P<msg_id>[^/.]+)/delete",
    )
    def message_delete(self, request, org_id, channel_id):
        pass


class ThreadViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ThreadSerializer,
        responses={201: openapi.Response("Response", ThreadUpdateSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channelmessage_id>[^/.]+)",
    )
    def thread_message(self, request, org_id, channelmessage_id):
        serializer = ThreadSerializer(
            data=request.data, context={"channelmessage_id": channelmessage_id}
        )
        serializer.is_valid(raise_exception=True)
        thread = serializer.data.get("thread")
        result = thread.create(org_id)
        return Response(result, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ThreadUpdateSerializer(many=True))}
    )
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channelmessage_id>[^/.]+)/all",
    )
    def thread_message_all(self, request, org_id, channelmessage_id):
        data = {"channelmessage_id": channelmessage_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "thread", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ThreadUpdateSerializer,
        responses={200: openapi.Response("Response", ThreadUpdateSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channelmessage_id>[^/.]+)/update",
    )
    def thread_message_update(self, request, org_id, channelmessage_id):
        pass

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channelmessage_id>[^/.]+)/delete",
    )
    def thread_message_delete(self, request, org_id, channelmessage_id):
        pass


class RoleViewset(ViewSet):
    @swagger_auto_schema(
        request_body=RoleSerializer,
        responses={201: openapi.Response("Response", RoleSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)",
    )
    def role(self, request, org_id, channel_id):
        serializer = RoleSerializer(
            data=request.data, context={"channel_id": channel_id}
        )
        serializer.is_valid(raise_exception=True)
        role = serializer.data.get("role")
        result = role.create(org_id)
        return Response(result, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", RoleSerializer(many=True))}
    )
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<channel_id>[^/.]+)/all",
    )
    def role_all(self, request, org_id, channel_id):
        data = {"channel_id": channel_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "role", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(responses={200: openapi.Response("Response", RoleSerializer)})
    @action(
        methods=["GET"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<role_id>[^/.]+)/retrieve",
    )
    def role_retrieve(self, request, org_id, role_id):
        data = {"_id": role_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "role", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ChannelMessageSerializer,
        responses={200: openapi.Response("Response", RoleSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<role_id>[^/.]+)/update",
    )
    def message_update(self, request, org_id, role_id):
        pass

    @action(
        methods=["DELETE"],
        detail=False,
        url_path="(?P<org_id>[^/.]+)/(?P<role_id>[^/.]+)/delete",
    )
    def message_delete(self, request, role_id):
        pass


# class SearchMessagesAPIView(APIView):
#     def post(self, request):
#         serializer = SearchMessageQuerySerializer(data=request.data)
#         if serializer.is_valid():
#             value = serializer.validated_data["value"]
#             if value != "-":
#                 data = find_item_in_data(messages_data, value, "value")
#                 response = {"status": True, "message": "Query results", "data": data}
#                 return Response(response, status=status.HTTP_200_OK)
#             else:
#                 data = messages_data
#                 response = {"status": True, "message": "Query results", "data": data}
#                 return Response(response, status=status.HTTP_200_OK)
#         return Response(serializer.errors)

#     def get(self, request):
#         return Response(
#             {
#                 "status": True,
#                 "message": "Endpoint to search messages, passing '-' will return all messages_data.",
#             }
#         )
