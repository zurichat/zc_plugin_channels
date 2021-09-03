from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

# Create your views here.


class Test(APIView):

    """
    Testing endpoint for channel app
    """

    def get(self, request):
        return Response({"msg": "working"}, status=status.HTTP_200_OK)
