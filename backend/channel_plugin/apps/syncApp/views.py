from django.http.response import JsonResponse
from rest_framework.decorators import action, throttle_classes, api_view

# from .queue_handler import play
# Create your views here.

@api_view(["GET"])
async def sync_notifier(request):
    # QH.run(TaskWorker())
    # play()
    # once the request is recieved call the queue class to start a new queue or add object to the queue
    return JsonResponse({"status": "ok"}, status=200)