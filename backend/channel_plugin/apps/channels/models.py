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
    params: dict (query params to be appended to url to get data)
    """

    def read(self, organization_id, params):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def update(self, organization_id, **kwargs):
        payload = {
            "_id": "1",
            "name": self.name.lower(),
            "slug": slugify(self.name.lower()),
            "description": self.description,
            "private": self.private,
            "users": self.users,
            "roles": self.roles,
            "created_on": self.created_on,
        }
        return payload

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def delete(self, organization_id, **kwargs):
        pass

    def __str__(self):
        return self.name


@dataclass
class ChannelMessage:
    user_id: str
    channel_id: str
    content: str
    # list of thread emojis
    emojis: list = field(default_factory=list)
    pinned: bool = False
    edited: bool = False
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        payload = {
            "user_id": self.user_id,
            "channel_id": self.channel_id,
            "content": self.content,
            "emojis": self.emojis,
            "pinned": self.pinned,
            "edited": self.edited,
            "timestamp": self.timestamp,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    """"
    organization_id: str
    params: dict (query params to be appended to url to get data)
    """

    def read(self, organization_id, params):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def update(self, organization_id, **kwargs):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def delete(self, organization_id, **kwargs):
        pass

    def __str__(self):
        return self.content


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
    params: dict (query params to be appended to url to get data)
    """

    def read(self, organization_id, params):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def update(self, organization_id, **kwargs):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def delete(self, organization_id, **kwargs):
        pass

    def __str__(self):
        return self.content


@dataclass
class Role:
    """
    Set of roles for a particular channel
    """

    name: str
    channel_id: str
    permissions: list = field(default_factory=list)

    def create(self, organization_id):
        payload = {
            "name": self.name,
            "channel_id": self.channel_id,
            "permissions": self.permissions,
        }
        response = Request.post(
            organization_id, self.__class__.__name__.lower(), payload
        )
        return response

    """"
    organization_id: str
    params: dict (query params to be appended to url to get data)
    """

    def read(self, organization_id, params):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def update(self, organization_id, **kwargs):
        pass

    """"
    organization_id: str
    kwargs: either filter (dict) or object_id (str)
    """

    def delete(self, organization_id, **kwargs):
        pass

    def __str__(self):
        return self.name


@dataclass
class Permission:
    name: str
    key: str
    description: str

    def __str__(self):
        return self.name
