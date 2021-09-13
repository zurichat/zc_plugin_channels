from django.urls import path

from apps.centri.views import join_channel_test

urlpatterns = [
    path("socket/tests/join-channel/<user_id>/", join_channel_test),
]
