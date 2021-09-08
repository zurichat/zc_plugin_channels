from apps.roles.views import role_views, role_views_group
from django.urls import path

urlpatterns = [
    path("roles/<str:org_id>/<str:channel_id>/", role_views),
    path("roles/<str:org_id>/<str:role_id>/", role_views_group),
]
