from rest_framework import serializers

from .models import Thread


class ThreadSerializer(serializers.Serializer):

    user_id = serializers.CharField(
        max_length=30,
        required=True,
        help_text="User ID"
    )
    content = serializers.CharField(
        required=False,
        help_text="Body (text) of thread message"
    )
    files = serializers.ListField(
        child=serializers.URLField(),
        allow_empty=True,
        required=False,
        help_text="List of URLs to files/media in this thread message"
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
        channelmessage_id = self.context.get("channelmessage_id")
        channel_id = self.context.get("channel_id")
        files = instance.get("files", None)
        channel_id = self.context.get("channel_id")
        if files:
            thread = Thread(
                **instance,
                channelmessage_id=channelmessage_id,
                channel_id=channel_id,
                has_files=True
            )
        else:
            thread = Thread(
                **instance, channelmessage_id=channelmessage_id, channel_id=channel_id
            )
        data = {"thread": thread}
        return data


class ThreadUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField(help_text="Thread message ID")
    user_id = serializers.CharField(
        read_only=True,
        help_text="User ID"
    )
    channelmessage_id = serializers.CharField(
        read_only=True,
        help_text="Channel message ID"
    )
    channel_id = serializers.CharField(
        read_only=True,
        help_text="Channel ID"
    )
    content = serializers.CharField(
        required=False,
        help_text="Body (text) of thread message",
    )
    files = serializers.ListField(
        child=serializers.URLField(),
        allow_empty=True,
        read_only=True,
        help_text="List of URLs to files/media in this thread message"
    )
    has_files = serializers.BooleanField(
        read_only=True,
        help_text="Default: false. True if a file/media is in this thread message"
    )
    emojis = serializers.ListField(
        serializers.CharField(),
        allow_empty=True,
        required=False,
        help_text="List of reactions made to this thread message"
    )
    edited = serializers.BooleanField(
        read_only=True,
        help_text="Default: false. True if this thread message has been edited"
    )
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        data = {"thread": instance}
        return data
