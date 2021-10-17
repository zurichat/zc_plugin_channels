from rest_framework import serializers


class InstallSerializer(serializers.Serializer):

    organization_id = serializers.CharField(max_length=30)
    member_id = serializers.CharField(max_length=30)
    title = serializers.CharField(max_length=50)
