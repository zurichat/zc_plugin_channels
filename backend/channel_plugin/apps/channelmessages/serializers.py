import requests
from django.conf import settings
from django.urls import reverse
from rest_framework import serializers

from .models import ChannelMessage


class ChannelMessageSerializer(serializers.Serializer):

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

        channel_id = self.context.get("channel_id")

        message = ChannelMessage(**instance, channel_id=channel_id)

        data = {"channelmessage": message}
        return data


class ChannelMessageUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()

    user_id = serializers.CharField(read_only=True)

    channel_id = serializers.CharField(read_only=True)

    content = serializers.CharField(required=False)

    emojis = serializers.ListField(
        serializers.CharField(), allow_empty=True, required=False
    )

    pinned = serializers.BooleanField(required=False)

    edited = serializers.BooleanField(read_only=True)

    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)

        data = {"message": instance}
        return data
