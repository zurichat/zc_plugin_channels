from apps.multimedia.views import (
    channel_media_list_view,
    message_media_create_view,
    message_media_retrieve_delete_view,
)
from django.urls import path

urlpatterns = [
    path("<str:org_id>/media/", message_media_create_view),
    path("<str:org_id>/media/<str:channel_id>/", channel_media_list_view),
    path(
        "<str:org_id>/media/messages/<str:msg_id>/", message_media_retrieve_delete_view
    ),
]
