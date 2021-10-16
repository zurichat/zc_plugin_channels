from apps.channelmembers.serializers import UserSerializer
from django.utils.text import slugify
from rest_framework import serializers

from channel_plugin.utils.customrequest import Request

from .models import Channel


class ChannelSerializer(serializers.Serializer):

    name = serializers.CharField(
        max_length=100, required=True, help_text="Channel name"
    )
    owner = serializers.CharField(
        max_length=30, required=True, help_text="Owner (member_id) of the channel"
    )
    description = serializers.CharField(required=False, help_text="Channel description")
    private = serializers.BooleanField(
        default=False,
        help_text="Default: false. True if this channel is set to private.",
    )
    topic = serializers.CharField(
        max_length=100, required=False, help_text="Channel topic"
    )
    default = serializers.BooleanField(
        default=False,
        help_text="Default: false. True if this channel is a default channel for an organization.",
    )

    def validate_name(self, name):
        """
        Validate name doesnt alreat exist in organization
        """
        data = {"name": name.lower()}
        response = Request.get(self.context.get("org_id"), "channel", data)
        if isinstance(response, list):
            raise serializers.ValidationError({"error": "Name already exist"})
        return name

    def to_representation(self, instance):
        instance = dict(instance)
        user_id = instance.get("owner")
        slug = slugify(instance.get("name"))
        channel = Channel(**instance, slug=slug)
        user_serializer =  UserSerializer(
                data={"_id": user_id, "is_admin": True, "notifications": {}}
        )

        user_serializer.is_valid(raise_exception=True)
        
        channel.users = {
            user_id: user_serializer.data
        }
        
        data = {"channel": channel}
        return data


class ChannelGetSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField(help_text="Channel ID")
    name = serializers.CharField(
        max_length=100, required=False, help_text="Channel name"
    )
    description = serializers.CharField(required=False, help_text="Channel description")
    private = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this channel has been set to private.",
    )
    owner = serializers.CharField(
        required=False, help_text="Owner (member_id) of the channel"
    )
    archived = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this channel has been archived.",
    )
    topic = serializers.CharField(
        max_length=100, required=False, help_text="Channel topic"
    )
    users = serializers.DictField(
        child=UserSerializer(many=True),
        required=False,
        help_text="List of users in the channel",
    )
    # default = serializers.BooleanField(
    #     default=False,
    #     help_text="Default: false. True if this channel is a default channel for an organization.",
    # )


class ChannelUpdateSerializer(serializers.Serializer):

    _id = serializers.ReadOnlyField(help_text="Channel ID")
    name = serializers.CharField(
        max_length=100, required=False, help_text="Channel name"
    )
    description = serializers.CharField(required=False, help_text="Channel description")
    private = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this channel has been set to private.",
    )
    archived = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this channel has been archived.",
    )
    default = serializers.BooleanField(
        required=False,
        help_text="Default: false. True if this channel his default.",
    )
    topic = serializers.CharField(
        max_length=100, required=False, help_text="Channel topic"
    )

    def validate_name(self, name):
        """
        Validate name doesnt already exist here
        """
        data = {"name": name.lower()}
        response = Request.get(self.context.get("org_id"), "channel", data)
        if isinstance(response, list):
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

    _id = serializers.ReadOnlyField(help_text="Channel ID")
    name = serializers.CharField(
        max_length=100, required=False, help_text="Channel name"
    )
    description = serializers.CharField(required=False, help_text="Channel description")


class SocketSerializer(serializers.Serializer):
    socket_name = serializers.CharField(
        max_length=200, required=True, help_text="Socket name"
    )
    channel_id = serializers.CharField(
        max_length=30, required=True, help_text="Channel ID"
    )


class FilesDictSerializer(serializers.DictField):
    timestamp = serializers.TimeField()
    file = serializers.ListField(
        child=serializers.URLField(help_text="URL to media/file"),
        read_only=True,
    )
    message_id = serializers.UUIDField()
    user_id = serializers.UUIDField()


class MessageFilesSerializer(serializers.ListField):
    child = FilesDictSerializer()
    read_only = True
    help_text = "List of URLs for all files/media in Message objects"


class ThreadFilesSerializer(serializers.ListField):
    child = FilesDictSerializer()
    read_only = True
    help_text = "List of URLs for all files/media in thread objects"


class ChannelAllFilesSerializer(serializers.Serializer):
    channelmessage = MessageFilesSerializer()
    thread = ThreadFilesSerializer()


class RoomSerializer(serializers.Serializer):

    room_name = serializers.CharField(
        max_length=100, required=True, help_text="Channel name"
    )

    room_member_ids = serializers.ListField(
        child=serializers.CharField(max_length=30), allow_empty=False
    )
    org_id = serializers.CharField(max_length=200, required=True)
    private = serializers.BooleanField(default=False)
    default = serializers.BooleanField(
        default=False,
        help_text="Default: false. True if this channel is a default channel for an organization.",
    )

    def convert_to_channel_serializer(self) -> serializers.Serializer:
        self.is_valid(raise_exception=True)
        data = {
            "name": self.data.get("room_name"),
            "owner": self.data.get("room_member_ids", ["1"])[0],
            "private": self.data.get("private", False),
            "default": self.data.get("default", False),
        }
        return ChannelSerializer(data=data, context={"org_id": self.data.get("org_id")})
