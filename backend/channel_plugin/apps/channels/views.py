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

from channel_plugin.utils.customrequest import Request
from channel_plugin.utils.wrappers import FilterWrapper

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelGetSerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    NotificationsSettingSerializer,
    SocketSerializer,
    UserChannelGetSerializer,
    UserSerializer,
)

# from rest_framework.filters


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
        particular organization identified by ID and creates corresponding Centrifugo room
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
        data = {"channel_id": channel_id, "has_files": True}
        data.update(dict(request.query_params))
        result = {}
        result_message = Request.get(org_id, "channelmessage", data) or []
        result_thread = Request.get(org_id, "thread", data)
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result_message, list) or isinstance(result_thread, list):
            result.update(
                {
                    "channelmessage": result_message
                    if isinstance(result_message, list)
                    else [],
                    "thread": result_thread if isinstance(result_thread, list) else [],
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

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", SocketSerializer())},
        operation_id="get-channel's-socket-name",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def get_channel_socket_name(self, request, org_id, channel_id):
        """
        Returns Centrifugo channel name based on organisation and channel IDs
        """
        channel = ChannelMemberViewset.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id") or isinstance(channel, dict):
            data = {
                "socket_name": build_room_name(org_id, channel_id),
                "channel_id": channel_id,
            }

            serializer = SocketSerializer(data=data)
            serializer.is_valid(raise_exception=True)
            return JsonResponse(serializer.data, status=status.HTTP_200_OK)
        else:
            return JsonResponse(
                {"error": "Channel not found"}, status=status.HTTP_404_NOT_FOUND
            )


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

channel_socket_view = ChannelViewset.as_view({"get": "get_channel_socket_name"})


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
        result = Request.get(org_id, "channel", data) or {}
        if result.__contains__("_id") or isinstance(result, dict):
            if result:
                return result
        return None

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
            except:  # noqa
                params[key] = params.get(key)[0]

            for chk in param_checkers:
                if key.endswith(chk):
                    p = param_checkers[chk] + key.replace(chk, "")

                    try:
                        params[p] = json.loads(params.get(key))
                    except:  # noqa
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
        Method adds a user to a channel identified by id and publish JOIN event to Centrifugo
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:

            output = None

            # if multiple users are been added
            if isinstance(request.data, list):
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
                    serializer = UserSerializer(data=request.data)
                    serializer.is_valid(raise_exception=True)
                    user_data = serializer.data

                    # add user to the channel
                    channel["users"].update({f"{user_data['_id']}": serializer.data})

                    output = user_data
                else:
                    return Response(user_data, status=status.HTTP_200_OK)

            # remove channel ID to avoid changing it
            channel_id = channel.pop("_id", None)

            # only update user dict
            payload = {"users": channel["users"]}

            result = Request.put(
                org_id, "channel", payload=payload, object_id=channel_id
            )

            if isinstance(result, dict):
                if not result.get("error"):
                    if isinstance(output, dict):
                        # when only one user is added
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="JoinedChannelSignal",
                            org_id=org_id,
                            channel_id=channel_id,
                            user=output,
                        )
                    else:
                        # when output is a list multiple users where added
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="JoinedChannelSignal",
                            org_id=org_id,
                            channel_id=channel_id,
                            added_by="logged-in-user_id",
                            added=output,
                        )
                    return Response(output, status=status.HTTP_201_CREATED)
                else:
                    return Response(
                        result.get("error"), status=status.HTTP_400_BAD_REQUEST
                    )
            else:
                return Response(result, status=result.status_code)
        return Response(
            {"error": "channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={
            201: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Collection Not Found"),
        },
        operation_id="channel-member-can-input",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def can_input(self, request, org_id, channel_id):
        """
        Method checks if a user input should be disabled or enabled
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel:
            if channel["allow_members_input"] is True:
                can_input = True
                return Response(can_input, status=status.HTTP_200_OK)
            else:
                user_id = request.data.get("_id")
                user_data = channel["users"].get(user_id)

                if user_data:
                    # Check if user is an admin
                    if user_data.is_admin:
                        can_input = True
                        return Response(can_input, status=status.HTTP_200_OK)
                    else:
                        can_input = False
                        return Response(can_input, status=status.HTTP_200_OK)
                else:
                    return Response(
                        {"error": "channel not found"}, status=status.HTTP_404_NOT_FOUND
                    )
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
        channel identified by ID
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

            # checks if the user is a member of the channel
            user_data = channel["users"].get(member_id)

            if user_data:
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
        Method updates a user's channel membership details
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
                channel_id = channel.pop("_id", None)

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
                            channel_id=channel_id,
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

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", NotificationsSettingSerializer),
            404: openapi.Response("Not Found"),
        },
        operation_id="retrieve-user-notifications",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def notification_retrieve(self, request, org_id, channel_id, member_id):
        """Retrieve a user's notification preferences for a particular channel.

        By default, users do not have a notifications field in the database,
        so an empty {} will be returned.

        A field is only appended to their records when changes have been made.
        """
        channel = self.retrieve_channel(request, org_id, channel_id)
        if channel:
            user_data = channel["users"].get(member_id)
            if user_data:
                serializer = UserSerializer(data=user_data)
                serializer.is_valid(raise_exception=True)

                # an empty field will be returned for users that have not
                # changed their settings.
                # DEFAULT_SETTINGS = {
                #     "web": "nothing",
                #     "mobile": "mentions",
                #     "same_for_mobile": False,
                #     "mute": False
                # }

                settings = serializer.data.get("notifications", {})
                return Response(settings, status=status.HTTP_200_OK)

            return Response(
                {"error": "member not found"}, status=status.HTTP_404_NOT_FOUND
            )
        return Response(
            {"error": "channel not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        request_body=NotificationsSettingSerializer,
        responses={
            200: openapi.Response(
                "Response",
                NotificationsSettingSerializer,
            )
        },
        operation_id="update-user-notifications",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def notification_update(self, request, org_id, channel_id, member_id):
        """Update a user's notification preferences for a particular channel.

        Example request body:
        {
            "web": "nothing",
            "mobile": "mentions",
            "same_for_mobile": False,
            "mute": False
        }
        """

        channel = self.retrieve_channel(request, org_id, channel_id)
        if channel:
            user_data = channel["users"].get(member_id)

            if user_data:
                serializer = NotificationsSettingSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                # by default, users do not have a settings field
                # whether or not this user has a settings field,
                # make an update with the new settings
                notification_settings = dict(serializer.data)
                user_data.setdefault("notifications", {}).update(notification_settings)

                # push the updated user details to the channel object
                channel["users"].update({f"{member_id}": user_data})

                # remove channel id to avoid changing it
                channel.pop("_id", None)

                payload = {"users": channel["users"]}
                result = Request.put(
                    org_id, "channel", payload=payload, object_id=channel_id
                )

                if result:
                    if isinstance(result, dict):
                        data = (
                            notification_settings if not result.get("error") else result
                        )
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
            {"error": "channel not found"}, status=status.HTTP_404_NOT_FOUND
        )


channel_members_can_input_view = ChannelMemberViewset.as_view(
    {
        "post": "can_input",
    }
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

notification_views = ChannelMemberViewset.as_view(
    {"get": "notification_retrieve", "put": "notification_update"}
)
