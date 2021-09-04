from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from users.serializers import ThreadUserSerializer


class ThreadUserRolesViewset(ViewSet):
    @action(
        methods=["POST"],
        detail=False,
    )
    def delete(self, request):
        serializer = ThreadUserSerializer(data=request.data)
        if serializer.is_valid():
            return Response({"status": "User thread role deleted"})
