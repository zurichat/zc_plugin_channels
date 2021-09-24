from rest_framework import serializers


class BaseErrorSerializer(serializers.Serializer):

    message = serializers.CharField()
    status = serializers.IntegerField()


class ErrorSerializer(serializers.Serializer):

    error = BaseErrorSerializer()
