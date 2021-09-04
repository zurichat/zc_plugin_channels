from django.urls import include, path
from rest_framework import routers
from users.views import ThreadUserRolesViewset

router = routers.DefaultRouter()
router.register(r"delete", ThreadUserRolesViewset, basename="users")

urlpatterns = [
    path("", include((router.urls, "users"))),
]
