from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from django.http import HttpRequest, HttpResponse

from .serializers import ChannelSerializer

@api_view(["POST"])
def create_channel(request: HttpRequest) -> HttpResponse:

    serializer = ChannelSerializer()
    if request.method == "POST":
        serializer = ChannelSerializer(data=request.data)
        if serializer.is_valid():
            data = serializer.data
            response = {
            "status": True,
            "message": "Channel created",
            "data" : data
            }
            return Response(response)
        return Response(serializer.errors)

    return Response(serializer.data)
