from apps.threads.views import thread_views, thread_views_group
from django.urls import path
from apps.threads.views import ThreadViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"^threads", ThreadViewset, basename="thread")

urlpatterns = [
	path("<str:org_id>/messages/<str:channelmessage_id>/threads/", thread_views),
	path("<str:org_id>/threads/<str:thread_id>/", thread_views_group),
    # path("", include((router.urls, "threads"))),
]
