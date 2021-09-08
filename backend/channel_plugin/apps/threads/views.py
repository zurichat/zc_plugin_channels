from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import ThreadSerializer, ThreadUpdateSerializer


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
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)
