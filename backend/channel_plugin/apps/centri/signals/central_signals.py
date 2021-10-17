from apps.centri.centwrapper import AsyncCentClient
from apps.centri.signals.async_signal import request_finished
from django.conf import settings
from django.dispatch import receiver

from channel_plugin.utils.customrequest import AsyncRequest, unread

CLIENT = AsyncCentClient(
    address=settings.CENTRIFUGO_URL,
    api_key=settings.CENTRIFUGO_API_KEY,
    timeout=3,
    verify=True,
)


@receiver(request_finished, sender=None)
async def UpdateSidebarSignal(sender, **kwargs):
    uid = kwargs.get("dispatch_uid")
    if uid == "UpdateSidebarSignal":
        org_id = kwargs.get("org_id")
        room_id = kwargs.get("room_id")
        tmp = kwargs.get("user_id", [])
        member_ids = tmp if isinstance(tmp, list) else [tmp]

        if org_id is not None and member_ids is not None:

            channels = await AsyncRequest.get(org_id, "channel")
            joined_rooms = list()
            public_rooms = list()
            starred_rooms = list()

            if isinstance(channels, list):
                for member_id in member_ids:

                    joined_rooms = list(
                        map(
                            lambda channel: {
                                "room_name": channel.get("slug"),
                                "room_url": f"/channels/message-board/{channel.get('_id')}",
                                "room_image": "",
                                "unread": unread(org_id, channel.get("_id")),
                            },
                            list(
                                filter(
                                    lambda channel: member_id in channel["users"].keys()
                                    and not channel.get("default", False)
                                    and not channel["users"][member_id].get(
                                        "starred", False
                                    ),
                                    channels,
                                )
                            ),
                        )
                    )
                    starred_rooms = list(
                        map(
                            lambda channel: {
                                "room_name": channel.get("slug"),
                                "room_url": f"/channels/message-board/{channel.get('_id')}",
                                "room_image": "",
                                "unread": unread(org_id, channel.get("_id")),
                            },
                            list(
                                filter(
                                    lambda channel: member_id in channel["users"].keys()
                                    and not channel.get("default", False)
                                    and channel["users"][member_id].get(
                                        "starred", False
                                    ),
                                    channels,
                                )
                            ),
                        )
                    )
                    public_rooms = list(
                        map(
                            lambda channel: {
                                "room_name": channel.get("slug"),
                                "room_url": f"/channels/message-board/{channel.get('_id')}",
                                "room_image": "",
                            },
                            list(
                                filter(
                                    lambda channel: member_id
                                    not in channel["users"].keys()
                                    and not channel.get("private")
                                    and not channel.get("default", False),
                                    channels,
                                )
                            ),
                        )
                    )

                    payload = {
                        "event": "sidebar_update",
                        "plugin_id": "channels.zuri.chat",
                        "data": {
                            "name": "Channels Plugin",
                            "id": room_id,
                            "group_name": "Channel",
                            "show_group": True,
                            "category": "channels",
                            "button_url": "/channels",
                            "public_rooms": public_rooms,
                            "joined_rooms": joined_rooms,
                            "starred_rooms": starred_rooms,
                        },
                    }

                    room_name = f"{org_id}_{member_id}_sidebar"

                    try:
                        print("\n")
                        print(payload)
                        print("\n")
                        await CLIENT.publish(room_name, payload)
                    except:  # noqa
                        pass
