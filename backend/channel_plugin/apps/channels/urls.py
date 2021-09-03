from apps.channels.views import Test, SearchMessagesAPIView
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("search_messages/", SearchMessagesAPIView.as_view(), name='api_search_messages'),
]
