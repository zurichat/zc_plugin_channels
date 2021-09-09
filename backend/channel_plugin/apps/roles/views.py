from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

from .serializers import RoleSerializer


# Create your views here.
class RoleViewset(ViewSet):
    @swagger_auto_schema(
        request_body=RoleSerializer,
        responses={201: openapi.Response("Response", RoleSerializer)},
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def role(self, request, org_id, channel_id):
        serializer = RoleSerializer(
            data=request.data, context={"channel_id": channel_id, "type": "create"}
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
    )
    def role_all(self, request, org_id, channel_id):
        data = {"channel_id": channel_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "role", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", RoleSerializer)},
        operation_id="message read one role",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def role_retrieve(self, request, org_id, role_id):
        data = {"_id": role_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "role", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=RoleSerializer,
        responses={200: openapi.Response("Response", RoleSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def role_update(self, request, org_id, role_id):
        serializer = RoleSerializer(data=request.data, context={"type": "create"})
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("role")
        result = Request.put(org_id, "channel", payload, object_id=role_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def role_delete(self, request, role_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


role_views = RoleViewset.as_view(
    {
        "get": "role_all",
        "post": "role",
    }
)
role_views_group = RoleViewset.as_view(
    {"get": "role_retrieve", "put": "role_update", "delete": "role_delete"}
)
