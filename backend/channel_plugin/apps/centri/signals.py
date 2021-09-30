from django.core.signals import request_finished
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from .centwrapper import CentClient
from apps.channels.views import ChannelMemberViewset
from apps.channelmessages.views import ChannelMessageViewset
from apps.channelmessages.serializers import ChannelMessageSerializer
from .helperfuncs import build_room_name



CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 3,
    verify = True
)


# >>>>>>>>>>> channel member signals <<<<<<<<<<<<<<<<<<
@receiver(request_finished, sender=ChannelMemberViewset)
def JoinedChannelSignal(sender, **kwargs):
    
    uid = kwargs.get("dispatch_uid")
    
    if uid == "JoinedChannelSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")
        user = kwargs.get("user")

        room_name = build_room_name(org_id, channel_id)
        
        data = {
            "user_id": user.get("_id"),
            "content": "event",
            "files": []
        }

        event = {
            "action": "join:channel",
            "recipients": kwargs.get("added", [user])
        }

        serializer = ChannelMessageSerializer(
            data=data, 
            context={"channel_id": channel_id, "org_id": org_id}
        )

        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("channelmessage")
        
        # required
        channelmessage.type = "event"
        channelmessage.event = event
        channelmessage.can_reply = False

        try:
            result = channelmessage.create(org_id)
            CLIENT.publish(room_name, result)
        except:
            pass

@receiver(request_finished, sender=ChannelMemberViewset)
def LeftChannelSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "LeftChannelSignal":
                
    
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")
        user = kwargs.get("user")
        
        room_name = build_room_name(org_id, channel_id)

        try:
            CLIENT.unsubscribe(user.get("_id"), room_name)
        except CentException:
            print("client removal failed because channel is not active")
        
        data = {
            "user_id": user.get("_id"),
            "content": "event",
            "files": []
        }

        event = {
            "action": "leave:channel",
            "recipients": kwargs.get("removed", [user])
        }

        serializer = ChannelMessageSerializer(
            data=data, 
            context={"channel_id": channel_id, "org_id": org_id}
        )

        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("channelmessage")
        
        # required
        channelmessage.type = "event"
        channelmessage.event = event
        channelmessage.can_reply = False

        try:
            result = channelmessage.create(org_id)
            CLIENT.publish(room_name, result)
        except:
            pass

# >>>>>>>>>>> channelmessages signals <<<<<<<<<<<<<<<<<< 
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
            CLIENT.publish(room_name, payload)
        except CentException:
            pass
