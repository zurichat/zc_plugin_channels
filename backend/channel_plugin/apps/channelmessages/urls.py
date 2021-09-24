from apps.channelmessages.views import channelmessage_views, channelmessage_views_group, channelmessage_reactions
from django.urls import path

urlpatterns = [
    path("<str:org_id>/channels/<str:channel_id>/messages/", channelmessage_views),
    path("<str:org_id>/messages/<str:msg_id>/", channelmessage_views_group),
    path("<str:org_id>/messages/<str:msg_id>/reactions/", channelmessage_reactions)
]
