from django.urls import path
from . import api

urlpatterns = [
	path("channel_create/", api.create_channel, name='api_channel_create'),
]