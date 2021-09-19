from rest_framework import serializers

from .models import Media

MEDIA_CHOICES = ["channelmessage", "thread"]


class MediaSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    user_id = serializers.CharField(max_length=30, required=True)
    channel_id = serializers.CharField(required=True)
    message_id = serializers.CharField(required=True)
    type = serializers.ChoiceField(choices=MEDIA_CHOICES)
    files = serializers.ListField(
        child=serializers.URLField(), allow_empty=True, required=True
    )
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        media = Media(**instance)
        data = {"media": media}
        return data


# class MediaUpdateSerializer(serializers.Serializer):

#     user_id = serializers.CharField(max_length=30, read_only=True)
#     channel_id = serializers.CharField(read_only=True)
#     message_id = serializers.CharField(read_only=True)
#     files = serializers.ListField(child=serializers.URLField(), allow_empty=True, required=True)
#     timestamp = serializers.DateTimeField(read_only=True)
