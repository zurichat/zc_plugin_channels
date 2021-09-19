from django.core.signals import request_finished
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from .centwrapper import CentClient
from apps.channels.views import ChannelMemberViewset
from apps.channelmessages.views import ChannelMessageViewset
from .helperfuncs import build_room_name

CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 1,
    verify = True
)



# >>>>>>>>>>> channels signals <<<<<<<<<<<<<<<<<<
@receiver(request_finished, sender=ChannelMemberViewset)
def JoinedChannelSignal(sender, **kwargs):
    
    uid = kwargs.get("dispatch_uid")
    
    if uid == "JoinedChannelSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")
        user_id = kwargs.get("user_id")
        
        room_name = build_room_name(org_id, channel_id)
        
        try:
            CLIENT.subscribe(user_id, room_name)
        except CentException:
            print("client sunscription failed because channel is not active")

        # send notification to channel that user has joined
        payload = {
            "type": "event",
            "action": "JOIN",
            "data": {
                "carrier": kwargs.get("added_by", user_id),
                "recipients": kwargs.get("added", [user_id]),
                "timestamp": timezone.now().isoformat()
            }
        }

        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            print("publish failed because channel is not active")

@receiver(request_finished, sender=ChannelMemberViewset)
def LeftChannelSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "LeftChannelSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")
        user_id = kwargs.get("user_id")
        
        room_name = build_room_name(org_id, channel_id)
        
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
                    "recipients": kwargs.get("removed", [user_id]),
                    "timestamp": timezone.now().isoformat()
                }
            }
        }

        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            print("publish failed because channel is not active")
    # should also store event notification as message in DB


# >>>>>>>>>>> channelmessages signals <<<<<<<<<<<<<<<<<< 
@receiver(request_finished, sender=ChannelMessageViewset)
def CreateMessageSignal(sender, retries=0, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "CreateMessageSignal" and retries < 4:
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)
        
        # send notification to channel that user has joined
        payload = {
            "type": "message",
            "action": "CREATE",
            "data": kwargs.get("data", {})
        }

        try: 
            CLIENT.publish(room_name, payload)
        except CentException:
            CreateMessageSignal(sender, retries+1, **kwargs)

@receiver(request_finished, sender=ChannelMessageViewset)
def DeleteMessageSignal(sender, retries=0, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "DeleteMessageSignal" and retries < 4:
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)

        # send notification to channel that user has joined
        payload = {
            "type": "message",
            "action": "DELETE",
            "data": kwargs.get("data", {})
        }
        
        try: 
            CLIENT.publish(room_name, payload)
        except CentException:
            DeleteMessageSignal(sender, retries+1, **kwargs)

@receiver(request_finished, sender=ChannelMessageViewset)
def EditMessageSignal(sender, retries=0, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "EditMessageSignal" and retries < 4:
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)
        
        payload = {
            "type": "message",
            "action": "EDIT",
            "data": kwargs.get("data", {})
        }

        # send message to channel that user has edited a message
        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            EditMessageSignal(sender, retries+1, **kwargs)

@receiver(request_finished, sender=ChannelMessageViewset)
def ReactMessageSignal(sender, retries=0, **kwargs):
    uid = kwargs.get("dispatch_uid")

    if uid == "ReactMessageSignal" and retries < 4:
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)
        
        payload = {
            "type": "message",
            "action": "REACT",
            "data": kwargs.get("data", {})
        }

        # send message to channel that a user has reacted a message
        try:
            CLIENT.publish(room_name, payload)
        except CentException:
            ReactMessageSignal(sender, retries+1, **kwargs)    

