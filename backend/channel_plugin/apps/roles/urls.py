from apps.roles.views import role_views, role_views_group
from django.urls import path
from apps.roles.views import RoleViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"^roles", RoleViewset, basename="role")

urlpatterns = [
	path("<str:org_id>/channels/<str:channel_id>/roles/", role_views),
	path("<str:org_id>/roles/<str:role_id>/", role_views_group),
    # path("", include((router.urls, "roles"))),
]
