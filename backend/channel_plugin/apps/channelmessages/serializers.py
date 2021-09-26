from apps.channels.serializers import UserSerializer
from rest_framework import serializers

from channel_plugin.utils.customrequest import Request

from .models import MESSAGE_TYPES, ChannelMessage


class EventSerializer(serializers.Serializer):
    CHOICES = ("JOIN", "LEAVE")
    action = serializers.CharField(max_length=20, required=True)

    recipients = serializers.ListField(
        child=UserSerializer(many=True), required=False, allow_empty=False
    )


class ChannelMessageSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField(required=False)

    files = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, required=False
    )
    event = serializers.DictField(
        child=EventSerializer(many=False), allow_empty=True, required=False
    )
    timestamp = serializers.DateTimeField(read_only=True)

    def validate(self, attrs):
        if bool(attrs.get("content")) and bool(attrs.get("files")):
            raise serializers.ValidationError(
                {"error": "Both content & files cannot be none"}
            )
        return super().validate(attrs)

    def to_representation(self, instance):
        instance = dict(instance)
        files = instance.get("files", None)
        channel_id = self.context.get("channel_id")
        if files:
            message = ChannelMessage(**instance, channel_id=channel_id, has_files="yes")
        else:
            message = ChannelMessage(**instance, channel_id=channel_id)
        data = {"channelmessage": message}
        return data


class ChannelMessageReactionSerializer(serializers.Serializer):

    title = serializers.CharField(read_only=True)
    count = serializers.IntegerField(read_only=True)
    users = serializers.ListField(read_only=True)


class ChannelMessageReactionsUpdateSerializer(serializers.Serializer):
    title = serializers.CharField(required=True)
    member_id = serializers.CharField()


class ChannelMessageUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    user_id = serializers.CharField(read_only=True)
    channel_id = serializers.CharField(read_only=True)
    can_reply = serializers.BooleanField(read_only=True)
    type = serializers.ChoiceField(choices=MESSAGE_TYPES, read_only=True)
    edited = serializers.BooleanField(read_only=True)
    files = serializers.ListField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)
    replies = serializers.IntegerField(read_only=True)
    has_files = serializers.BooleanField(read_only=True)

    pinned = serializers.BooleanField(required=False)
    content = serializers.CharField(required=False)

    emojis = serializers.ListField(
        serializers.CharField(), allow_empty=True, required=False
    )

    event = serializers.DictField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)

        data = {"message": instance}
        return data


# class MessageEmojiUpdateSerializer(serializers.Serializer):
#     title = serializers.CharField(max_length=50)
#     member_id = serializers.CharField()
