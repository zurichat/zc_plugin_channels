from apps.roles.serializers import RoleSerializer
from django.utils.text import slugify
from rest_framework import serializers

from channel_plugin.utils.customrequest import Request

from .models import Channel


class ChannelSerializer(serializers.Serializer):

    name = serializers.CharField(max_length=100, required=True)
    description = serializers.CharField(required=False)
    private = serializers.BooleanField(default=False)

    def validate_name(self, name):
        """
        Validate name doesnt alreat exist in organization
        """
        data = {"name": name}
        response = Request.get(self.context.get("org_id"), "channel", data)

        try:
            if response.json():
                raise serializers.ValidationError({"error": "Name already exist"})
        except AttributeError:
            if response:
                raise serializers.ValidationError({"error": "Name already exist"})
        return name

    def to_representation(self, instance):
        instance = dict(instance)
        slug = slugify(instance.get("name"))
        channel = Channel(**instance, slug=slug)
        data = {"channel": channel}
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
        data = {"name": name}
        response = Request.get(self.context.get("org_id"), "channel", data)
        try:
            if response.json():
                raise serializers.ValidationError({"error": "Name already exist"})
        except AttributeError:
            if response:
                raise serializers.ValidationError({"error": "Name already exist"})
        return name

    def to_representation(self, instance):
        if instance:
            instance = dict(instance)
            slug = slugify(instance.get("name"))
            channel = Channel(**instance, slug=slug)
            data = {"channel": channel}
            return data
        return super().to_representation(instance)


class SearchMessageQuerySerializer(serializers.Serializer):
    value = serializers.CharField(max_length=100)
