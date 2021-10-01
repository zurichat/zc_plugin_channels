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


@dataclass
class Permission:
    name: str
    key: str
    description: str

    def __str__(self):
        return self.name
