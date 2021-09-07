from apps.channels.views import (
    ChannelMessageViewset,
    ChannelViewset,
    RoleViewset,
    ThreadViewset,
)
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", ChannelViewset, basename="channel")
router.register(r"^message", ChannelMessageViewset, basename="channelmessage")
router.register(r"^thread", ThreadViewset, basename="thread")
router.register(r"^role", RoleViewset, basename="role")

urlpatterns = [
    path("", include((router.urls, "channels"))),
]
