import random

from django.utils import timezone
from rest_framework import serializers


class ChannelSerializer(serializers.Serializer):
    # id = serializers.PositiveIntegerField()
    name = serializers.CharField(max_length=30)
    desc = serializers.CharField(max_length=100)
    private = serializers.BooleanField()


class SearchMessageQuerySerializer(serializers.Serializer):
    value = serializers.CharField(max_length=100)


class ThreadSerializer(serializers.Serializer):

    # Fields
    id = serializers.CharField(max_length=20, read_only=True)

    organization_id = serializers.CharField(max_length=200, read_only=True)

    channel_id = serializers.CharField(max_length=200, read_only=True)

    title = serializers.CharField(required=True, max_length=50)

    description = serializers.CharField(max_length=1000)
    date_created = serializers.TimeField(read_only=True, required=False)

    def create(self, validated_data):
        alpha_num = "abcdefghijklmnopqrstuvwxyz" + "0123456789"
        kwargs = {}

        validated_data["id"] = "".join(random.choices(alpha_num, k=20))
        validated_data["date_created"] = timezone.now().isoformat()

        kwargs["bulk_write"] = False
        kwargs["obeject_id"] = None
        kwargs["filter"] = {}

        # save_to = validated_data.pop("save_to", "")

        data = {
            **kwargs,
            "payload": {**validated_data},
        }

        # send data to zc-core at this point
        """uncomment this block once plugin is registered to zc-core"""
        # header = kwargs.get("Headers")
        # response = post(url=save_to, data=data, headers=self.Headers)
        # allowed = [200, 201]
        # assert response.status_code in allowed

        res = data["payload"]
        return res
