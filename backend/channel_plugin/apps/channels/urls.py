from django.urls import path
from apps.channels.views import (
    channel_views, 
    channel_views_group,
    channel_members_list_create_views,
    channel_members_update_retrieve_views
)

urlpatterns = [
    path("<str:org_id>/channels/", channel_views),
    path("<str:org_id>/channels/<str:channel_id>/", channel_views_group),
    
    path(
        "<str:org_id>/channels/<str:channel_id>/members/",
        channel_members_list_create_views
    ),

    path(
        "<str:org_id>/channels/<str:channel_id>/members/<str:member_id>/",
        channel_members_update_retrieve_views
    )
]
