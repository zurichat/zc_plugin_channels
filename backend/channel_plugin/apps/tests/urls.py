from django.urls import include, path, re_path
from . import views
urlpatterns = [
    re_path(r"^test$", views.test_endpoints, name="test_major_endpoints"),
    path("ajax/tests/", views.ajax_query_handler),
    
]