import json

from django.conf import settings
from drf_yasg.utils import swagger_auto_schema
from rest_framework import generics, permissions, status
from rest_framework.decorators import action, api_view
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.viewsets import ViewSet

from .serializers import (
    ChannelMessageSerializer,
    ThreadSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    SearchMessageQuerySerializer,
    ThreadSerializer,
    ThreadUpdateSerializer,
    ThreadUserRoleSerializer,
)
from .utils import find_item_in_data

# Create your views here.

# Creating mockup data for the messages_data
messages_data = [
    {
        "user_name": "Buka",
        "channel_name": "Backend",
        "value": "Submit all assignments on time",
    },
    {"user_name": "Vuie", "channel_name": "Announcements", "value": "Sign up on time"},
    {
        "user_name": "Marxo",
        "channel_name": "Announcements",
        "value": "Welcome to HNGX8",
    },
]

class ChannelViewset(ViewSet):

    @swagger_auto_schema(request_body=ChannelSerializer)
    @action(methods=["POST"], detail=False, url_path="(?P<org_id>[-\w]+)")
    def channel(self, request, org_id):
        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.create(org_id)
        return Response(result, status=status.HTTP_201_CREATED)
    
    @action(methods=["GET"], detail=False, url_path="(?P<org_id>[-\w]+)/all")
    def channel_all(self, request, org_id):
        result = [
            {   
                "_id": "1",
                "name": "Team Coelho",
                "slug": "team-coelho",
                "description": "string",
                "private": True,
                "user": [],
                "roles": [],
                "created_on": "2021-09-05T15:16:18.971942+00:00"
            },
            {
                "_id": "2",
                "name": "string",
                "slug": "team-coelho",
                "description": "string",
                "private": True,
                "users": [
                    {
                        "name": "Team Coelho",
                        "avatar": "https://channel.zuri.chat/static/logo.png/",
                        "email": "team-coelho@zuri.chat",
                        "contact": "+2347039094843",
                        "role": "1",
                        "channel_id": "1",
                        "is_admin": False
                    }
                ],
                "roles": [],
                "created_on": "2021-09-05T15:16:18.971942+00:00"
            },
        ]
        return Response(result, status=status.HTTP_200_OK)


    @action(methods=["GET"], detail=False, url_path="(?P<org_id>[-\w]+)/(?P<channel_id>[-\w]+)/retrieve")
    def channel_retrieve(self, request, org_id, channel_id):
        result = {
            "name": "string",
            "slug": "team-coelho",
            "description": "string",
            "private": True,
            "users": [
                {
                    "name": "Team Coelho",
                    "email": "team-coelho@zuri.chat",
                    "avatar": "https://channel.zuri.chat/static/logo.png/",
                    "contact": "+2347039094843",
                    "role": "1",
                    "channel_id": "1",
                    "is_admin": False
                }
            ],
            "roles": [],
            "created_on": "2021-09-05T15:16:18.971942+00:00"
        }
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(request_body=ChannelUpdateSerializer)
    @action(methods=["PUT"], detail=False, url_path="(?P<org_id>[-\w]+)/(?P<channel_id>[-\w]+)/update")
    def channel_update(self, request, org_id, channel_id):
        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.update(org_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(methods=["DELETE"], detail=False, url_path="(?P<org_id>[-\w]+)/(?P<channel_id>[-\w]+)/delete")
    def channel_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_200_OK)

class GetChannelRoles(APIView):
    """
    Endpoint to get all the roles on a channel
    """

    def get(self, request, pk):
        payload = {
            "id": pk,
            "roles": [
                {
                    "id": 1,
                    "type": "admin",
                    "permissions": [
                        {
                            "id": 1,
                            "description": "User can add other user",
                            "type": "Add-User",
                        }
                    ],
                }
            ],
        }

        return Response(payload, status=status.HTTP_200_OK)


class ThreadUserRoleView(APIView):
    serializer_class = ThreadUserRoleSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)

        if serializer.is_valid():
            role_type = serializer.validated_data.get("role_type")
            message = f"{role_type} was created successfully"
            return Response({"message": message})

        else:
            return Response({"message": "invalidation error"})


@api_view(["POST", "GET"])
def create_channel(request):
    if request.method == "POST":
        serializer = ChannelSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "status": True,
                "message": "Channel Created",
                "data": serializer.data,
            }
            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer.errors)

    return Response(
        {
            "detail": "//GET// is not allowed, required fields: name, desc, privacy status"
        }
    )


class SearchMessagesAPIView(APIView):
    def post(self, request):
        serializer = SearchMessageQuerySerializer(data=request.data)
        if serializer.is_valid():
            value = serializer.validated_data["value"]
            if value != "-":
                data = find_item_in_data(messages_data, value, "value")
                response = {"status": True, "message": "Query results", "data": data}
                return Response(response, status=status.HTTP_200_OK)
            else:
                data = messages_data
                response = {"status": True, "message": "Query results", "data": data}
                return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors)

    def get(self, request):
        return Response(
            {
                "status": True,
                "message": "Endpoint to search messages, passing '-' will return all messages_data.",
            }
        )


class SendMessageInChannel(APIView):
    def post(self, request):
        Serializer = ChannelMessageSerializer(data=request.data)
        response = {
            "status": True,
            "message": "Message successfully sent",
        }
        return Response(response, status=status.HTTP_200_OK)


class CreateThreadView(generics.CreateAPIView):
    serializer_class = ThreadSerializer
    permission_classes = []

    def perform_create(self, serializer):
        plugin_id = getattr(settings, "PLUGIN_ID", "000000000000000")

        res = serializer.save(
            plugin_id=plugin_id,
            headers=self.request.headers,  # header contains auth-token from user
            collection_name="threads",
            organization_id=self.kwargs.get("organization_id"),
            channel_id=self.kwargs.get("channel_id"),
            save_to="https://api.zuri.chat/data/write/",
        )


class ThreadUserRoleUpdateAPIView(APIView):
    def post(self, request):
        serializer = ThreadUserRoleSerializer(data=request.data)
        if serializer.is_valid():
            response = serializer.data
            return Response(response, status=status.HTTP_200_ok)
        else:
            return Response(
                serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )

class GetChannelList(APIView):
    def get(self, request, pk=0):
        channels = [
            {"id": pk,
            "title":"Channel title",
            "description":"Channel description",
            "private":['false'],
            "closed":['false'],
            "members": [
                {"id":"user_id",
                        "roles":["id reference to the users role"]
                }
            ],
        },
        ]


        return Response(channels, status=status.HTTP_200_OK)
		
		serializer = ThreadUpdateSerializer(data= thread)
		return Response(serializer.data)
class ThreadUpdateAPIView(APIView):
    def get(self, request, organization_id, thread_id, channel_id):
        thread = {
            "id": "Matthew",
            "organization_id": "HNG8",
            "channel_id": "slack",
            "title": "Backend Coelho",
            "description": "urgent HNG meeting",
        }
        serializer = ThreadUpdateSerializer(data=thread)
        if serializer.is_valid():
            response = serializer.data
            return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class channelUserRoles(APIView):

    """
    Endpoint For UserRoles on A Channel
    """

    def delete(self, request, pk):
        data = {"message": f"Role {pk} has been successfully deleted"}
        return Response(data, status=status.HTTP_204_NO_CONTENT)