from apps.channels.views import channel_views, channel_views_group
from django.urls import path

urlpatterns = [
    path("<str:org_id>/channels/", channel_views),
    path("<str:org_id>/channels/<str:channel_id>/", channel_views_group),
]
