from apps.channelmembers.views import (
    channel_add_remove_member_to_room_view,
    channel_member_join_view,
    channel_members_can_input_view,
    channel_members_list_create_views,
    channel_members_update_retrieve_views,
    notification_views,
)
from django.urls import path

app_name = "channelmembers"

urlpatterns = [
    path(
        "org/<str:org_id>/room/<str:room_id>/members/<str:member_id>/",
        channel_add_remove_member_to_room_view,
        name="channel_add_member_to_room_view",
    ),
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
        name="channel_members_update_retrieve_views",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/join/",
        channel_member_join_view,
        name="channel_members_join_view",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/members/<str:member_id>/notifications/",
        notification_views,
        name="notification_views",
    ),
]
