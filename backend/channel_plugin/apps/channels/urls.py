from apps.channels.views import Test, GetChannelInfo, ThreadUserRoleView
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:pk>/", GetChannelInfo.as_view()),
    path("threadUserRole/", ThreadUserRoleView.as_view()),
]
