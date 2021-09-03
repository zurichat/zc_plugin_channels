from apps.channels.views import Test, GetChannelInfo
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
]
