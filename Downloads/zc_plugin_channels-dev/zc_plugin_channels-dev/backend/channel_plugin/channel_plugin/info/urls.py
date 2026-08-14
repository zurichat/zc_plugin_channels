from django.urls import include, path
from info.views import GetInfoViewset
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", GetInfoViewset, basename="info")

urlpatterns = [
    path("", include((router.urls, "info"))),
]
