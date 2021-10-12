import requests
from django.shortcuts import render

from channel_plugin.utils.test_utils import test_view


# Create your views here.
def test_channel_endpoints(request):
    TEST_CHANNEL_ID = "61643131b98946bd1943ba37"
    GET_VIEW_NAMES_ORG = [
        "channels:create_room_view",
        "channels:list_create_channel",
    ]
    # POST_VIEW_NAMES_ORG = [
    #     "channels:list_create_channel",
    #     "channels:create_room_view",
    # ]
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

    MEM_TEST_PARAMS = {
        "org_id": "test",
        "channel_id": TEST_CHANNEL_ID,
        "member_id": "tester_new",
    }
    ORG_TEST_PARAMS = {"org_id": "test"}
    CH_TEST_PARAMS = {"org_id": "test", "channel_id": TEST_CHANNEL_ID}
    status_codes = []
    responses = []
    for view in GET_VIEW_NAMES_ORG:
        r = test_view(view, params=ORG_TEST_PARAMS, method="get")
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
        r = test_view(view, params=CH_TEST_PARAMS, method="get")
        r["method"] = "GET"
        responses.append(r)

    for view in VIEW_NAMES_MEMBERS:
        r = test_view(view, params=MEM_TEST_PARAMS, method="get")
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
        except:  # noqa
            data = {"success": False}
        responses.append(data)

    statuses = []
    report = "OK!"
    for i in responses:
        statuses.append(i["success"])
    if not all(statuses):
        report = "Some Pages have issues, and are being resolved"
    context = {"responses": responses, "report": report}

    return render(request, "tests/main_test.html", context)

def test_endpoints(request):
    return render(request, "ajax_test.html")

