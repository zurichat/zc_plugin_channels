from apps.threads.views import ThreadViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"^threads", ThreadViewset, basename="thread")

urlpatterns = [
    path("", include((router.urls, "threads"))),
]
