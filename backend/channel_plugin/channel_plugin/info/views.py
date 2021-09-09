import random

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

<<<<<<< HEAD
<<<<<<< HEAD
from rest_framework.decorators import api_view
from datetime import datetime
import random
=======
=======
from channel_plugin.utils.customrequest import Request

>>>>>>> ecb3db0462e322e0b237f20c14a2af1b2f0a87cd
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

<<<<<<< HEAD
>>>>>>> 951c50bcde37b058ea6e909a7fcd5057b4dfb7f6
=======
icons = ["shovel", "cdn.cloudflare.com/445345453345/hello.jpeg", "spear"]

>>>>>>> ecb3db0462e322e0b237f20c14a2af1b2f0a87cd

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
        org_id = request.query_params.get("org")
        user_id = request.query_params.get("user")
        data = {
<<<<<<< HEAD
            "name": settings.TEAM_NAME,
            "project": settings.PROJECT_NAME,
<<<<<<< HEAD
            "description": "Lorem ipsum dolor sit amet, \
                consectetur adipiscing elit.",
        }
        return Response(data, status=status.HTTP_200_OK)

now = datetime.now()

@api_view(['GET'])
def vistingDetail(request):
    if request.method == 'GET':

        date = now.strftime("%m/%d/%Y, %H:%M:%S")
        no_of_times = random.randint(11, 25) + random.randint(10, 20)
        return Response(data = {
            "message": "Welcome, to the Channels Plugin",
             "last_visted": date, 
             "no_of_times_visted": no_of_times 
        }, status=status.HTTP_200_OK)
=======
            "version": "1.0",
            "frontend_url": "https://channels.zuri.chat/",
            "description": description,
        }
=======
                "name": "Channels Plugin",
                "description": description,
                "plugin_id": settings.PLUGIN_ID
            }
        if org_id is not None or user_id is not None:
            token = request.GET.get("token", "")
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
>>>>>>> ecb3db0462e322e0b237f20c14a2af1b2f0a87cd
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
>>>>>>> 951c50bcde37b058ea6e909a7fcd5057b4dfb7f6
