from django.http.response import JsonResponse
# Create your views here.


async def sync_notifier(request):
    # once the request is recieved call the queue class to start a new queue or add object to the queue
    return JsonResponse({"status": "ok"}, status=200)