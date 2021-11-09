from django.urls import include, path
from rest_framework import routers

from channel_plugin.info.views import GetInfoViewset

router = routers.DefaultRouter(trailing_slash=False)
router.register(r"", GetInfoViewset, basename="info")

urlpatterns = [
    path("", include((router.urls, "info"))),
]
