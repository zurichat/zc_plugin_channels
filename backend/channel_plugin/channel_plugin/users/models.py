from dataclasses import dataclass


@dataclass
class User:
    name: str
    email: str
    # ID of role in channel
    role: str
    channel_id: str
    avatar: str = ""
    contact: str = ""
    is_admin: bool = False

    def create(self, organization_id):
        pass

    def __str__(self):
        return self.name
