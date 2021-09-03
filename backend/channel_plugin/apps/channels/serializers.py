from rest_framework import serializers


class ChannelSerializer(serializers.Serializer):
	# id = serializers.PositiveIntegerField()
	name = serializers.CharField(max_length=30)
	desc = serializers.CharField(max_length=100)
	private = serializers.BooleanField()
