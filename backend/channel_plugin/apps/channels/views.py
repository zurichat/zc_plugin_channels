from backend.channel_plugin.apps.channels.serializers import ThreadSerializer
from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view


# Create your views here.


class Test(APIView):

    """
    Testing endpoint for channel app
    """

    def get(self, request):
        return Response({"msg": "working"}, status=status.HTTP_200_OK)

class DeleteThread(APIView):
    

    @api_view(['DELETE'])
    def Delete_Thread(request, pk):
            data={"msg": "Thread deleted successfully"}
            thread=ThreadSerializer.objects.filter(id=pk)
            if thread:
                thread.delete()
                return Response(data, status=status.HTTP_200_OK)
