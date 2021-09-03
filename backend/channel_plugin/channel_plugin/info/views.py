from django.conf import settings
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet


class GetInfoViewset(ViewSet):
    @action(
        methods=["GET"],
        detail=False,
    )
    def info(self, request):
        data = {
            "name": settings.TEAM_NAME,
            "project": settings.PROJECT_NAME,
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=False, url_path="side-info")
    def side_info(self, request):
        data = {
            "name": settings.TEAM_NAME,
            "project": settings.PROJECT_NAME,
<<<<<<< HEAD
            "description": "Lorem ipsum dolor sit amet,\
=======
            "description": "Lorem ipsum dolor sit amet, \
>>>>>>> f0c5ecc5d883a864dd15b18d3be151891af5793d
                consectetur adipiscing elit.",
        }
        return Response(data, status=status.HTTP_200_OK)
