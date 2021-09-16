from apps.channels.views import (
    channel_list_create_view,
    channel_media_all_view,
    channel_members_list_create_views,
    channel_members_update_retrieve_views,
    channel_retrieve_update_delete_view,
    get_channel_socket_name,
    user_channel_list,
)
from django.urls import path

app_name = "channels"

urlpatterns = [
    path("<str:org_id>/channels/", channel_list_create_view),
    path("<str:org_id>/channels/<str:channel_id>/media/", channel_media_all_view),
    path(
        "<str:org_id>/channels/<str:channel_id>/", channel_retrieve_update_delete_view
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/",
        channel_members_list_create_views,
        name="channel-members-list",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/<str:member_id>/",
        channel_members_update_retrieve_views,
    ),
    path("<str:org_id>/channels/<str:channel_id>/socket/", get_channel_socket_name),
    path("<str:org_id>/channels/users/<str:user_id>/", user_channel_list),
]
