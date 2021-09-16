from dataclasses import dataclass, field

from django.utils import timezone

from channel_plugin.utils.customrequest import Request


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
    # private / public
    private: bool = False
    archived: bool = False
    # when channel was created
    created_on: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "name": self.name.lower(),
            "slug": self.slug,
            "owner": self.owner,
            "description": self.description,
            "private": str(self.private),
            "archived": str(self.archived),
            "users": self.users,
            "created_on": self.created_on,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    def __str__(self):
        return str(self.name)
