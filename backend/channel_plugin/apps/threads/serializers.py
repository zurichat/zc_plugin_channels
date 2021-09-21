from rest_framework import serializers

from .models import Thread


class ThreadSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField(required=False)
    files = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, required=True
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

    _id = serializers.ReadOnlyField()
    user_id = serializers.CharField(read_only=True)
    channelmessage_id = serializers.CharField(read_only=True)
    channel_id = serializers.CharField(read_only=True)
    content = serializers.CharField(required=False)
    files = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, read_only=True
    )
    has_files = serializers.BooleanField(read_only=True)
    emojis = serializers.ListField(
        serializers.CharField(), allow_empty=True, required=False
    )
    edited = serializers.BooleanField(read_only=True)
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        data = {"thread": instance}
        return data
