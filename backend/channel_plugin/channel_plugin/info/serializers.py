from rest_framework import serializers


class InstallSerializer(serializers.Serializer):

    org_id = serializers.CharField(max_length=30)
    user_id = serializers.CharField(max_length=30)
    title = serializers.CharField(max_length=50)
