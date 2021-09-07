from dataclasses import dataclass, field

from django.utils import timezone
from django.utils.text import slugify

from channel_plugin.utils.customrequest import Request


@dataclass
class Channel:
    # name of channel
    name: str
    # list of user IDs in a channel
    slug: str
    users: list = field(default_factory=list)
    # list of role IDs in a channel
    roles: list = field(default_factory=list)
    # description of channel
    description: str = ""
    # private / public
    private: bool = False
    # when channel was created
    created_on: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "name": self.name.lower(),
            "slug": self.slug,
            "description": self.description,
            "private": self.private,
            "users": self.users,
            "roles": self.roles,
            "created_on": self.created_on,
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
            "name": self.name.lower(),
            "slug": slugify(self.name.lower()),
            "description": self.description,
            "private": self.private,
            "users": self.users,
            "roles": self.roles,
        }
        response = Request.put(
            organization_id, self.__class__.__name__.lower(), payload, object_id=id
        )
        return response

    def __str__(self):
        return self.name
