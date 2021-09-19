import json
from apps.centri.helperfuncs import build_room_name
from apps.channelmessages.serializers import ChannelMessageUpdateSerializer
from apps.utils.serializers import ErrorSerializer
from django.core.signals import request_finished
from django.http.response import JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from django.http.response import JsonResponse

# from rest_framework.filters

from channel_plugin.utils.customrequest import Request

from channel_plugin.utils.wrappers import FilterWrapper

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelGetSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    UserSerializer,
    UserChannelGetSerializer,
)

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
        result = Request.get(org_id, "channel", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if result:
                for i, channel in enumerate(result):
                    result[i].update({"members": len(channel["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response(
                "Response", ChannelMessageUpdateSerializer(many=True)
            ),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(methods=["GET"], detail=False)
    def channel_media_all(self, request, org_id, channel_id):

        """
        This gets all media for a prticular channel for a
        particular organization identified by ID
        splitted into channelmessage and thread objects.
        """
        data = {"channel_id": channel_id, "has_files": "yes"}
        data.update(dict(request.query_params))
        result = {}
        result_message = Request.get(org_id, "channelmessage", data) or []
        result_thread = Request.get(org_id, "thread", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result_message, list) or isinstance(result_thread, list):
            result.update(
                {
                    "channelmessage": result_message,
                    "thread": result_thread,
                }
            )
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
        result = Request.get(org_id, "channel", data) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            if result:
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
        result = Request.put(org_id, "channel", payload, object_id=channel_id) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            if result:
                result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def channel_delete(self, request, org_id, channel_id):
        result = Request.delete(org_id, "channel", object_id=channel_id)

        # delete relationships
        if result.get("status") == 200:
            if result.get("data", {}).get("deleted_count") > 0:
                Request.delete(
                    org_id, "channelmessage", data_filter={"channel_id": channel_id}
                )
                Request.delete(org_id, "thread", data_filter={"channel_id": channel_id})
                Request.delete(org_id, "role", data_filter={"channel_id": channel_id})

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", UserChannelGetSerializer(many=True)),
            204: openapi.Response("User Does Not Belong To Any Channels"),
            404: openapi.Response("Error Response", ErrorSerializer),
        }
    )
    @action(methods=["GET"], detail=False)
    def user_channel_retrieve(self, request, org_id, user_id):

        """

        This gets a list of all channels that a user belongs to

        """
        data = {}
        data.update(dict(request.query_params))
        response = Request.get(org_id, "channel", data) or []
        response = list(enumerate(response))
        result = []
        status_code = status.HTTP_204_NO_CONTENT
        if response:
            status_code = status.HTTP_200_OK
            for i in response:
                if user_id in i[1]["users"].keys():
                    channel = {}
                    channel["_id"] = i[1]["_id"]
                    channel["name"] = i[1]["name"]
                    channel["description"] = i[1]["description"]
                    result.append(channel)
                else:
                    pass
        else:
            status_code = status.HTTP_404_NOT_FOUND

        return Response(result, status=status_code)


channel_list_create_view = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

channel_retrieve_update_delete_view = ChannelViewset.as_view(
    {"get": "channel_retrieve", "put": "channel_update", "delete": "channel_delete"}
)

channel_media_all_view = ChannelViewset.as_view(
    {
        "get": "channel_media_all",
    }
)

user_channel_list = ChannelViewset.as_view(
    {
        "get": "user_channel_retrieve",
    }
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

            return result if isinstance(result, dict) else None

    def prepare_params(self):
        param_checkers = {
            "__starts": "$",
            "__ends": "#",
            "__contains": "*",
            "__gt": ">",
            "__lt": "<",
        }

        params = dict(self.request.query_params)

        """
            Note if your planing to use the filterwrapper class
            you have to convert the values of your query_parameter
            to a python value byt using json.loads
        """

        for key in self.request.query_params.keys():
            try:
                params[key] = json.loads(params.get(key)[0])
            except:
                params[key] = params.get(key)[0]

            for chk in param_checkers:
                if key.endswith(chk):
                    p = param_checkers[chk] + key.replace(chk, "")

                    try:
                        params[p] = json.loads(params.get(key))
                    except:
                        params[p] = params.get(key)
                    params.pop(key)
        return params

    def filter_objects(self, data: list, serializer: serializers.Serializer):
        # method  applies filteration to user list
        output = []

        params = self.prepare_params()
        params = FilterWrapper.filter_params(
            allowed=list(serializer().get_fields().keys()), params=params
        )

        output = FilterWrapper.filter_objects(data, params)
        return output

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
        Method adds a user to a channel identified by id
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            # "check if the user is aleady a member of the channel"
            output = None

            if isinstance(request.data, list):
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
                if isinstance(result, dict):
                    data = output if not result.get("error") else result
                    status_code = (
                        status.HTTP_201_CREATED
                        if not result.get("error")
                        else status.HTTP_400_BAD_REQUEST
                    )
                    if not result.get("error"):
                        if isinstance(output, dict):
                            # when only one user is added
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_name=channel["_id"],
                                user_id=output["_id"],
                            )
                        else:
                            # when output is a list multiple users where added
                            request_finished.send(
                                sender=self.__class__,
                                dispatch_uid="JoinedChannelSignal",
                                org_id=org_id,
                                channel_name=channel["_id"],
                                added_by="logged-in-user_id",
                                added=output,
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
                    if isinstance(result, dict):
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

                if isinstance(result, dict):
                    data = {"msg": "success"} if not result.get("error") else result

                    if not result.get("error"):
                        # when only one user is removed
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="LeftChannelSignal",
                            org_id=org_id,
                            channel_name=channel["_id"],
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

    channel = ChannelMemberViewset.retrieve_channel(request, org_id, channel_id)

    if channel:
        name = build_room_name(org_id, channel["_id"])
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
