from django.core.signals import request_finished
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from apps.centri.centwrapper import CentClient
from apps.channelmessages.views import ChannelMessageViewset
from apps.centri.helperfuncs import build_room_name


CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 3,
    verify = True
)


@receiver(request_finished, sender=ChannelMessageViewset)
def CreateMessageSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "CreateMessageSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)
        
        # send notification to channel that has created a new message
        payload = kwargs.get("data", {})

        payload["event"] = {
            "action": "create:message"
        }

        try: 
            print("\n")
            print(payload)
            print("\n")
            CLIENT.publish(room_name, payload)
        except CentException:
            pass

@receiver(request_finished, sender=ChannelMessageViewset)
def EditMessageSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "EditMessageSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)
        
        # send message to channel that user has edited a message
        payload = kwargs.get("data", {})

        payload["event"] = {
            "action": "update:message"
        }

        try:
            print("\n")
            print(payload)
            print("\n")

            CLIENT.publish(room_name, payload)
        except CentException:
            pass

@receiver(request_finished, sender=ChannelMessageViewset)
def DeleteMessageSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "DeleteMessageSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)

        # send notification to channel that user has joined
        payload = kwargs.get("data", {})
        payload["can_reply"] = False
        
        payload["event"] = {
            "action": "delete:message"
        }

        try:
            print("\n")
            print(payload)
            print("\n")

            CLIENT.publish(room_name, payload)
        except CentException:
            pass
