import json

from apps.centri.helperfuncs import build_room_name
from apps.utils.serializers import ErrorSerializer
from django.core.signals import request_finished
from django.http.response import JsonResponse
from django.utils.timezone import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status, throttling
from rest_framework.decorators import action, throttle_classes
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet

from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import Request
from channel_plugin.utils.wrappers import FilterWrapper, OrderMixin

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelAllMediaSerializer,
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


class ChannelViewset(ThrottledViewSet, OrderMixin):

    OrderingFields = {"members": int, "created_on": datetime.fromisoformat}

    @swagger_auto_schema(
        operation_id="create-channel",
        request_body=ChannelSerializer,
        responses={
            201: openapi.Response("Response", ChannelUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @throttle_classes([throttling.AnonRateThrottle])
    @action(
        methods=["POST"],
        detail=False,
    )
    def channels(self, request, org_id):

        """
        This creates a channel for a
        particular organization identified by ID and creates corresponding Centrifugo room

        ```bash
        curl -X POST "{baseUrl}/v1/{org_id}/channels/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{  \"name\": \"channel name\",  \"owner\": \"member_id\", \"description\": \"channel description\",  \"private\": false,  \"topic\": \"channel topic\"}"
        ```

        """  # noqa

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
        operation_id="retrieve-channels",
        responses={
            200: openapi.Response("Response", ChannelGetSerializer(many=True)),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(methods=["GET"], detail=False)
    def channel_all(self, request, org_id):
        """Get all channels in the organization

        ```bash
        curl -X GET "{baseUrl}/v1/{org_id}/channels/" -H  "accept: application/json"
        ```
        """
        data = {}
        data.update(self._clean_query_params(request))
        result = Request.get(org_id, "channel", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if result:
                for i, channel in enumerate(result):
                    result[i].update({"members": len(channel["users"].keys())})
                result = self.perform_ordering(request, result)
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelAllMediaSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="list-all-channel-media",
    )
    @action(methods=["GET"], detail=False)
    def channel_media_all(self, request, org_id, channel_id):
        """Retrieve all media in channel

        This endpoint retrieves a list of URLs for files/media that have been sen sent in a channel.
        Response is split into `channelmessage` and `thread` objects

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/media/" -H  "accept: application/json"
        ```
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
        operation_id="retrieve-channel-details",
        responses={
            200: openapi.Response("Response", ChannelGetSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def channel_retrieve(self, request, org_id, channel_id):
        """Get channel details

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
        ```
        """
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            if result.__contains__("_id"):
                result.update({"members": len(result["users"].keys())})
            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        operation_id="update-channel-details",
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
        """Update channel details

        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{  \"name\": \"channel name\",  \"description\": \"channel description\",  \"private\": false,  \"archived\": false,  \"topic\": \"channel topic\"}"
        ```
        """  # noqa
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

    @swagger_auto_schema(
        operation_id="delete-channel",
        responses={
            204: openapi.Response("Channel deleted successfully"),
            404: openapi.Response("Not found"),
        },
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    def channel_delete(self, request, org_id, channel_id):
        """Delete a channel

        This endpoint deletes a channel and its related objects: messages, roles and threads

        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/" -H  "accept: application/json"
        ```
        """
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
        operation_id="retrieve-user-channels",
        responses={
            200: openapi.Response("Response", UserChannelGetSerializer(many=True)),
            204: openapi.Response("User does not belong to any channel"),
            404: openapi.Response("Not found", ErrorSerializer),
        },
    )
    @action(methods=["GET"], detail=False)
    def user_channel_retrieve(self, request, org_id, user_id):
        """Retrieve list of channels a user belongs to

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/users/{{user_id}}/" -H  "accept: application/json"
        ```
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
        responses={
            200: openapi.Response("Response", SocketSerializer()),
            404: openapi.Response("Not found"),
        },
        operation_id="retrieve-channel-socket-name",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def get_channel_socket_name(self, request, org_id, channel_id):
        """
        Retrieve Centrifugo socket channel name based on organisation and channel IDs

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/socket/" -H  "accept: application/json"
        ```
        """
        channel = ChannelMemberViewset.retrieve_channel(request, org_id, channel_id)

        if channel:
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
        if result.__contains__("_id") and isinstance(result, dict):
            return result
        return {}

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
            to a python value by using json.loads
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

        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{\"_id\": \"string\",
            \"role_id\": \"string\",
            \"is_admin\": false,
            \"notifications\": {
                 \"web\": \"nothing\",
                 \"mobile\": \"mentions\",
                 \"same_for_mobile\": true,
                 \"mute\": false
                }
            }"
        ```
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

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
        """Check if input is enabled for users

        This checks if a user input should be disabled or enabled, i.e \
        should users be able to send messages in the channel or not.

        (incomplete doc)

        ```bash
        curl -X POST "{{baseUrl}}/api/v1/{{org_id}}/channels/{{channel_id}}/members/can_input/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"_id\": \"string\",
                \"role_id\": \"string\",
                \"is_admin\": false,
                \"notifications\": { }
            }"
        ```
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):
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
        operation_id="list-channel-members",
        responses={
            200: openapi.Response("Response", UserSerializer(many=True)),
            404: openapi.Response("Not Found"),
        },
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def list_members(self, request, org_id, channel_id):
        """
        This method gets all members for a
        channel identified by ID

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/" -H  "accept: application/json"
        ```
        """

        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):
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
            200: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Not Found"),
        },
        operation_id="retrieve-member-details",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def get_member(self, request, org_id, channel_id, member_id):
        """Get details of a channel member

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
        ```
        """  # noqa
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

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
        responses={
            200: openapi.Response("Response", UserSerializer),
            404: openapi.Response("Not found"),
        },
        operation_id="update-member-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def update_member(self, request, org_id, channel_id, member_id):
        """Update channel member details

        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{\"_id\": \"string\",
            \"role_id\": \"string\",
            \"is_admin\": false,
            \"notifications\": {
                 \"web\": \"nothing\",
                 \"mobile\": \"mentions\",
                 \"same_for_mobile\": true,
                 \"mute\": false
                }
            }"
        ```
        """
        # get the channel from zc-core
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

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

    @swagger_auto_schema(
        responses={
            204: openapi.Response("User removed successfully"),
            404: openapi.Response("Not found"),
        },
        operation_id="delete-member-details",
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    def remove_member(self, request, org_id, channel_id, member_id):
        """Remove member from a channel

        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/" -H  "accept: application/json"
        ```
        """  # noqa
        channel = self.retrieve_channel(request, org_id, channel_id)

        if channel.__contains__("_id"):

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
        """Retrieve user notification preferences for channel

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/" -H  "accept: application/json"
        ```
        """  # noqa
        channel = self.retrieve_channel(request, org_id, channel_id)
        if channel.__contains__("_id"):
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
        """Update user notification preferences for a channel

        ```bash
        curl -X PUT "{{baseUrl}}v1/{{org_id}}/channels/{{channel_id}}/members/{{member_id}}/notifications/"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"web\": \"all\",
                \"mobile\": \"all\",
                \"same_for_mobile\": true,
                \"mute\": true
            }"
        ```
        """

        channel = self.retrieve_channel(request, org_id, channel_id)
        if channel.__contains__("_id"):
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
