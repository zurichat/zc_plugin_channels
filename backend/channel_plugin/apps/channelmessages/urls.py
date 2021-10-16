from apps.channelmessages import views
from django.urls import path

urlpatterns = [
    path(
        "<str:org_id>/channels/<str:channel_id>/messages/", views.channelmessage_views
    ),
    path("<str:org_id>/channels-messages-analytics/", views.channelmessage_analytics),
    path("<str:org_id>/messages/<str:msg_id>/", views.channelmessage_views_group),
    path(
        "<str:org_id>/messages/<str:msg_id>/reactions/", views.channelmessage_reactions
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/search_messages/",
        views.search_channelmessage,
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/messages/paginated/",
        views.paginate_messages,
        name="paginate_messages",
    ),
    path(
        "<str:org_id>/channels/<str:channel_id>/messages/cursor/", views.get_user_cursor
    ),
    path("<str:org_id>/search/", views.search),
    path("test/", views.test),
    path(
        "search/<str:org_id>/<str:member_id>/",
        views.workflow_search,
        name="search_all_channels",
    ),
    path(
        "search-suggestions/<str:org_id>/<str:member_id>/",
        views.search_suggestions,
        name="workflow-search-suggestion",
    ),
    # path("test", views.search_channelmessage)
]
