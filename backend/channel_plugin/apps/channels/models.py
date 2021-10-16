from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import AsyncRequest


@dataclass
class Channel:
    # name of channel
    name: str
    # creator of channel
    owner: str
    slug: str = ""
    # list of user IDs in a channel
    users: dict = field(default_factory=dict)
    # description of channel
    description: str = ""
    # NewlyAdded: a channels  topic
    topic: str = ""
    # private / public
    private: bool = False
    archived: bool = False
    default: bool = False
    # when channel was created
    created_on: str = timezone.now().isoformat()
    # allow all members input/post messages
    allow_members_input: bool = True

    async def create(self, organization_id):
        payload = {
            "name": self.name.lower(),
            "slug": self.slug,
            "owner": self.owner,
            "description": self.description,
            "topic": self.topic,
            "private": self.private,
            "archived": self.archived,
            "default": self.default,
            "users": self.users,
            "created_on": self.created_on,
            "allow_members_input": self.allow_members_input,
        }
        response = await AsyncRequest.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    def __str__(self):
        return str(self.name)
