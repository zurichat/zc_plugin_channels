from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
)

# Create your views here.


class ChannelViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelSerializer,
        responses={201: openapi.Response("Response", ChannelUpdateSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
    )
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
    @action(
        methods=["GET"],
        detail=False,
    )
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
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
        operation_id="message read one channel",
    )
    @action(
        methods=["GET"],
        detail=False,
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
    )
    def channel_update(self, request, org_id, channel_id):
        serializer = ChannelUpdateSerializer(
            data=request.data, context={"org_id": org_id}
        )
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.update(org_id, channel_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def channel_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


channel_views = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

channel_views_group = ChannelViewset.as_view(
    {"get": "channel_retrieve", "put": "channel_update", "delete": "channel_delete"}
)
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
