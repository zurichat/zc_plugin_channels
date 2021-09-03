from apps.channels import views
from apps.channels.views import Test, SearchMessagesAPIView, GetChannelInfo
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
    path("<int:channel_id>/delete/", views.channel_delete, name='delete_channel')
]
