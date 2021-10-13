from django.dispatch import receiver
from django.utils import timezone
from django.conf import settings

from cent import CentException

from apps.centri.centwrapper import AsyncCentClient
from apps.channels.views import ChannelMemberViewset, ChannelViewset
from apps.channelmessages.serializers import ChannelMessageSerializer
from apps.centri.helperfuncs import build_room_name
import asyncio

from apps.centri.signals.async_signal import request_finished

CLIENT = AsyncCentClient(
    address = settings.CENTRIFUGO_URL,
    api_key = settings.CENTRIFUGO_API_KEY,
    timeout = 3,
    verify = True
)


@receiver(request_finished, sender=ChannelMemberViewset)
async def JoinedChannelSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "JoinedChannelSignal":
        org_id = kwargs.get("org_id")
        channel_id = kwargs.get("channel_id")
        user = kwargs.get("user")

        room_name = build_room_name(org_id, channel_id)

        if user:
            data = {"user_id": user.get("_id"), "content": "event", "files": []}
        else:
            if not kwargs.get("added"):
                return None
            else:
                try:
                    data = {
                        "user_id": kwargs.get("added")[0].get("_id"),
                        "content": "event",
                        "files": [],
                    }
                except:  # noqa
                    return None

        event = {"action": "join:channel", "recipients": kwargs.get("added", [user])}

        try:
            serializer = ChannelMessageSerializer(
                data=data, context={"channel_id": channel_id, "org_id": org_id}
            )

            serializer.is_valid(raise_exception=True)
            channelmessage = serializer.data.get("channelmessage")
            channelmessage.type = "event"
            channelmessage.event = event
            channelmessage.can_reply = False
            # required
            result = channelmessage.create(org_id)
            await CLIENT.publish(room_name, result)
        except:
            pass


@receiver(request_finished, sender=ChannelMemberViewset)
async def LeftChannelSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    
    if uid == "LeftChannelSignal":
                
    
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
            await CLIENT.publish(room_name, result)
        except:
            pass

