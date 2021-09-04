<<<<<<< HEAD
from apps.channels.views import  DeleteThread, Test
=======
from apps.channels.views import Test, SearchMessagesAPIView, GetChannelInfo, create_channel
>>>>>>> c6f5a7791aca7f7ecdfc3f34f9eda22c3c21d65c
from django.urls import path
from . import views

urlpatterns = [
    path("test/", Test.as_view()),
    path("<int:thread_id>/delete/", DeleteThread.as_view(), name='delete_thread'),

]
