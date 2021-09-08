from apps.roles.views import RoleViewset
from django.urls import include, path
from rest_framework import routers

router = routers.DefaultRouter()
router.register(r"^roles", RoleViewset, basename="role")

urlpatterns = [
    path("", include((router.urls, "roles"))),
]
