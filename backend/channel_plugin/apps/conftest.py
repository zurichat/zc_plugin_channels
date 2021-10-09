import pytest
from apps.channels.tests.factories import ChannelFactory
from django.conf import settings
from rest_framework.test import APIClient

from channel_plugin.utils.customrequest import Request

ORG_ID = getattr(settings, "ORG_ID", "testorg")
COLLECTIONS = ["channel", "channelmessage", "role", "thread"]


@pytest.fixture
def api_client():
    return APIClient


@pytest.fixture
def create_channel():
    channel = ChannelFactory()
    res = channel.create()
    if not res.__contains__("_id"):
        return None
    return res


@pytest.fixture
def reset_db():
    def rd(*args):
        for collection_name in args:
            if collection_name in COLLECTIONS:
                data = Request.get(ORG_ID, collection_name)
                if isinstance(data, list):
                    if len(data) > 0:
                        res = Request.delete(ORG_ID, collection_name, data_filter={})
                        if res.get("status") == 200:
                            if res.get("data", {}).get("deleted_count") == len(data):
                                return True
                        return False
        return True

    return rd
