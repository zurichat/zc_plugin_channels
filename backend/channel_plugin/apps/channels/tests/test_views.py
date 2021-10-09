import pytest
from django.conf import settings
from django.urls import reverse
from faker import Faker

fake = Faker()
ORG_ID = getattr(settings, "ORG_ID", "testorg")


@pytest.mark.asyncio
class TestChannelEndpoints:
    def test_channel_create(self, api_client, reset_db):

        confirmation = reset_db(
            "channel"
        )  # reset the collection in the db, can input multiple collection name
        if not confirmation:
            assert False

        client = api_client()
        url = reverse("channels:list-create-channel", kwargs={"org_id": ORG_ID})
        data = {
            "name": fake.company(),
            "owner": "".join(fake.uuid4().split("-"))[
                :30
            ],  # serializer constraint of 30 characters
            "private": False,
            "default": True,
            "description": fake.paragraph(),
            "topic": fake.catch_phrase(),
        }
        response = client.post(url, data=data, format="json")
        assert response.status_code == 201
        assert response.json().__contains__("_id")
