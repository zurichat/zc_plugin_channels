from django.conf import settings

from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from .serializers import ThreadUserRoleSerializer
from rest_framework.decorators import api_view
from .serializers import (
    ChannelSerializer,
    ChannelMessageSerializer,
    ThreadSerializer
)
from .serializers import SearchMessageQuerySerializer
from .utils import find_item_in_data

import json

# Create your views here.

# Creating mockup data for the messages_data
messages_data = [
    {"user_name": "Buka",
     "channel_name": "Backend",
     "value": "Submit all assignments on time"
     },
    {"user_name": "Vuie",
     "channel_name": "Announcements",
     "value": "Sign up on time"
     },
    {"user_name": "Marxo",
     "channel_name": "Announcements",
     "value": "Welcome to HNGX8"
     }

]


# messages_data = []


class Test(APIView):
    """
    Testing endpoint for channel app
    """

    def get(self, request):
        return Response({"msg": "working"}, status=status.HTTP_200_OK)


class GetChannelInfo(APIView):
    """
    Endpoint to get details about a channel
    """

    def get(self, request, pk):
        payload = {
            "id": pk,
            "title": "The Big Bang",
            "description": "This is only a theory",
            "private": False,
            "closed": False,
            "members": [],
            "roles": [],
            "threads": [],
            "chats": [],
            "pinned_chats": []
        }

        return Response(payload, status=status.HTTP_200_OK)


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
                            "type": "Add-User"
                        }
                    ]
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
@api_view(['POST', 'GET'])
def create_channel(request):
    if request.method == 'POST':
        serializer = ChannelSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "status": True,
                "message": "Channel Created",
                "data": serializer.data
            }
            return Response(response, status=status.HTTP_200_OK)

        return Response(serializer.errors)

    return Response({"detail": "//GET// is not allowed, required fields: name, desc, privacy status"})


class SearchMessagesAPIView(APIView):
	
    def post(self, request):
        serializer = SearchMessageQuerySerializer(data=request.data)
        if serializer.is_valid():
            value = serializer.validated_data['value']
            if value != "-":
                data = find_item_in_data(messages_data, value, "value")
                response = {
                    "status": True,
                    "message": "Query results",
                    "data": data
                }
                return Response(response, status=status.HTTP_200_OK)
            else:
                data = messages_data
                response = {
                    "status": True,
                    "message": "Query results",
                    "data": data
                }
                return Response(response, status=status.HTTP_200_OK)
        return Response(serializer.errors)

    def get(self, request):
        return Response(
            {"status": True, "message": "Endpoint to search messages, passing '-' will return all messages_data."})

class SendMessageInChannel(APIView):
    def post(self, request):
        Serializer = ChannelMessageSerializer(data=request.data)
        response = {
            "status": True,
            "message": "Message successfully sent",
        }
        return Response(response, status=status.HTTP_200_OK)

@api_view(['DELETE'])
def channel_delete(request, channel_id):
    data = {
      "message": "Channel deleted successfully."
    }
    return Response(data, status=status.HTTP_200_OK)


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
	def post (self, request):
		serializer = ThreadUserRoleSerializer(data=request.data)
		if serializer.is_valid():
			response = serializer.data
			return Response(response, status=status.HTTP_200_ok)
		else:
			return Response(serializer.errors, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

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