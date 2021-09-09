import random

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

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

icons = ["shovel", "cdn.cloudflare.com/445345453345/hello.jpeg", "spear"]


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
        org_id = request.query_params.get("org", "")
        user_id = request.query_params.get("user", "")
        token = request.GET.get("token", "")
        channels = Request.get(org_id, "channel")
        joined_rooms = list()
        public_rooms = list()
        if type(channels) == list:
            for channel in channels:
                data_j = dict()
                data_p = dict()
                if user_id in channel["users"].keys():

                    data_j.update(
                        {
                            "id": channel.get("_id"),
                            "title": channel.get("name"),
                            "members": channel.get("members", len(channel["users"].keys())),
                            "unread": channel.get("unread", random.randint(0, 50)),
                            "icon": channel.get(
                                "icon", icons[random.randint(0, len(icons) - 1)]
                            ),
                            "action": "open",
                        }
                    )
                    joined_rooms.append(data_j)
                if (
                    user_id not in channel["users"].keys()
                    and channel.get("private") == False
                ):
                    data_p.update(
                        {
                            "id": channel.get("_id"),
                            "title": channel.get("name"),
                            "members": channel.get("members", len(channel["users"].keys())),
                            "unread": channel.get("unread", random.randint(0, 50)),
                            "icon": channel.get(
                                "icon", icons[random.randint(0, len(icons) - 1)]
                            ),
                            "action": "open",
                        }
                    )
                    public_rooms.append(data_p)

        data = {
            "name": "Channels Plugin",
            "description": description,
            "plugin_id": settings.PLUGIN_ID,
            "organisation_id": org_id,
            "user_id": user_id,
            "group_name": "Zuri",
            "show_group": False,
            "joined_rooms": joined_rooms,
            "public_rooms": public_rooms,
        }
        
        org_id = request.query_params.get("org")
        user_id = request.query_params.get("user")
        token = request.query_params.get("token")
        data = {
                "name": "Channels Plugin",
                "description": description,
                "plugin_id": settings.PLUGIN_ID
            }
        if org_id is not None or user_id is not None:
            channels = Request.get(org_id, "channel")
            joined_rooms = list()
            public_rooms = list()
            if type(channels) == list:
                joined_rooms = list(
                    map(
                        lambda channel: {
                            "id": channel.get("_id"),
                            "title": channel.get("name"),
                            "members": channel.get("members", len(channel["users"].keys())),
                            "unread": channel.get("unread", random.randint(0, 50)),
                            "icon": channel.get(
                                "icon", icons[random.randint(0, len(icons) - 1)]
                            ),
                            "action": "open",
                        },
                        list(
                            filter(
                                lambda channel: user_id in channel["users"].keys(), channels
                            )
                        ),
                    )
                )
                public_rooms = list(
                    map(
                        lambda channel: {
                            "id": channel.get("_id"),
                            "title": channel.get("name"),
                            "members": channel.get("members", len(channel["users"].keys())),
                            "unread": channel.get("unread", random.randint(0, 50)),
                            "icon": channel.get(
                                "icon", icons[random.randint(0, len(icons) - 1)]
                            ),
                            "action": "open",
                        },
                        list(
                            filter(
                                lambda channel: user_id not in channel["users"].keys()
                                and not channel.get("private"),
                                channels,
                            )
                        ),
                    )
                )

            data.update({
                "organisation_id": org_id,
                "user_id": user_id,
                "group_name": "Zuri",
                "show_group": False,
                "joined_rooms": joined_rooms,
                "public_rooms": public_rooms,
            })

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
