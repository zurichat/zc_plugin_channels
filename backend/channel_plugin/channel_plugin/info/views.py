import json
import random

import requests
from apps.channels.serializers import ChannelSerializer
from django.conf import settings
from django.utils import timezone
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.viewsets import ViewSet
from sentry_sdk import capture_message

from channel_plugin.utils.custome_response import Response as Custom_Response
from channel_plugin.utils.customrequest import AsyncRequest, unread
from channel_plugin.utils.mixins import AsycViewMixin

from .serializers import InstallSerializer

description = "The Channel Plugin is a feature\
    that helps users create spaces for\
    conversation and communication on zuri.chat."


class GetInfoViewset(AsycViewMixin, ViewSet):
    def get_throttled_message(self, request):
        """Add a custom message to the throttled error."""
        return "request limit exceeded"

    @action(
        methods=["GET"],
        detail=False,
    )
    async def ping(self, request):
        """Get server status

        ```bash
        curl -X GET "{{baseUrl}}/v1/ping" -H  "accept: application/json"
        ```
        """
        return Custom_Response(
            {"success": True}, status=status.HTTP_200_OK, view=self, request=request
        )

    @action(
        methods=["GET"],
        detail=False,
    )
    async def info(self, request):
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
                    "id": settings.PLUGIN_ID,
                },
                "scaffold_structure": "Monolith",
                "team": "HNG 8.0/Team Coelho",
                "sidebar_url": "https://channels.zuri.chat/api/v1/sidebar",
                "ping_url": "https://channels.zuri.chat/api/v1/ping",
                "homepage_url": "https://channels.zuri.chat/",
            },
            "success": True,
        }
        return Custom_Response(
            data, status=status.HTTP_200_OK, request=request, view=self
        )

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
    async def info_sidebar(self, request):
        """Get dynamic sidebar details for a user in an organisation

        ```bash
        curl -X GET "{{baseUrl}}/v1/sidebar?org=<org_id>&user=<user_id>&token=<token>" -H  "accept: application/json"
        ```
        """
        org_id = request.query_params.get("org")
        user_id = request.query_params.get("user")
        joined_rooms = list()
        public_rooms = list()
        starred_rooms = list()

        data = {
            "name": "Channels Plugin",
            "description": description,
            "plugin_id": settings.PLUGIN_ID,
        }
        if org_id is not None and user_id is not None:

            channels = await AsyncRequest.get(org_id, "channel")

            if isinstance(channels, list):
                joined_rooms = list(
                    map(
                        lambda channel: {
                            "room_name": channel.get("slug"),
                            "room_url": f"/channels/message-board/{channel.get('_id')}",
                            "room_image": "",
                            "unread": unread(org_id, channel.get("_id")),
                        },
                        list(
                            filter(
                                lambda channel: user_id in channel["users"].keys()
                                and not channel.get("default", False)
                                and not channel["users"][user_id].get("starred", False),
                                channels,
                            )
                        ),
                    )
                )
                starred_rooms = list(
                    map(
                        lambda channel: {
                            "room_name": channel.get("slug"),
                            "room_url": f"/channels/message-board/{channel.get('_id')}",
                            "room_image": "",
                            "unread": unread(org_id, channel.get("_id")),
                        },
                        list(
                            filter(
                                lambda channel: user_id in channel["users"].keys()
                                and not channel.get("default", False)
                                and channel["users"][user_id].get("starred", False),
                                channels,
                            )
                        ),
                    )
                )
                public_rooms = list(
                    map(
                        lambda channel: {
                            "room_name": channel.get("slug"),
                            "room_url": f"/channels/message-board/{channel.get('_id')}",
                            "room_image": "",
                        },
                        list(
                            filter(
                                lambda channel: user_id not in channel["users"].keys()
                                and not channel.get("private")
                                and not channel.get("default", False),
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
                "show_group": True,
                "category": "channels",
                "button_url": "/channels",
                "joined_rooms": joined_rooms,
                "public_rooms": public_rooms,
                "starred_rooms": starred_rooms,
            }
        )
        # AUTHENTICATION SHOULD COME SOMEWHERE HERE, BUT THAT's WHEN WE GET THE DB UP

        return Custom_Response(
            data, status=status.HTTP_200_OK, request=request, view=self
        )

    @action(methods=["GET"], detail=False, url_path="details")
    async def info_details(self, request):
        date = timezone.now().isoformat()
        no_of_times = random.randint(11, 25) + random.randint(10, 20)
        return Custom_Response(
            data={
                "message": "Welcome, to the Channels Plugin",
                "last_visited": date,
                "no_of_times_visited": no_of_times,
            },
            status=status.HTTP_200_OK,
            request=request,
            view=self,
        )

    @action(methods=["GET"], detail=False, url_path="collections/(?P<plugin_id>[^/.]+)")
    async def collections(self, request, plugin_id):
        """Get all database collections related to plugin

        ```bash
        curl -X GET "{{baseUrl}}/v1/collections/<plugin_id>" -H  "accept: application/json"
        ```
        """
        response = requests.get(f"https://api.zuri.chat/data/collections/{plugin_id}")
        status_code = status.HTTP_404_NOT_FOUND
        if response.status_code >= 200 and response.status_code < 300:
            response = response.json()
            status_code = status.HTTP_200_OK
        return Custom_Response(response, status=status_code, view=self, request=request)

    @action(
        methods=["GET"],
        detail=False,
        url_path="collections/(?P<plugin_id>[^/.]+)/organizations/(?P<org_id>[^/.]+)",
    )
    async def collections_by_organization(self, request, org_id, plugin_id):
        """Get all database collections related to plugin specific to an organisation

        ```bash
        curl -X GET "{{baseUrl}}/v1/collections/{{plugin_id}}/organizations/{{org_id}}" -H  "accept: application/json"
        ```
        """
        response = requests.get(
            f"https://api.zuri.chat/data/collections/{plugin_id}/{org_id}"
        )

        status_code = status.HTTP_404_NOT_FOUND

        if response.status_code >= 200 and response.status_code < 300:
            response = response.json()
            status_code = status.HTTP_200_OK

        return Custom_Response(response, status=status_code, view=self, request=request)

    @swagger_auto_schema(request_body=InstallSerializer)
    @action(
        methods=["POST"],
        detail=False,
        url_path="install",
    )
    async def install(self, request):
        good_message = ["plugin saved successfully", "plugin has already been added"]
        serializer = InstallSerializer(data=request.data)
        try:
            serializer.is_valid(raise_exception=True)
        except Exception as exc:
            return self.get_exception_response(exc, request)

        org_id = serializer.data.get("organization_id")
        user_id = serializer.data.get("user_id")
        title = serializer.data.get("title")

        capture_message(f"auth {request.headers.get('authorization')}")

        headers = {
            "Content-Type": "application/json",
            "Authorization": request.headers.get("authorization", ""),
        }
        url = f"https://api.zuri.chat/organizations/{org_id}/plugins"
        data = {
            "user_id": user_id,
            "plugin_id": settings.PLUGIN_ID,
        }
        res = requests.post(url, data=json.dumps(data), headers=headers)
        capture_message(f"Response of register - {res.json()}")
        if (
            res.status_code == 400
            and res.json().get("message") not in good_message
            or res.status_code == 401
        ):
            return Custom_Response(
                res.json(),
                status=status.HTTP_400_BAD_REQUEST,
                request=request,
                view=self,
            )
        default_channels = ["general", "random"] + [title]
        channel_id = None
        for channel in default_channels:

            serializer = ChannelSerializer(
                data={
                    "name": channel,
                    "owner": user_id,
                    "default": True,
                },
                context={"org_id": org_id},
            )
            try:
                serializer.is_valid(raise_exception=True)

                channel = serializer.data.get("channel")
                response = await channel.create(org_id)
                if response.__contains__("_id"):

                    if channel == title:
                        channel_id = response.get("_id")

                    if channel_id is None:
                        channel_id = response.get("_id")

            except Exception as exc:

                err = self.get_exception_response(exc, request)
                if channel == title and "name" in err.__dict__["data"]:
                    result = await AsyncRequest.get(
                        org_id, "channel", {"name": title.lower()}
                    )
                    if result[0].__contains__("_id"):
                        channel_id = result[0].get("_id")

        response = {
            200: {
                "message": "successfully installed!",
                "success": True,
                "data": {"redirect_url": f"/channels/message-board/{channel_id}"},
            },
            400: {
                "message": "It has been installed!",
                "success": False,
                "data": {"redirect_url": f"/channels/message-board/{channel_id}"},
            },
        }
        return Custom_Response(
            response.get(res.status_code, 200),
            status=status.HTTP_201_CREATED
            if res.status_code == 200
            else status.HTTP_400_BAD_REQUEST,
            request=request,
            view=self,
        )
