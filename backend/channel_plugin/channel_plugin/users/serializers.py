from rest_framework import serializers


class ThreadUserSerializer(serializers.Serializer):
    id = serializers.IntegerField()
