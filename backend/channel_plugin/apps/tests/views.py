from django.shortcuts import render
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, throttling
from rest_framework import response
from rest_framework.decorators import action, throttle_classes, api_view
from rest_framework.viewsets import ViewSet
from django.urls import reverse
from rest_framework import status
from channel_plugin.utils.test_utils import test_view
from rest_framework.response import Response
import json
import requests

# Create your views here.
@api_view(["GET"])
def test_channel_endpoints(request):
    TEST_CHANNEL_ID = "61643131b98946bd1943ba37"
    GET_VIEW_NAMES_ORG = [  
                    "channels:create_room_view",
                    "channels:list_create_channel",
                    
                ]
    POST_VIEW_NAMES_ORG = [
        "channels:list_create_channel",
        "channels:create_room_view",

    ]
    VIEW_NAMES_CH = [
                    "channels:channel_media_all_view",
                    "channels:channel_retrieve_update_delete_view",
                    "channels:channel_socket_view",
                    "channels:channel_members_list",
                    "channels:channel_members_can_input",
                    
                    ]
    VIEW_NAMES_MEMBERS = [
        "channels:channel_members_update_retrieve_views",
        "channels:notification_views",
    ]

    EXTERNAL_SITES = [
        "https://dm.zuri.chat/api/v1/ping",
        "https://chess.zuri.chat/api/v1/ping",
        "https://channels.zuri.chat/api/v1/ping",

    ]

    MEM_TEST_PARAMS = {"org_id":"test", "channel_id":TEST_CHANNEL_ID, "member_id":"tester_new"}
    ORG_TEST_PARAMS = {"org_id":"test"}
    CH_TEST_PARAMS = {"org_id":"test", "channel_id":TEST_CHANNEL_ID}
    status_codes = []
    # responses =  [
    #     {
    #         "status": False,
    #         "view_name": "Create Room View",
    #         "status_code": 500,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "List Create Channel",
    #         "status_code": 200,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "Channel Media All View",
    #         "status_code": 200,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "Channel Retrieve Update Delete View",
    #         "status_code": 200,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "Channel Socket View",
    #         "status_code": 200,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "Channel Members List",
    #         "status_code": 200,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": False,
    #         "view_name": "Channel Members Can Input",
    #         "status_code": 500,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": False,
    #         "view_name": "Channel Members Update Retrieve Views",
    #         "status_code": 400,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "status": True,
    #         "view_name": "Notification Views",
    #         "status_code": 400,
    #         "type": "Endpoint Status",
    #         "method": "GET"
    #     },
    #     {
    #         "server": True,
    #         "status_code": 200,
    #         "method": "GET",
    #         "type": "Plugin Status"
    #     },
    #     {
    #         "message": "Hello from server!",
    #         "status_code": 200,
    #         "method": "GET",
    #         "type": "Plugin Status"
    #     },
    #     {
    #         "success": True,
    #         "status_code": 200,
    #         "method": "GET",
    #         "type": "Plugin Status"
    #     }
    # ]

    responses = []
    for view in GET_VIEW_NAMES_ORG:
        r = (test_view(view, params=ORG_TEST_PARAMS, method="get"))
        r["method"] = "GET"
        responses.append(r)

    # for view in POST_VIEW_NAMES_ORG:        
    #     data = {  "name": "test channel",  "owner": "test_member", 
    #                 "description": "channel description",  
    #                 "private": False, "default":False,  "topic": "channel topic"}
    #     r = (test_view(view, params=ORG_TEST_PARAMS, method="post", data=json.dumps(data)))
    #     r["method"] = "POST"
    #     responses.append(r)

    for view in VIEW_NAMES_CH:
        r = (test_view(view, params=CH_TEST_PARAMS, method="get"))
        r["method"] = "GET"
        responses.append(r)

    for view in VIEW_NAMES_MEMBERS:
        r = (test_view(view, params=MEM_TEST_PARAMS, method="get"))
        r["method"] = "GET"
        responses.append(r)
    
    for plugin_site in EXTERNAL_SITES:
        r = requests.get(plugin_site)
        status_codes.append(r.status_code)
        try:
            data = r.json()
            data["status_code"] = r.status_code
            data["method"] = "GET"
            data["type"] = "Plugin Status"
            data["plugin"] = plugin_site
            data["success"] = True
        except:
            data = {"success": False}
        responses.append(data)

    statuses = []
    report = "OK!"
    for i in responses:
	    statuses.append(i["success"])
    if not all(statuses):
        report = "Some Pages have issues, and are being resolved"
    context = {"responses":responses, "report":report}
    
    return render(request, "tests/main_test.html", context)

def test_endpoints(request):
    return render(request, "tests/ajax_test.html")

@api_view(["GET","POST"])
def ajax_query_handler(request):
    data = {"you":["are", "welcome"]}
    return Response(data)