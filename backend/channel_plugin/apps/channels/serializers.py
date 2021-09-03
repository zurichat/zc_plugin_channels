from rest_framework import serializers

class ThreadUserRoleSerializer(serializers.Serializer):
    role_id = serializers.CharField(max_length=200)
    role_type = serializers.CharField(max_length=200)
    permission_id = serializers.CharField(max_length=200)
    permission_description = serializers.CharField(max_length=200)
    permission_type = serializers.CharField(max_length=200)