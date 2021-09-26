from apps.threads.views import thread_views, thread_views_group, thread_reactions
from django.urls import path

urlpatterns = [
    path("<str:org_id>/messages/<str:channelmessage_id>/threads/", thread_views),
    path("<str:org_id>/threads/<str:thread_id>/", thread_views_group),
    path("<str:org_id>/threads/<str:thread_id>/reactions", thread_reactions),
]
