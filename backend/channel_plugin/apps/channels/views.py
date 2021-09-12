from apps.utils.serializers import ErrorSerializer
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema

from django.core.signals import request_finished

from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from django.http.response import JsonResponse


from channel_plugin.utils.customrequest import Request

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelGetSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    UserSerializer,
)

from apps.centri.helperfuncs import build_room_name

# Create your views here.


class ChannelViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelSerializer,
        responses={
            201: openapi.Response("Response", ChannelUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def channels(self, request, org_id):

        """
        This creates a channel for a
        particular organization identified by ID
        """

        serializer = ChannelSerializer(data=request.data, context={"org_id": org_id})
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_201_CREATED
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelGetSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        }
    )
    @action(methods=["GET"], detail=False)
    def channel_all(self, request, org_id):

        """
        This gets all channels for a
        particular organization identified by ID
        """
        data = {}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channel", data)
        status_code = status.HTTP_404_NOT_FOUND
        if type(result) == list:
            for i, channel in enumerate(result):
                result[i].update({"members": len(channel["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelGetSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="message read one channel",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def channel_retrieve(self, request, org_id, channel_id):
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data)[0]
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        request_body=ChannelUpdateSerializer,
        responses={
            200: openapi.Response("Response", ChannelGetSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def channel_update(self, request, org_id, channel_id):
        serializer = ChannelUpdateSerializer(
            data=request.data, context={"org_id": org_id, "_id": channel_id}
        )
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("channel")
        result = Request.put(org_id, "channel", payload, object_id=channel_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def channel_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


channel_list_create_view = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

channel_retrieve_update_delete_view = ChannelViewset.as_view(
    {"get": "channel_retrieve", "put": "channel_update", "delete": "channel_delete"}
)


class ChannelMemberViewset(ViewSet):
    def validate_name(self, name):
        return name
    
    @staticmethod
    def retrieve_channel(request, org_id, channel_id):
        """
        This method retrieves a channel's data
        from zc-core
        """
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data)

        if result:
            return result if (type(result) == dict) else None

    def filter_params(self, serializer, params):
        """
        This method removes all query parameters
        not in user serializer
        """
        fields = list(serializer().get_fields().keys())

        keys = list(filter(lambda param: bool(param in fields), params.keys()))

        for key in params:
            if key not in keys:
                del params[key]
        return params

    def filter_objects(self, data: list, serializer: serializers.Serializer):
        # method  applies filteration to user list
        output = []

        params = self.filter_params(serializer, self.request.query_params)

        for obj in data:
            flag = 0

            for param in params.items():
                if param in obj:
                    flag += 1
                else:
                    break

            if flag == len(list(params.items())):
                output.append(obj)

        return list(output) if params else list(data)

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            400: openapi.Response("Error Response"),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="add-channel-member",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def add_member(self, request, org_id, channel_id):
        """
        Method adds a user to a channel identified
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            # "check if the user is aleady a member of the channel"
            output = None

            if type(request.data) == list:
                # user_id = request.data.get("_id")
                # user_data = channel["users"].get(user_id)
                serializer = UserSerializer(data=request.data, many=True)
                serializer.is_valid(raise_exception=True)
                user_list = serializer.initial_data

                # add all users not in group
                for user in user_list:
                    if channel["users"].get(user["_id"]):
                        user_list.pop(user)
                    else:
                        channel["users"].update({f"{user['_id']}": user})

                output = user_list

            else:
                user_id = request.data.get("_id")
                user_data = channel["users"].get(user_id)

                if not user_data:
                    # add the add the user to the channel

                    serializer = UserSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    user_data = serializer.data

                    # add user to the channel
                    channel["users"].update({f"{user_data['_id']}": serializer.data})

                    output = user_data
                else:
                    return Response(user_data, status=status.HTTP_200_OK)

            # remove channel ID to avoid changing it
            channel.pop("_id", None)

            # only update user dict
            payload = {"users": channel["users"]}

            result = Request.put(
                org_id, "channel", payload=payload, object_id=channel_id
            )

            if result:
                if type(result) == dict:
                    data = output if not result.get("error") else result
                    
                    status_code = (
                        status.HTTP_201_CREATED
                        if not result.get("error")
                        else status.HTTP_400_BAD_REQUEST
                    )


                    if not result.get("error"):                        
                        if type(output) == dict:
                            # when only one user is added
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_name=channel["name"],
                                user_id=output["_id"],
                            )
                        else:
                            # when output is a list multiple users where added
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_name=channel["name"],
                                added_by="active-duser_id-gotten",
                                added=output 
                            )
                    return Response(data, status=status_code)
                else:
                    return Response(result, status=result.status_code)
        return Response(
            {"error": "channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", UserSerializer(many=True)),
            404: openapi.Response("Not Found"),
        },
        operation_id="list-channel-members",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def list_members(self, request, org_id, channel_id):
        """
        This method gets all members for a
        channel identified
        """

        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:
            # apply filters to user list
            users = self.filter_objects(
                list(channel["users"].values()),
                UserSerializer,
            )

            serializer = UserSerializer(data=users, many=True)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data, status=status.HTTP_200_OK)

        return Response(
            {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelUpdateSerializer),
            404: openapi.Response("Not Found"),
        },
        operation_id="retrieve-member-detail",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def get_member(self, request, org_id, channel_id, member_id):
        """
        Method adds a user to a channel
        """
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            # check if the user is aleady a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:
                # add the user to the channel
                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)
                return Response(serializer.data, status=status.HTTP_200_OK)

            return Response(
                {"error": "member not found"}, status=status.HTTP_404_NOT_FOUND
            )

        return Response(
            {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={200: openapi.Response("Response", UserSerializer)},
        operation_id="upadte-member-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def update_member(self, request, org_id, channel_id, member_id):
        """
        Method updates a user's channel memberhip details
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            # check if the user is aleady a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:

                # update the users data
                for key in user_data.keys():
                    if key != "_id":
                        user_data[key] = request.data.get(key, user_data[key])

                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)

                # add user to the channel
                channel["users"].update({f"{member_id}": serializer.data})

                # remove channel id to avoid changing it
                channel.pop("_id", None)

                payload = {"users": channel["users"]}

                result = Request.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if result:
                    if type(result) == dict:
                        data = user_data if not result.get("error") else result
                        status_code = (
                            status.HTTP_201_CREATED
                            if not result.get("error")
                            else status.HTTP_400_BAD_REQUEST
                        )

                        return Response(data, status=status_code)
                    else:
                        return Response(result, status=result.status_code)

            return Response(
                {"error": "member not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def remove_member(self, request, org_id, channel_id, member_id):
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            # check if the user is aleady a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:
                # Remove  the user from the channel
                del channel["users"][member_id]

                # send signal to centri app to left message centrifugo
                channel.pop("_id", None)

                payload = {"users": channel["users"]}

                result = Request.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if type(result) == dict:
                    data = {"msg": "success"} if not result.get("error") else result

                    if not result.get("error"):                        
                        # when only one user is removed
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="LeftChannelSignal",
                            org_id=org_id,
                            channel_name=channel["name"],
                            user_id=user_data["_id"],
                        )

                    status_code = (
                        status.HTTP_204_NO_CONTENT
                        if not result.get("error")
                        else status.HTTP_400_BAD_REQUEST
                    )

                    return Response(data, status=status_code)

            return Response(
                {"error": "member not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
        )


channel_members_list_create_views = ChannelMemberViewset.as_view(
    {
        "get": "list_members",
        "post": "add_member",
    }
)

channel_members_update_retrieve_views = ChannelMemberViewset.as_view(
    {"get": "get_member", "put": "update_member", "delete": "remove_member"}
)


def get_channel_socket_name(request, org_id, channel_id):
    
    channel = ChannelMemberViewset.retrieve_channel(
        request, 
        org_id, 
        channel_id
    )

    if channel:
        name = build_room_name(org_id, channel['name'])
        return JsonResponse({"socket_name": name}, status=status.HTTP_200_OK)
    else:
        return JsonResponse(
            {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

# class SearchMessagesAPIView(APIView):
#     def post(self, request):
#         serializer = SearchMessageQuerySerializer(data=request.data)
#         if serializer.is_valid():
#             value = serializer.validated_data["value"]
#             if value != "-":
#                 data = find_item_in_data(messages_data, value, "value")
#                 response = {"status": True, "message": "Query results", "data": data}
#                 return Response(response, status=status.HTTP_200_OK)
#             else:
#                 data = messages_data
#                 response = {"status": True, "message": "Query results", "data": data}
#                 return Response(response, status=status.HTTP_200_OK)
#         return Response(serializer.errors)
#     def get(self, request):
#         return Response(
#             {
#                 "status": True,
#                 "message": "Endpoint to search messages, passing '-' will return all messages_data.",
#             }
#         )
