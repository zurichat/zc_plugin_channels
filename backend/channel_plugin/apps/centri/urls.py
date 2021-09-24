from django.urls import path

from apps.centri.views import join_channel_test, socket_admin

urlpatterns = [
    path("socket/tests/join-channel/<user_id>/", join_channel_test),
    path("socket/tests/admin/", socket_admin)
]
