from django.conf import settings
from django.urls import reverse
from faker import Faker

fake = Faker()
ORG_ID = getattr(settings, "ORG_ID", "testorg")


class TestChannelEndpoints:
    def test_channel_create(self, api_client):

        client = api_client()
        url = reverse("channels:list_create_channel", kwargs={"org_id": ORG_ID})
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
