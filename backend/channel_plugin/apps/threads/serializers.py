from rest_framework import serializers

from .models import Thread


class ThreadSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        channelmessage_id = self.context.get("channelmessage_id")
        thread = Thread(**instance, channelmessage_id=channelmessage_id)
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
