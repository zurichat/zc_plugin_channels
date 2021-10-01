import collections

from apps.multimedia.permissions import IsMember, IsOwner
from apps.utils.serializers import ErrorSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import MediaSerializer


class MediaViewset(ViewSet):

    authentication_classes = []

    def get_permissions(self):

        """
        Instantiates and returns the list of permissions that this view requires.
        """
        permissions = super().get_permissions()
        if self.action in [
            "message_media",
            "message_media_delete",
        ]:
            permissions.append(IsMember())
            if self.action in ["message_media_delete"]:
                permissions.append(IsOwner())
        return permissions

    @swagger_auto_schema(
        request_body=MediaSerializer,
        responses={
            201: openapi.Response("Response", MediaSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def message_media_create(self, request, org_id):
        serializer = MediaSerializer(
            data=request.data,
            context={
                "org_id": org_id,
            },
        )
        serializer.is_valid(raise_exception=True)
        media = serializer.data.get("media")
        result = media.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            status_code = status.HTTP_201_CREATED
            collection = request.data.get("type")
            Request.put(
                org_id,
                collection,
                {"has_files": True},
                object_id=request.data.get("msg_id"),
            )
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", MediaSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        }
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def channel_media_list(self, request, org_id, channel_id):
        data = {"channel_id": channel_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "media", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", MediaSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        }
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_media_retrieve(self, request, org_id, msg_id):
        data = {"message_id": msg_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "media", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if len(result) > 0:
                result = result[0]
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    # @swagger_auto_schema(
    #     manual_parameters=[
    #         openapi.Parameter(
    #             "user_id",
    #             openapi.IN_QUERY,
    #             description="User ID (owner of message)",
    #             required=True,
    #             type=openapi.TYPE_STRING,
    #         ),
    #     ]
    # )
    # @action(
    #     methods=["DELETE"],
    #     detail=False,
    # )
    # def message_media_delete(self, request, org_id, msg_id):
    #     Request.delete(org_id, "media", object_id=msg_id)
    #     return Response(status=status.HTTP_204_NO_CONTENT)


message_media_create_view = MediaViewset.as_view(
    {
        "post": "message_media_create",
    }
)
channel_media_list_view = MediaViewset.as_view(
    {
        "get": "channel_media_list",
    }
)
message_media_retrieve_delete_view = MediaViewset.as_view(
    {
        "get": "message_media_retrieve",
        # "delete": "message_media_delete"
    }
)
