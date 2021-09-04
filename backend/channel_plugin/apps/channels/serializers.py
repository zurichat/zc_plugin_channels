from rest_framework import serializers


class ChannelSerializer(serializers.Serializer):
	# id = serializers.PositiveIntegerField()
	name = serializers.CharField(max_length=30)
	desc = serializers.CharField(max_length=100)
	private = serializers.BooleanField()

class SearchMessageQuerySerializer(serializers.Serializer):
	value = serializers.CharField(max_length = 100)

class ChannelMessageSerializer(serializers.Serializer):
    """ """

    id = serializers.IntegerField()
    creator_id = serializers.IntegerField()
    timestamp = serializers.DateTimeField()
    message = serializers.CharField()
    edited = serializers.BooleanField()
