from apps.channelmessages.views import channelmessage_views, channelmessage_views_group
from django.urls import path

urlpatterns = [
    path("message/<str:org_id>/<str:channel_id>/", channelmessage_views),
    path("message/<str:org_id>/<str:msg_id>/", channelmessage_views_group),
]
