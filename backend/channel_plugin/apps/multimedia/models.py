from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import Request


@dataclass
class Media:
    user_id: str
    channel_id: str
    message_id: str
    type: str = "channelmessage"
    files: list = field(default_factory=list)
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "user_id": self.user_id,
            "message_id": self.message_id,
            "channel_id": self.channel_id,
            "type": self.type,
            "files": self.files,
            "timestamp": self.timestamp,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    def __str__(self):
        return self.message_id
