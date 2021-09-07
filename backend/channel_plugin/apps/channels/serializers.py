from django.utils.text import slugify
from rest_framework import serializers

from .models import Channel, ChannelMessage, Role, Thread


class ChannelSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=100, required=True)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(default=False)

    def validate_name(self, name):
        """
        Validate name doesnt alreat exist in organization
        """
        return name

    def to_representation(self, instance):
        instance = dict(instance)
        slug = slugify(instance.get("name"))
        channel = Channel(**instance, slug=slug)
        data = {"channel": channel}
        return data


class Permission(serializers.Serializer):

    name = serializers.CharField(max_length=50)
    description = serializers.CharField()


class RoleSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=10)
    channel_id = serializers.CharField(read_only=True)
    permissions = Permission(many=True)

    def to_representation(self, instance):
        instance = dict(instance)
        channel_id = self.context.get("channel_id")
        instance["permissions"] = [
            {**item, "key": slugify(item.get("name"))}
            for item in instance.get("permissions")
        ]
        role = Role(**instance, channel_id=channel_id)
        data = {"role": role}
        return data


class UserSerializer(serializers.Serializer):

    _id = serializers.CharField(max_length=10, required=True)
    role_id = serializers.CharField(max_length=10, required=False)
    is_admin = serializers.BooleanField(default=False)


class ChannelUpdateSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=100, required=True)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(default=True)
    users = UserSerializer(many=True)
    roles = RoleSerializer(many=True)

    def validate_name(self, name):
        """
        Validate name doesnt already exist here
        """
        return name

    def to_representation(self, instance):
        if instance:
            instance = dict(instance)
            channel = Channel(**instance)
            data = {"channel": channel}
            return data
        return super().to_representation(instance)


class ChannelMessageSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=10, required=True)
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        channel_id = self.context.get("channel_id")
        message = ChannelMessage(**instance, channel_id=channel_id)
        data = {"channelmessage": message}
        return data


class ChannelMessageUpdateSerializer(serializers.Serializer):

    user_id = serializers.CharField(read_only=True)
    channel_id = serializers.CharField(read_only=True)
    content = serializers.CharField()
    emojis = serializers.ListField(serializers.CharField(), allow_empty=True)
    pinned = serializers.BooleanField(default=False)
    edited = serializers.BooleanField(default=False)
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        message = ChannelMessage(**instance)
        data = {"message": message}
        return data


class ThreadSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=10, required=True)
    content = serializers.CharField()
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        channelmessage_id = self.context.get("channelmessage_id")
        thread = Thread(**instance, channelmessage_id=channelmessage_id)
        data = {"thread": thread}
        return data


class ThreadUpdateSerializer(serializers.Serializer):

    user_id = serializers.CharField(read_only=True)
    channelmessage_id = serializers.CharField(read_only=True)
    content = serializers.CharField()
    emojis = serializers.ListField(serializers.CharField(), allow_empty=True)
    edited = serializers.BooleanField(default=False)
    timestamp = serializers.DateTimeField(read_only=True)

    def to_representation(self, instance):
        instance = dict(instance)
        thread = Thread(**instance)
        data = {"thread": thread}
        return data


class SearchMessageQuerySerializer(serializers.Serializer):
    value = serializers.CharField(max_length=100)
