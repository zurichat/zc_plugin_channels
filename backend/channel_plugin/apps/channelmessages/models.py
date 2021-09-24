from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import Request

MESSAGE_TYPES = ["message", "event"]
DEFAULT_MESSAGE_TYPE = "message"

# Create your models here.


@dataclass
class ChannelMessage:
    user_id: str
    channel_id: str
    content: str = ""

    # list of thread emojis
    emojis: list = field(default_factory=list)
    # list of files
    files: list = field(default_factory=list)
    has_files: bool = False
    pinned: bool = False
    edited: bool = False
    replies: int = 0
    can_reply: bool = True
    type: str = DEFAULT_MESSAGE_TYPE
    timestamp: str = timezone.now().isoformat()

    #NewlyAdded: 
    event: dict = field(default_factory=dict)

    def create(self, organization_id):
        payload = {
            "user_id": self.user_id,
            "channel_id": self.channel_id,
            "content": self.content,
            "emojis": self.emojis,
            "has_files": self.has_files,
            "files": self.files,
            "pinned": self.pinned,
            "edited": self.edited,
            "type": self.type,
            "event": self.event,
            "replies": self.replies,
            "can_reply": self.can_reply,
            "timestamp": self.timestamp,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    def __str__(self):
        return self.content
