from django.core.signing import Signer
from django.utils.text import slugify

def build_room_name(org_id, channel_name):
    signer = Signer(salt=org_id)
    name = f"{signer.sign(channel_name)}"
    return slugify(name)
