import json
import time
import asyncio
from django.http.response import JsonResponse

from django.shortcuts import render
from django.conf import settings

from .centwrapper import CentClient

# Create your views here.

CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 1,
    verify = True
)


def join_channel_test(request, user_id, org_id=1):
    return render(request, "centri/index.html", {"user_id": user_id})


def socket_admin(request):
    if request.method == "GET":
        return render(request, "centri/admin.html")
    elif request.method == "POST":
        data = json.loads(request.body)

        method = data.get("method")
        params = data.get("params", None)

        # try:
        method = getattr(CentClient, method)
        
        if params:
            data = method(CLIENT, **params)
        else:
            data = method(CLIENT)
        # except:
        #     print("Failed")
            
        return JsonResponse(data=json.dumps(data), safe=False)
        

async def async_task():
    for i in range(5):
        await asyncio.sleep(1)
        print(i)
    return "done"

def sync_task():
    for i in range(5):
        time.sleep(1)
        print(i)

async def async_test_view(request):
    loop = asyncio.get_event_loop()
    loop.create_task(async_task())
    return JsonResponse({"done": True})

def sync_test_view(request):
    sync_task()
    return JsonResponse({"done": True})
