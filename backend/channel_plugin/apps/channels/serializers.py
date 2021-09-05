from rest_framework import serializers

class SearchMessageQuerySerializer(serializers.Serializer):
	value = serializers.CharField(max_length = 100)

class ThreadUserRoleSerializer(serializers.Serializer):
	id = serializers.IntegerField()
	type = serializers.CharField()
	value = serializers.CharField(max_length = 100)
	