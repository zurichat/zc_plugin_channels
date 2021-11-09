from django.urls import path

from apps.centri.views import (
    async_test_view, 
    join_channel_test, 
    socket_admin, 
    sync_test_view,
)

urlpatterns = [
    path("socket/tests/join-channel/<user_id>/", join_channel_test),
    path("socket/tests/admin/", socket_admin),
    path("socket/tests/async/", async_test_view),
    path("socket/tests/sync/", sync_test_view),

]
