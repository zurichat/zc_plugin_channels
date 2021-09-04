from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .seriaizers import ChannelSerializer
from .serializers import SearchMessageQuerySerializer
from .utils import find_item_in_data

import json

# Create your views here.

# Creating mockup data for the messages_data
messages_data = [
	{	"user_name":"Buka",
		"channel_name": "Backend",
		"value": "Submit all assignments on time"
	},
	{	"user_name":"Vuie",
		"channel_name": "Announcements",
		"value": "Sign up on time"
	},
	{	"user_name":"Marxo",
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

@api_view(['POST','GET'])
def create_channel(request):
    if request.method == 'POST':
        serializer = ChannelSerializer(data=request.data)
        if serializer.is_valid():
            response = {
                "status":True,
                "message":"Channel Created",
                "data": serializer.data
            }
            return Response(response, status=status.HTTP_200_OK)
        
        return Response(serializer.errors)

    return Response({"detail":"//GET// is not allowed, required fields: name, desc, privacy status"})

class SearchMessagesAPIView(APIView):
	def post(self, request):
		serializer = SearchMessageQuerySerializer(data=request.data)
		if serializer.is_valid():
			value = serializer.validated_data['value']
			if value != "-":
				data = find_item_in_data(messages_data, value, "value")
				response = {
					"status" :True,
					"message": "Query results",
					"data": data
				}
				return Response(response, status=status.HTTP_200_OK)
			else:
				data = messages_data
				response = {
					"status" :True,
					"message": "Query results",
					"data": data
				}
				return Response(response, status=status.HTTP_200_OK)
		return Response(serializer.errors)
	def get(self, request):
		return Response({"status":True, "message":"Endpoint to search messages, passing '-' will return all messages_data."})

@api_view(['DELETE'])
def channel_delete(request, channel_id):
	data = {
		"message": "Channel deleted successfully."
	}
	return Response(data, status=status.HTTP_200_OK)
