from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import ChannelMessageSerializer, ChannelMessageUpdateSerializer


class ChannelMessageViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelMessageSerializer,
        responses={201: openapi.Response("Response", ChannelMessageUpdateSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
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
    )
    def message_all(self, request, org_id, channel_id):
        data = {"channel_id": channel_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ChannelMessageUpdateSerializer)},
        operation_id="message read one channelmessage",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_retrieve(self, request, org_id, msg_id, channel_id):
        data = {"channel_id": channel_id, "_id": msg_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ChannelMessageUpdateSerializer,
        responses={200: openapi.Response("Response", ChannelMessageUpdateSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def message_update(self, request, org_id, msg_id):
        serializer = ChannelMessageUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("message")
        result = channelmessage.update(org_id, msg_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def message_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


channelmessage_views = ChannelMessageViewset.as_view(
    {
        "get": "message_all",
        "post": "message",
    }
)

channelmessage_views_group = ChannelMessageViewset.as_view(
    {"get": "message_retrieve", "put": "message_update", "delete": "message_delete"}
)
