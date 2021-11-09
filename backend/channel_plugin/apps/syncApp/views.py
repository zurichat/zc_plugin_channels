import asyncio
from django.http.response import JsonResponse
from rest_framework.response import Response
from rest_framework import status
from rest_framework.decorators import api_view

from apps.syncApp.jobs import job_function , run_qhandler_schedule
import threading

# Create your views here.

@api_view(["GET", "POST", "PUT"])
def sync_notifier(request):
    # once the request is recieved call the queue class to start a new queue or add object to the queue
    try:
        th = threading.Thread(target=run_qhandler_schedule)
        th.start()
        return Response({"status": True, "message":"OK"}, status=status.HTTP_200_OK)
    except:
        return Response({"status":False,}, status.HTTP_400_BAD_REQUEST)
