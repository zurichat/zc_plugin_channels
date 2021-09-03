from rest_framework import serializers

class SearchMessageQuerySerializer(serializers.Serializer):
	value = serializers.CharField(max_length = 100)