from apps.channels.views import Test, SearchMessagesAPIView, GetChannelInfo, ThreadUserRoleUpdateAPIView
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
    path("threads/update_user_role/", ThreadUserRoleUpdateAPIView.as_view()),
]
