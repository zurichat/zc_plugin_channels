import random

import requests
from django.conf import settings
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customrequest import Request

description = "The Channel Plugin is a feature\
    that helps users create spaces for\
    conversation and communication on zuri.chat."

icons = [
    "shovel",
    "cdn.cloudflare.com/445345453345/hello.jpeg",
    "spear",
]


class GetInfoViewset(ViewSet):
    def get_throttled_message(self, request):
        """Add a custom message to the throttled error."""
        return "request limit exceeded"

    @action(
        methods=["GET"],
        detail=False,
    )
    def ping(self, request):
        """Get server status

        ```bash
        curl -X GET "{{baseUrl}}/v1/ping" -H  "accept: application/json"
        ```
        """
        return Response({"success": True}, status=status.HTTP_200_OK)

    @action(
        methods=["GET"],
        detail=False,
    )
    def info(self, request):
        """Get plugin details and developer information

        ```bash
        curl -X GET "{{baseUrl}}/v1/info" -H  "accept: application/json"
        ```
        """
        data = {
            "message": "Plugin Information Retrieved",
            "data": {
                "type": "Plugin Information",
                "plugin_info": {
                    "name": "Channels Plugin",
                    "description": ["Zuri.chat plugin", description],
                },
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Coelho",
                "sidebar_url": "https://channels.zuri.chat/api/v1/sidebar",
                "ping_url": "https://channels.zuri.chat/api/v1/ping",
                "homepage_url": "https://channels.zuri.chat/",
            },
            "success": True,
        }
        return Response(data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "org",
                openapi.IN_QUERY,
                description="Organization ID",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "user",
                openapi.IN_QUERY,
                description="User ID",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "token",
                openapi.IN_QUERY,
                description="Token",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ]
    )
    @action(methods=["GET"], detail=False, url_path="sidebar")
    def info_sidebar(self, request):
        """Get dynamic sidebar details for a user in an organisation

        ```bash
        curl -X GET "{{baseUrl}}/v1/sidebar?org=<org_id>&user=<user_id>&token=<token>" -H  "accept: application/json"
        ```
        """
        org_id = request.query_params.get("org")
        user_id = request.query_params.get("user")

        data = {
            "name": "Channels Plugin",
            "description": description,
            "plugin_id": settings.PLUGIN_ID,
        }
        if org_id is not None and user_id is not None:
            channels = Request.get(org_id, "channel")
            joined_rooms = list()
            public_rooms = list()
            if isinstance(channels, list):
                joined_rooms = list(
                    map(
                        lambda channel: {
                            # "id": channel.get("_id"),
                            "room_name": channel.get("slug"),
                            "room_url": f"/channels/message-board/{channel.get('_id')}",
                            "room_image": "",
                            # "title": channel.get("name"),
                            # "members": channel.get(
                            #     "members", len(channel["users"].keys())
                            # ),
                            # "unread": channel.get("unread", random.randint(0, 50)),
                            # "icon": channel.get(
                            #     "icon", icons[random.randint(0, len(icons) - 1)]
                            # ),
                            # "action": "open",
                        },
                        list(
                            filter(
                                lambda channel: user_id in channel["users"].keys(),
                                channels,
                            )
                        ),
                    )
                )
                public_rooms = list(
                    map(
                        lambda channel: {
                            # "id": channel.get("_id"),
                            "room_name": channel.get("slug"),
                            "room_url": f"/channels/message-board/{channel.get('_id')}",
                            "room_image": "",
                            # "title": channel.get("name"),
                            # "members": channel.get(
                            #     "members", len(channel["users"].keys())
                            # ),
                            # "unread": channel.get("unread", random.randint(0, 50)),
                            # "icon": channel.get(
                            #     "icon", icons[random.randint(0, len(icons) - 1)]
                            # ),
                            # "action": "open",
                        },
                        list(
                            filter(
                                lambda channel: user_id not in channel["users"].keys()
                                and not bool(channel.get("private")),
                                channels,
                            )
                        ),
                    )
                )

            data.update(
                {
                    "organisation_id": org_id,
                    "user_id": user_id,
                    "group_name": "Channel",
                    "show_group": False,
                    "joined_rooms": joined_rooms,
                    "public_rooms": public_rooms,
                }
            )

        # AUTHENTICATION SHOULD COME SOMEWHERE HERE, BUT THAT's WHEN WE GET THE DB UP

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

    @action(methods=["GET"], detail=False, url_path="collections/(?P<plugin_id>[^/.]+)")
    def collections(self, request, plugin_id):
        """Get all database collections related to plugin

        ```bash
        curl -X GET "{{baseUrl}}/v1/collections/<plugin_id>" -H  "accept: application/json"
        ```
        """
        response = (
            requests.get(f"https://api.zuri.chat/data/collections/{plugin_id}").json()
            or {}
        )
        return Response(response, status=status.HTTP_200_OK)

    @action(
        methods=["GET"],
        detail=False,
        url_path="collections/(?P<plugin_id>[^/.]+)/organizations/(?P<org_id>[^/.]+)",
    )
    def collections_by_organization(self, request, org_id, plugin_id):
        """Get all database collections related to plugin specific to an organisation

        ```bash
        curl -X GET "{{baseUrl}}/v1/collections/{{plugin_id}}/organizations/{{org_id}}" -H  "accept: application/json"
        ```
        """
        response = (
            requests.get(
                f"https://api.zuri.chat/data/collections/{plugin_id}/{org_id}"
            ).json()
            or {}
        )
        return Response(response, status=status.HTTP_200_OK)
