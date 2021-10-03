# from apps.channelmessages.views import channelmessage_views, channelmessage_views_group, channelmessage_reactions, search_channelmessage
from apps.channelmessages import views
from django.urls import path

urlpatterns = [
    path("<str:org_id>/channels/<str:channel_id>/messages/", views.channelmessage_views),
    path("<str:org_id>/messages/<str:msg_id>/", views.channelmessage_views_group),
    path("<str:org_id>/messages/<str:msg_id>/reactions/", views.channelmessage_reactions),
    path("<str:org_id>/channels/<str:channel_id>/search_messages/", views.search_channelmessage),
    path("<str:org_id>/channels/<str:channel_id>/messages/paginated/", views.paginate_messages),
    path("<str:org_id>/channels/<str:channel_id>/messages/cursor/", views.get_user_cursor),
]
