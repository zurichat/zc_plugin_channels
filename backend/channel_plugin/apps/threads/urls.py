from apps.threads.views import thread_views, thread_views_group
from django.urls import path

urlpatterns = [
    path("threads/<str:org_id>/<str:channelmessage_id>/", thread_views),
    path("threads/<str:org_id>/<str:thread_id>/", thread_views_group),
]
