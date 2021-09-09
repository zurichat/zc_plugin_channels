from django.utils.text import slugify
from rest_framework import serializers

from .models import Role


class Permission(serializers.Serializer):

    name = serializers.CharField(max_length=50)
    description = serializers.CharField()


class RoleSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField()
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
        if self.context.get("type") == "create":
            role = Role(**instance, channel_id=channel_id)
        else:
            role = instance
        data = {"role": role}
        return data
