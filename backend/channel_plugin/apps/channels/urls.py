from apps.channels.views import (
    channel_list_create_view,
    channel_media_all_view,
    channel_retrieve_update_delete_view,
    channel_socket_view,
    create_room_view,
    dms_test,
    user_channel_list,
    workspace_channel_view,
)
from django.urls import path

app_name = "channels"

urlpatterns = [
    path("dms/test/", dms_test, name="dms_test"),
    path(
        "org/<str:org_id>/users/<str:member_id>/rooms/",
        create_room_view,
        name="create_room_view",
    ),
    path(
        "<str:org_id>/channels/", channel_list_create_view, name="list_create_channel"
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/files/",
        channel_media_all_view,
        name="channel_media_all_view",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/",
        channel_retrieve_update_delete_view,
        name="channel_retrieve_update_delete_view",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/socket/",
        channel_socket_view,
        name="channel_socket_view",
    ),
    path("<str:org_id>/channels/users/<str:user_id>/", user_channel_list),
    path(
        "<str:org_id>/workspace_channel/",
        workspace_channel_view,
        name="workspace_channel_view",
    ),
]
