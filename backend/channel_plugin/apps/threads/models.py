from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import Request


@dataclass
class Thread:
    user_id: str
    channelmessage_id: str
    content: str
    emojis: list = field(default_factory=list)
    edited: bool = False
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "user_id": self.user_id,
            "channelmessage_id": self.channelmessage_id,
            "content": self.content,
            "emojis": self.emojis,
            "edited": self.edited,
            "timestamp": self.timestamp,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def update(self, organization_id, id):
        payload = {
            "content": self.content,
            "emojis": self.emojis,
            "edited": True,
        }
        response = Request.put(
            organization_id, self.__class__.__name__.lower(), payload, object_id=id
        )
        return response

    def __str__(self):
        return self.content
