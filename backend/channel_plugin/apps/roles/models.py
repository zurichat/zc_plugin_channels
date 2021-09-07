from dataclasses import dataclass, field

from channel_plugin.utils.customrequest import Request


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

    def update(self, organization_id, id):
        payload = {
            "name": self.name,
            "channel_id": self.channel_id,
            "permissions": self.permissions,
        }
        response = Request.put(
            organization_id, self.__class__.__name__.lower(), payload, object_id=id
        )
        return response

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
