from dataclasses import dataclass, field

from django.utils import timezone
from django.utils.text import slugify

from channel_plugin.utils.customrequest import Request


@dataclass
class Channel:
    # name of channel
    name: str
    # list of user IDs in a channel
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
        # response = Request.post(
        #     organization_id, self.__class__.__name__.lower(), payload
        # )

        # return response

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
    # list of thread IDs
    thread: field(default_factory=list)
    # list of thread emojis
    emojis: field(default_factory=list)
    pinned: bool = False
    edited: bool = False
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        pass

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
    emojis: field(default_factory=list)
    edited: bool = False
    timestamp: str = timezone.now().isoformat()

    def create(self, organization_id):
        pass

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
    permission: field(default_factory=list)

    def create(self, organization_id):
        pass

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
