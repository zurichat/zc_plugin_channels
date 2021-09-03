from apps.channels.views import Test, GetChannelInfo, create_channel
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("create_channel/", create_channel, name="api_create_channel"),
]
