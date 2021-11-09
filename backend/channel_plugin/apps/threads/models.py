from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import Request


@dataclass
class Thread:
    user_id: str
    channel_id: str
    channelmessage_id: str
    content: str = ""
    emojis: list = field(default_factory=list)
    # list of files
    files: list = field(default_factory=list)
    has_files: bool = False
    edited: bool = False
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "user_id": self.user_id,
            "channelmessage_id": self.channelmessage_id,
            "channel_id": self.channel_id,
            "content": self.content,
            "files": self.files,
            "has_files": self.has_files,
            "emojis": self.emojis,
            "edited": self.edited,
            "timestamp": self.timestamp,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    def __str__(self):
        return self.content
