from apps.channels.views import channel_views, channel_views_group
from django.urls import path
from apps.channels.views import ChannelViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", ChannelViewset, basename="channel")

urlpatterns = [
	path("<str:org_id>/channels/", channel_views),
	path("<str:org_id>/channels/<str:channel_id>/", channel_views_group),
    # path("", include((router.urls, "channels"))),
]
