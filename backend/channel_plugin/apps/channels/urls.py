from apps.channels.views import Test
from django.urls import path

from . import api

urlpatterns = [
    path("test/", Test.as_view()),
    path("channel_create/", api.create_channel, name='api_channel_create'),
]
