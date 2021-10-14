from django.urls import path

from apps.syncApp.views import (
    sync_notifier
)

urlpatterns = [
    path("sync/", sync_notifier, name="sync_notifier"),
]
