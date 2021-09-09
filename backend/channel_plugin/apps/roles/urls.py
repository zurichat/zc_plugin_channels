from apps.roles.views import role_views, role_views_group
from django.urls import path

urlpatterns = [
    path("<str:org_id>/channels/<str:channel_id>/roles/", role_views),
    path("<str:org_id>/roles/<str:role_id>/", role_views_group),
]
