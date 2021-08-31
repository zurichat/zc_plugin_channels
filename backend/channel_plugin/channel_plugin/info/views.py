from django.conf import settings
from django.http import JsonResponse
from rest_framework.decorators import action
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
        return JsonResponse(data)

    @action(methods=["GET"], detail=False, url_path="side-info")
    def side_info(self, request):
        data = {
            "name": settings.TEAM_NAME,
            "project": settings.PROJECT_NAME,
            "description": "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
        }
        return JsonResponse(data)
