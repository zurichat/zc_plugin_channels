from rest_framework import serializers

from .models import ChannelMessage


class ChannelMessageSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(read_only=True)

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
