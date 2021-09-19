from django.utils.text import slugify
from rest_framework import serializers

from channel_plugin.utils.customrequest import Request

from .models import Channel


class ChannelSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=100, required=True)
    owner = serializers.CharField(max_length=30, required=True)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(default=False)

    def validate_name(self, name):
        """
        Validate name doesnt alreat exist in organization
        """
        data = {"name": name.lower()}
        response = Request.get(self.context.get("org_id"), "channel", data)
        if type(response) == list:
            raise serializers.ValidationError({"error": "Name already exist"})
        return name

    def to_representation(self, instance):
        instance = dict(instance)
        user_id = instance.get("owner")
        slug = slugify(instance.get("name"))
        channel = Channel(**instance, slug=slug)
        channel.users = {user_id: {"_id": user_id, "is_admin": True}}
        data = {"channel": channel}
        return data


class UserSerializer(serializers.Serializer):

    _id = serializers.CharField(max_length=30, required=True)
    role_id = serializers.CharField(max_length=30, required=False)
    is_admin = serializers.BooleanField(default=False)


class ChannelGetSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(required=False)
    owner = serializers.CharField(required=False)
    archived = serializers.BooleanField(required=False)
    users = serializers.DictField(child=serializers.DictField(), required=False)


class ChannelUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(required=False)

    def validate_name(self, name):
        """
        Validate name doesnt already exist here
        """
        data = {"name": name.lower()}
        response = Request.get(self.context.get("org_id"), "channel", data)
        if type(response) == list:
            if response[0]["_id"] != self.context.get("_id"):
                raise serializers.ValidationError({"error": "Name already exist"})
        return name

    def to_representation(self, instance):
        if instance:
            instance = dict(instance)
            users = instance.pop("users", None)
            new_users_dict = dict()

            if users:
                for user in users:
                    key = user.get("_id")
                    new_users_dict.update({key: user})
                instance.update({"users": new_users_dict})

            slug = instance.get("name")
            if slug is not None:
                instance.update({"slug": slugify(slug)})
            data = {"channel": instance}
            return data
        return super().to_representation(instance)


class SearchMessageQuerySerializer(serializers.Serializer):
    value = serializers.CharField(max_length=100)


class UserChannelGetSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
    name = serializers.CharField(max_length=100, required=False)
    description = serializers.CharField(required=False)
