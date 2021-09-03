from apps.channels.views import  DeleteThread, Test
from django.urls import path
from . import views

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:thread_id>/delete/", DeleteThread.as_view(), name='delete_thread'),

]
