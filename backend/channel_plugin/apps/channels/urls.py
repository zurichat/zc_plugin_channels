from apps.channels import views
from apps.channels.views import Test, SearchMessagesAPIView, GetChannelInfo, create_channel, GetChannelRoles
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/roles/", GetChannelRoles.as_view(), name="api_channel_roles"),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
    path("<int:channel_id>/delete/", views.channel_delete, name='delete_channel')
]
