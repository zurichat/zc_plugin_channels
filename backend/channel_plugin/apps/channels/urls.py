from apps.channels.views import Test
from django.urls import path

urlpatterns = [
    path("test/", Test.as_view()),
]
