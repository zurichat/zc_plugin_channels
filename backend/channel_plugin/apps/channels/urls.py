from apps.channels.views import Test, SearchMessagesAPIView, GetChannelInfo, create_channel, GetChannelRoles
from apps.channels.views import SendMessageInChannel
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/roles/", GetChannelRoles.as_view(), name="api_channel_roles"),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
    path("messages/", SendMessageInChannel.as_view()),

]
