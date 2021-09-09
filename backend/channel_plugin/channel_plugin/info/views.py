import random

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

description = """The Channel Plugin is a feature that helps users create spaces
                for conversation and communication on zuri.chat.
                Users can also create sub tags in the channels
                option where other things can be done,
                ranging from game nights,
                football banter, random,
                announcement and so much more.
                This adds the feature of having organized conversations
                in dedicated spaces called channels.
            """


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
            "description": description,
        }
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=False, url_path="sidebar")
    def info_sidebar(self, request):
        org_id = request.GET.get("org", "")
        user_id = request.GET.get("user", "")
        token = request.GET.get("token", "")
        data = {
            "name": "Channels Plugin",
            "description": description,
            "plugin_id": settings.PLUGIN_ID,
            "organisation_id": org_id,
            "user_id": user_id,
            "group_name": "Zuri",
            "show_group": False,
            "joined_rooms": [
                {
                    "title": "general",
                    "id": "DFGHH-EDDDDS-DFDDF",
                    "unread": 2,
                    "members": 23,
                    "icon": "shovel",
                    "action": "open",
                },
                {
                    "title": "announcements",
                    "id": "DFGfH-EDDDDS-DFDDF",
                    "unread": 0,
                    "badge_type": "info",
                    "members": 132,
                    "parent_id": "DFGHH-EDDDDS-DFDDF",
                    "icon": "spear",
                    "action": "open",
                },
            ],
            "public_rooms": [
                {
                    "title": "jokes",
                    "id": "DFGfH-EDDDDS-DFDDF",
                    "unread": 342,
                    "members": 32,
                    "icon": "cdn.cloudflare.com/445345453345/hello.jpeg",
                    "action": "open",
                    "auto-join": True,
                },
            ],
        }

        # AUTHENTICATION SHOULD COME SOMEWHERE HERE, BUT THAT's WHEN WE GET THE DB UP

        # data = {
        #     "name": settings.TEAM_NAME,
        #     "project": settings.PROJECT_NAME,
        #     "version": "1.0",
        #     "frontend_url": "https://channels.zuri.chat/",
        #     "description": description,
        # }
        return Response(data, status=status.HTTP_200_OK)

    @action(methods=["GET"], detail=False, url_path="details")
    def info_details(self, request):
        date = timezone.now().isoformat()
        no_of_times = random.randint(11, 25) + random.randint(10, 20)
        return Response(
            data={
                "message": "Welcome, to the Channels Plugin",
                "last_visted": date,
                "no_of_times_visted": no_of_times,
            },
            status=status.HTTP_200_OK,
        )
