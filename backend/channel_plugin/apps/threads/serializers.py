import requests
from django.conf import settings
from django.urls import reverse
from rest_framework import serializers

from channel_plugin.utils.customrequest import Request

from .models import Thread


class ThreadSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(read_only=True)

    def validate_user_id(self, user_id):

        channel_id = self.context.get("channel_id")

        org_id = self.context.get("org_id")

        url = settings.BASE_URL + (
            reverse(
                "channels:channel-members-list",
                kwargs={"org_id": org_id, "channel_id": channel_id},
            )
        )

        res = requests.get(url).json()

        if type(res) != list:

            raise serializers.ValidationError(res)

        tmp = list(filter(lambda item: item.get("_id") == user_id, res))

        if not bool(tmp):

            raise serializers.ValidationError({"error": "User not in channel"})
        return user_id

    def to_representation(self, instance):
        instance = dict(instance)
        channelmessage_id = self.context.get("channelmessage_id")
        org_id = self.context.get("org_id")
        res = Request.get(org_id, "channelmessage", {"_id": channelmessage_id})
        channel_id = res.get("channel_id")
        if channel_id is None:
            raise serializers.ValidationError(
                {"error": "Cannot add thread at the moment"}
            )
        thread = Thread(
            **instance, channelmessage_id=channelmessage_id, channel_id=channel_id
        )
        data = {"thread": thread}
        return data


class ThreadUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    user_id = serializers.CharField(read_only=True)
    channelmessage_id = serializers.CharField(read_only=True)
    content = serializers.CharField(required=False)
    emojis = serializers.ListField(
        serializers.CharField(), allow_empty=True, required=False
    )
    edited = serializers.BooleanField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        data = {"thread": instance}
        return data
