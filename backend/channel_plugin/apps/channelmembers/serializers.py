from rest_framework import serializers


class AddRemoveMembersSerializer(serializers.Serializer):

    room_id = serializers.CharField(max_length=30)
    member_ids = serializers.ListField(
        child=serializers.CharField(max_length=30), allow_empty=False
    )


class NotificationsSettingSerializer(serializers.Serializer):

    web = serializers.ChoiceField(
        choices=("all", "mentions", "nothing"), default="nothing"
    )
    mobile = serializers.ChoiceField(
        choices=("all", "mentions", "nothing"), default="nothing"
    )
    same_for_mobile = serializers.BooleanField(
        default=True,
        help_text="Default: true. False if user has set web client\
             notifications preferences to be different for mobile.",
    )
    mute = serializers.BooleanField(
        default=False, help_text="Default: false. true if user has muted this channel."
    )


class UserSerializer(serializers.Serializer):

    _id = serializers.CharField(max_length=30, required=True, help_text="User ID")
    role_id = serializers.CharField(
        max_length=30,
        required=False,
        help_text="Role ID",
        default=None,
        allow_null=True,
    )

    starred = serializers.BooleanField(
        default=False,
        help_text="Default: false. True if the channel is starred by user.",
    )
    is_admin = serializers.BooleanField(
        default=False, help_text="Default: false. True if the member is an admin"
    )
    notifications = NotificationsSettingSerializer(required=False)


class JoinSerializer(serializers.Serializer):

    user_id = serializers.CharField(max_length=30, required=True)
