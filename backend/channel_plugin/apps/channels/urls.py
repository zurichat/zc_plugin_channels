from apps.channels import views
from apps.channels.views import (
    Test, SearchMessagesAPIView, GetChannelInfo,
    create_channel, GetChannelRoles, CreateThreadView,ThreadUserRoleView,
    ThreadUserRoleUpdateAPIView,GetChannelList

    ChannelViewset,
    CreateThreadView,
    GetChannelRoles,
    SearchMessagesAPIView,
    SendMessageInChannel,
    ThreadUpdateAPIView,
    ThreadUserRoleUpdateAPIView,
    ThreadUserRoleView,
    channelUserRoles,
    create_channel,

)
from django.urls import path, include
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"", ChannelViewset, basename="channel")

urlpatterns = [
    path("", include((router.urls, "channels"))),
    path("<int:pk>/roles/", GetChannelRoles.as_view(), name="api_channel_roles"),
    path("threadUserRole/", ThreadUserRoleView.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
    path(
        "search_messages/", SearchMessagesAPIView.as_view(), name="api_search_messages"
    ),
    path("threads/update_user_role/", ThreadUserRoleUpdateAPIView.as_view()),
    path("messages/", SendMessageInChannel.as_view()),
    path(
        "organizations/<organization_id>/channels/<channel_id>/threads/",
        CreateThreadView.as_view(),
        name="create-thread",
    ),
    path("channes/",GetChannelList.as_view(), name="channels"),
    path(
        "organizations/<organization_id>/channels/<channel_id>/thread/<thread_id>/",
        views.ThreadUpdateAPIView.as_view(),
        name="thread_update",
    ),
    path("roles/<int:pk>/", channelUserRoles.as_view()),
]
