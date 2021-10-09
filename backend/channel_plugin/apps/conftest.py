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


def rd():
    flag = []
    for collection_name in COLLECTIONS:
        data = Request.get(ORG_ID, collection_name)
        if isinstance(data, list) or data is None:
            if isinstance(data, list):
                if len(data) > 0:
                    res = Request.delete(ORG_ID, collection_name, data_filter={})
                    if res.get("status") == 200:
                        if res.get("data", {}).get("deleted_count") == len(data):
                            flag.append(True)
                        else:
                            flag.append(False)
                    else:
                        flag.append(False)
            else:
                flag.append(True)
        else:
            if isinstance(data, dict):
                if data.get("error", {}).get("status") == 404:
                    flag.append(True)
                else:
                    flag.append(False)
            else:
                flag.append(False)
    return flag


@pytest.fixture(autouse=True)
def reset_db():

    flags = rd()
    if not all(flags):
        assert False

    yield
    rd()
