from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from .serializers import ChannelSerializer
# Create your views here.


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