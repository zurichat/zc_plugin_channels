from django.utils.text import slugify
from rest_framework import serializers

from .models import Role


class Permission(serializers.Serializer):

    name = serializers.CharField(max_length=50)
    description = serializers.CharField()


class RoleSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField(help_text="Role ID")
    name = serializers.CharField(
        max_length=20,
        help_text="Role name"
    )
    channel_id = serializers.CharField(
        read_only=True,
        help_text="Channel ID"
    )
    permissions = Permission(
        many=True,
        help_text="List of permissions for this role"
    )

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
