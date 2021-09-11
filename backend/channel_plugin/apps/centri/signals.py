from django.core.signals import request_finished
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from .centwrapper import CentClient
from apps.channels.views import ChannelMemberViewset
from .helperfuncs import build_room_name

CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 1,
    verify= True
)

@receiver(request_finished, sender=ChannelMemberViewset)
def JoinedChannelSignal(sender, **kwargs):
    
    uid = kwargs.get("dispatch_uid")
    
    if uid == "JoinedChannelSignal":
        org_id = kwargs.get("org_id")
        channel_name = kwargs.get("channel_name")
        user_id = kwargs.get("user_id")
        
        room_name = build_room_name(org_id, channel_name)
        
        try:
            CLIENT.subscribe(user_id, room_name)
        except CentException:
            print("client sunscription failed because channel is not active")

        # send notification to channel that user has joined
        payload = {
            "type": "event",
            "data": {
                "acion": "JOIN",
                "data": {
                    "carrier": kwargs.get("added_by", user_id),
                    "recipient": kwargs.get("added", [user_id]),
                    "timestamp": timezone.now().isoformat()
                }
            }
        }

        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            print("publish failed because channel is not active")

        # should also store event notification as message in DB


@receiver(request_finished, sender=ChannelMemberViewset)
def LeftChannelSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "LeftChannelSignal":
        org_id = kwargs.get("org_id")
        channel_name = kwargs.get("channel_name")
        user_id = kwargs.get("user_id")
        
        room_name = build_room_name(org_id, channel_name)
        
        try:
            CLIENT.unsubscribe(user_id, room_name)
        except CentException:
            print("client sunscription failed because channel is not active")

        # send notification to channel that user has left
        payload = {
            "type": "event",
            "data": {
                "acion": "LEAVE",
                "data": {
                    "carrier": kwargs.get("removed_by", user_id),
                    "recipient": kwargs.get("removed", [user_id]),
                    "timestamp": timezone.now().isoformat()
                }
            }
        }

        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            print("publish failed because channel is not active")
    # should also store event notification as message in DB
