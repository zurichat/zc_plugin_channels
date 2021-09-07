import random

from django.conf import settings
from django.utils import timezone
from rest_framework import status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

<<<<<<< HEAD
from rest_framework.decorators import api_view
from datetime import datetime
import random
=======
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

>>>>>>> 951c50bcde37b058ea6e909a7fcd5057b4dfb7f6

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
        data = {
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
