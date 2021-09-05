from dataclasses import dataclass


@dataclass
class User:
    name: str
    email: str
    # ID of role in channel
    role: str
    contact: str = ""
    is_admin: bool = False

    def create(self, organization_id):
        pass

    """"
    organization_id: str
    params: dict (query params to be appended to url to get data)
    """

    def read(self, organization_id, params):
        pass

    def update(self, organization_id, **kwargs):
        pass

    def delete(self, organization_id, **kwargs):
        pass

    def __str__(self):
        return self.name
