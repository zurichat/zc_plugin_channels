from apps.channels.views import (
    channel_list_create_view,
    channel_media_all_view,
    channel_members_can_input_view,
    channel_members_list_create_views,
    channel_members_update_retrieve_views,
    channel_retrieve_update_delete_view,
    channel_socket_view,
    create_room_view,
    notification_views,
    user_channel_list,
    dms_test
)
from django.urls import path

app_name = "channels"

urlpatterns = [
    path('dms/test/', dms_test, name="dms_test"),

    path("<str:org_id>/rooms/", create_room_view, name="create_room_view"),
    path(
        "<str:org_id>/channels/", channel_list_create_view, name="list_create_channel"
    ),
    path("<str:org_id>/channels/<str:channel_id>/files/", channel_media_all_view, name="channel_media_all_view"),
    path(
        "<str:org_id>/channels/<str:channel_id>/", channel_retrieve_update_delete_view, name="channel_retrieve_update_delete_view"
    ),
    path("<str:org_id>/channels/<str:channel_id>/socket/", channel_socket_view, name="channel_socket_view"),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/",
        channel_members_list_create_views,
        name="channel_members_list",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/can_input/",
        channel_members_can_input_view,
        name="channel_members_can_input",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/<str:member_id>/",
        channel_members_update_retrieve_views,
        name="channel_members_update_retrieve_views"
    ),
    path("<str:org_id>/channels/users/<str:user_id>/", user_channel_list),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/<str:member_id>/notifications/",
        notification_views,
        name="notification_views"
    ),
]
