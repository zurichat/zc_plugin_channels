from apps.channels.serializers import UserSerializer
from rest_framework import serializers

from .models import MESSAGE_TYPES, ChannelMessage


class EventSerializer(serializers.Serializer):
    CHOICES = ("JOIN", "LEAVE")
    action = serializers.CharField(max_length=20, required=True)

    recipients = serializers.ListField(
        child=UserSerializer(many=True), required=False, allow_empty=False
    )


class ChannelMessageSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField(
        required=False, help_text="Body (text) of this message"
    )
    files = serializers.ListField(
        child=serializers.URLField(),
        allow_empty=True,
        required=False,
        help_text="List of URLs to files/media in this message",
    )
    event = serializers.DictField(
        child=EventSerializer(many=False),
        allow_empty=True,
        required=False,
        help_text="Event payload related to this message",
    )
    timestamp = serializers.DateTimeField(read_only=True)

    def validate(self, attrs):
        if attrs.get("content", None) is None and attrs.get("files", None) is None:
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

    title = serializers.CharField(read_only=True, help_text="Emoji title")
    count = serializers.IntegerField(
        read_only=True, help_text="Number of reactions made with this emoji"
    )
    users = serializers.ListField(
        read_only=True, help_text="List of users that reacted with this emoji"
    )


class ChannelMessageReactionsUpdateSerializer(serializers.Serializer):
    title = serializers.CharField(
        required=True,
        help_text="Emoji title",
    )
    member_id = serializers.CharField(help_text="User ID")


class ChannelMessageUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    user_id = serializers.CharField(read_only=True)
    channel_id = serializers.CharField(read_only=True, help_text="Channel UUID")
    can_reply = serializers.BooleanField(read_only=True)
    type = serializers.ChoiceField(
        choices=MESSAGE_TYPES,
        read_only=True,
        # help_text="This object is one of these two types: message or event"
    )
    edited = serializers.BooleanField(
        read_only=True,
        help_text="Default: false. True if this message has been updated",
    )
    files = serializers.ListField(
        read_only=True, help_text="List of URLs to files/media in this message"
    )
    timestamp = serializers.DateTimeField(read_only=True)
    replies = serializers.IntegerField(
        read_only=True,
        help_text="Number of messages sent as replies to this message (threads)",
    )
    has_files = serializers.BooleanField(
        read_only=True,
        help_text="Default: false. True if files/media are in this message",
    )
    pinned = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this message has been pinned to the channel",
    )
    content = serializers.CharField(
        required=False, help_text="Body (text) of this message"
    )
    emojis = serializers.ListField(
        serializers.CharField(),
        allow_empty=True,
        required=False,
        help_text="List of reactions made to this message",
    )
    event = serializers.DictField(
        read_only=True,
        help_text="Contains the payload, if the 'type' of this object is 'event'",
    )

    def to_representation(self, instance):
        instance = dict(instance)

        data = {"message": instance}
        return data


class ChannelMessageSearchSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=100, required=False)
    content = serializers.CharField(max_length=100, required=False)
    has_files = serializers.BooleanField(required=False)
    pinned = serializers.BooleanField(required=False)


class ChannelMessageSearchResultSerializer(serializers.Serializer):

    result = ChannelMessageUpdateSerializer(many=True)
    query = ChannelMessageSearchSerializer()
