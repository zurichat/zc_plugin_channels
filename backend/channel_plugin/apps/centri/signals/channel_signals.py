from django.core.signals import request_finished
from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from apps.centri.centwrapper import CentClient
from apps.channels.views import ChannelMemberViewset
from apps.channelmessages.serializers import ChannelMessageSerializer
from apps.centri.helperfuncs import build_room_name


CLIENT = CentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 3,
    verify = True
)


@receiver(request_finished, sender=ChannelMemberViewset)
def JoinedChannelSignal(sender, **kwargs):
  
    serializer = ChannelMessageSerializer(
            data=data, context={"channel_id": channel_id, "org_id": org_id})
    
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
          
@receiver(request_finished, sender=ChannelViewset)
def ChannelUpdateSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")

    if uid == "ChannelUpdateSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")

        room_name = build_room_name(org_id, channel_id)

        # send message to channel that user has edited a message
        payload = kwargs.get("data", {})

        payload["event"] = {
            "action": "update:changes has been made to channel details"
        }

        try:
            print("\n")
            print(payload)
            print("\n")

            CLIENT.publish(room_name, payload)
        except CentException:
            pass


