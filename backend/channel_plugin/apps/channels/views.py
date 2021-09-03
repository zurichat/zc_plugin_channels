from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

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
