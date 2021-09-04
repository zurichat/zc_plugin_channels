from apps.channels.views import (
    CreateThreadView,
    GetChannelInfo,
    SearchMessagesAPIView,
    Test,
    create_channel,
)
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
    path(
        "search_messages/", SearchMessagesAPIView.as_view(), name="api_search_messages"
    ),
    path(
        "organizations/<organization_id>/channels/<channel_id>/threads/",
        CreateThreadView.as_view(),
        name="Create-Thread-Endpoint",
    ),
]
