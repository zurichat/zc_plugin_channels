from apps.channels.views import GetChannelInfo, Test, userRoles
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("roles/<int:pk>/", userRoles.as_view()),
]
