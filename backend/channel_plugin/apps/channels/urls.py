from apps.channels.views import ChannelViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", ChannelViewset, basename="channel")

urlpatterns = [
    path("", include((router.urls, "channels"))),
]
