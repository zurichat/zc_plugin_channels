from django.urls import path
from .import views
from .views import google_call_list

app_name = "googlemeet"

urlpatterns = [
    path("call_link/", google_call_list),
]
