from apps.channelmessages.views import ChannelMessageViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"^messages", ChannelMessageViewset, basename="channelmessage")

urlpatterns = [
    path("", include((router.urls, "channelmessages"))),
]
