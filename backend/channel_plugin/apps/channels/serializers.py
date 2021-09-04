from rest_framework import serializers

class ThreadUserRoleSerializer(serializers.Serializer):
    role_id = serializers.CharField(max_length=200)
    role_type = serializers.CharField(max_length=200)
    permission_id = serializers.CharField(max_length=200)
    permission_description = serializers.CharField(max_length=200)
    permission_type = serializers.CharField(max_length=200)

class ChannelSerializer(serializers.Serializer):
	# id = serializers.PositiveIntegerField()
	name = serializers.CharField(max_length=30)
	desc = serializers.CharField(max_length=100)
	private = serializers.BooleanField()

class SearchMessageQuerySerializer(serializers.Serializer):
	value = serializers.CharField(max_length = 100)

