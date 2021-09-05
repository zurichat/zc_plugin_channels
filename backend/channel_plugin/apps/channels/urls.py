from apps.channels import views
from apps.channels.views import (
    Test, SearchMessagesAPIView, GetChannelInfo,
    create_channel, GetChannelRoles, CreateThreadView,ThreadUserRoleView,
<<<<<<< HEAD
    ThreadUserRoleUpdateAPIView,GetChannelList
=======
    ThreadUserRoleUpdateAPIView,
    ThreadUpdateAPIView,
    channelUserRoles
>>>>>>> e7ce37538f96f403747d6cf10a91a50382701858
)
from apps.channels.views import SendMessageInChannel
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/roles/", GetChannelRoles.as_view(), name="api_channel_roles"),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("threadUserRole/", ThreadUserRoleView.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
    path("threads/update_user_role/", ThreadUserRoleUpdateAPIView.as_view()),
    path("messages/", SendMessageInChannel.as_view()),

    path("<int:channel_id>/delete/", views.channel_delete, name='delete_channel'),
    path(
        "organizations/<organization_id>/channels/<channel_id>/threads/",
        CreateThreadView.as_view(),
        name="create-thread",
    ),
<<<<<<< HEAD
    path("channels/",GetChannelList.as_view(), name='channels_list'),
=======
    path("organizations/<organization_id>/channels/<channel_id>/thread/<thread_id>/", views.ThreadUpdateAPIView.as_view(), name='thread_update'),
    path("roles/<int:pk>/", channelUserRoles.as_view()),

>>>>>>> e7ce37538f96f403747d6cf10a91a50382701858
]
