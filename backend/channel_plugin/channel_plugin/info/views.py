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
            "version": "1.0",
            "description": "The Channel Plugin is a feature that helps users create spaces for conversation and communication on zuri.chat. Users can also create sub tags in the channels option where other things can be done, ranging from game nights, football banter, random, announcement and so much more. This adds the feature of having organized conversations in dedicated spaces called channels."

        }
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=False, url_path="side-info")
    def side_info(self, request):
        data = {
            "name": settings.TEAM_NAME,
            "project": settings.PROJECT_NAME,
            "version": "1.0",
            "description": "The Channel Plugin is a feature that helps users create spaces for conversation and communication on zuri.chat. Users can also create sub tags in the channels option where other things can be done, ranging from game nights, football banter, random, announcement and so much more. This adds the feature of having organized conversations in dedicated spaces called channels."
        }
        return Response(data, status=status.HTTP_200_OK)
