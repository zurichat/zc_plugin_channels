import requests
from apps.threads.serializers import ReactionSerializer
from apps.utils.serializers import ErrorSerializer
from django.conf import settings
from django.core.signals import request_finished
from django.shortcuts import render
from django.utils import timezone
from django.utils.timezone import datetime
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import status, throttling
from rest_framework.decorators import action, api_view, throttle_classes
from rest_framework.response import Response
from rest_framework.throttling import AnonRateThrottle

from channel_plugin.utils.customexceptions import ThrottledViewSet
from channel_plugin.utils.customrequest import (
    Request,
    find_match_in_db,
    get_messages_from_page,
    save_last_message_user,
    search_channels,
    search_db,
)
from channel_plugin.utils.pagination_handler import SearchPagination
from channel_plugin.utils.wrappers import OrderMixin

from .permissions import IsMember, IsOwner
from .serializers import (
    ChannelMessageReactionSerializer,
    ChannelMessageSearchResultSerializer,
    ChannelMessageSearchSerializer,
    ChannelMessageSerializer,
    ChannelMessageUpdateSerializer,
)


class ChannelMessageViewset(ThrottledViewSet, OrderMixin):

    OrderingFields = {
        "timestamp": datetime.fromisoformat,
        "replies": int,
    }

    authentication_classes = []

    def get_throttled_message(self, request):
        return "request limit exceeded"

    def get_permissions(self):

        """
        Instantiates and returns the list of permissions that this view requires.
        """

        permissions = super().get_permissions()
        if self.action in [
            "message",
            "message_delete",
            "message_update",
            "update_message_reaction",
        ]:
            permissions.append(IsMember())
            if self.action in ["message_delete", "message_update"]:
                permissions.append(IsOwner())
        return permissions

    @swagger_auto_schema(
        operation_id="create-channel-message",
        request_body=ChannelMessageSerializer,
        responses={
            201: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @throttle_classes([throttling.AnonRateThrottle])
    @action(
        methods=["POST"],
        detail=False,
    )
    def message(self, request, org_id, channel_id):
        """
        Create a channel message and automatically publishes to Centrifugo


        ```bash
        curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
        ```

        """
        serializer = ChannelMessageSerializer(
            data=request.data, context={"channel_id": channel_id, "org_id": org_id}
        )
        serializer.is_valid(raise_exception=True)
        channelmessage = serializer.data.get("channelmessage")
        result = channelmessage.create(org_id)
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id"):
            # call signal here
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="CreateMessageSignal",
                org_id=org_id,
                channel_id=channel_id,
                data=result.copy(),
            )
            status_code = status.HTTP_201_CREATED
        return Response(result, status=status_code)

    @swagger_auto_schema(
        operation_id="retrieve-channel-messages",
        responses={
            200: openapi.Response(
                "Response", ChannelMessageUpdateSerializer(many=True)
            ),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        manual_parameters=[
            openapi.Parameter(
                "order_by",
                openapi.IN_QUERY,
                description="property to use for payload ordering",
                required=False,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "ascending",
                openapi.IN_QUERY,
                description="direction to order payload ",
                required=False,
                type=openapi.TYPE_BOOLEAN,
            ),
        ],
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_all(self, request, org_id, channel_id):
        """Get all the messages sent in a channel.

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
        ```
        """
        data = {"channel_id": channel_id}
        params = self._clean_query_params(request)
        data.update(params)
        result = Request.get(org_id, "channelmessage", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            if len(result) > 0:
                result = self.perform_ordering(request, result)
            status_code = status.HTTP_200_OK
            return Response(result, status=status_code)
        return Response(list(), status=status_code)

    @action(
        methods=["GET"],
        detail=False,
    )
    def org_message_analytics(self, request, org_id):
        """Get all the messages count sent in an organization.

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels-messages-analytics/" -H  "accept: application/json"
        ```
        """
        result = Request.get(org_id, "channelmessage") or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            return Response(len(result), status=status.HTTP_200_OK)
        return Response(0, status=status_code)

    # def _stream_message_all(self, request, org_id, channel_id):
    #     """
    #     This method reads the response to a
    #     zc-core request in streams
    #     """
    #     # TODO: Remove this method when zc-core implements pagination
    #     data = {"channel_id": channel_id}
    #     params = self._clean_query_params(request)
    #     data.update(params)

    #     read = settings.READ_URL

    #     collection_name = "channelmessage"
    #     max_chunk_size = 500000

    #     url = f"{read}/{settings.PLUGIN_ID}/{collection_name}/{org_id}"
    #     url += "?" + urlencode(data)

    #     r = requests.get(url, stream=True, timeout=100)

    #     if int(r.headers.get("Content-Length", 10000)) > max_chunk_size:
    #         raise ValueError("response too large")

    #     size = 0

    #     for chunk in r.iter_content(None, True):

    #         size += len(chunk)
    #         if size > max_chunk_size:
    #             raise ValueError("response too large")
    #         yield chunk

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="retrieve-message-details",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def message_retrieve(self, request, org_id, msg_id):
        """Retrieve message details

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/" -H  "accept: application/json"
        ```
        """
        data = {"_id": msg_id}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channelmessage", data) or {}
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            status_code = status.HTTP_200_OK
        return Response(dict(), status=status_code)

    @swagger_auto_schema(
        request_body=ChannelMessageUpdateSerializer,
        responses={
            200: openapi.Response("Response", ChannelMessageUpdateSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
        operation_id="update-message-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def message_update(self, request, org_id, msg_id):

        """
        Updates message based on ID

        ```bash
        curl -X PUT "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}"
        -H  "accept: application/json"
        -H  "Content-Type: application/json"
        -d "{
                \"pinned\": true,
                \"content\": \"string\"
            }"
        ```
        """
        serializer = ChannelMessageUpdateSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        payload = serializer.data.get("message")
        payload.update({"edited": True})
        result = Request.put(org_id, "channelmessage", payload, object_id=msg_id) or {}
        status_code = status.HTTP_404_NOT_FOUND

        if result.__contains__("_id") or isinstance(result, dict):
            # put signal here also
            request_finished.send(
                sender=self.__class__,
                dispatch_uid="EditMessageSignal",
                org_id=org_id,
                channel_id=result.get("channel_id"),
                data=result.copy(),
            )

            status_code = status.HTTP_200_OK
        return Response(result, status=status_code)

    @swagger_auto_schema(
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
        operation_id="delete-message",
        responses={
            204: openapi.Response("Message deleted successfully"),
            404: openapi.Response("Not found"),
        },
    )
    @action(
        methods=["DELETE"],
        detail=False,
    )
    def message_delete(self, request, org_id, msg_id):
        """
        Deletes a message based on ID, and organisation

        ```bash
        curl -X DELETE "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/?user_id={{user_id}}&channel_id={{channel_id}}" -H  "accept: application/json""
        ```

        """  # noqa

        result = Request.delete(org_id, "channelmessage", object_id=msg_id)

        if result.get("status_code") == 200:
            if result.get("data", {}).get("deleted_count") > 0:
                Request.delete(
                    org_id, "thread", data_filter={"channelmessage_id": msg_id}
                )

        channel_id = request.query_params.get("channel_id")
        request_finished.send(
            sender=self.__class__,
            dispatch_uid="DeleteMessageSignal",
            org_id=org_id,
            channel_id=channel_id,
            data={
                "_id": msg_id,
                "channel_id": channel_id,
                "user_id": request.query_params.get("user_id"),
            },
        )

        return Response(status=status.HTTP_204_NO_CONTENT)

    @swagger_auto_schema(
        responses={
            200: openapi.Response(
                "Successful", ChannelMessageReactionSerializer(many=True)
            )
        },
        operation_id="retrieve-message-reactions",
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "order_by",
                openapi.IN_QUERY,
                description="property to use for payload ordering",
                required=False,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "ascending",
                openapi.IN_QUERY,
                description="direction to order payload ",
                required=False,
                type=openapi.TYPE_BOOLEAN,
            ),
        ],
    )
    @action(methods=["GET"], detail=False)
    def retrieve_message_reactions(
        self,
        request,
        org_id,
        msg_id,
    ):
        """Retrieve message reactions

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/messages/{{msg_id}}/reactions/" -H  "accept: application/json"
        ```
        """

        data = {"_id": msg_id}

        self.OrderingFields = {
            "count": datetime.fromisoformat,
        }
        params = self._clean_query_params(request)
        data.update(params)
        result = Request.get(org_id, "channelmessage", data) or {}
        reactions = self.perform_ordering(request, result.get("emojis", []))
        status_code = status.HTTP_404_NOT_FOUND
        if result.__contains__("_id") or isinstance(result, dict):
            status_code = status.HTTP_200_OK
        return Response(reactions, status=status_code)

    @swagger_auto_schema(
        request_body=ReactionSerializer,
        responses={
            201: openapi.Response("Response", ReactionSerializer),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
        operation_id="update_message_reaction",
        manual_parameters=[
            openapi.Parameter(
                "user_id",
                openapi.IN_QUERY,
                description="User ID (owner of message)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
            openapi.Parameter(
                "channel_id",
                openapi.IN_QUERY,
                description="Channel ID (ID of channel message was posted)",
                required=True,
                type=openapi.TYPE_STRING,
            ),
        ],
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    @throttle_classes([AnonRateThrottle])
    def update_message_reaction(self, request, org_id, msg_id):
        message = Request.get(org_id, "channelmessage", {"_id": msg_id}) or []

        status_code = status.HTTP_404_NOT_FOUND

        if isinstance(message, dict):
            if message.__contains__("_id"):
                serializer = ReactionSerializer(data=request.data)
                serializer.is_valid(raise_exception=True)

                data = dict(serializer.data)

                emoji = None

                for i in message.get("emojis", []):
                    if data.get("title", None) == i.get("title", None):
                        emoji = i.copy()
                        message.get("emojis", []).remove(emoji)
                        break

                if emoji:
                    if data.get("user_id") in emoji.get("users", []):
                        emoji.get("users", []).remove(data.get("user_id"))
                        emoji["count"] = emoji.get("count", 1) - 1
                        status_code = status.HTTP_200_OK
                    else:
                        emoji.get("users", []).append(data.get("user_id"))
                        emoji["count"] = emoji.get("count", 0) + 1
                        status_code = status.HTTP_201_CREATED
                else:
                    emoji = {
                        "title": data.get("title"),
                        "count": 1,
                        "users": [data.get("user_id")],
                    }
                    status_code = status.HTTP_201_CREATED

                if emoji["count"] > 0:
                    message.get("emojis", []).append(emoji)

                obj_id = message.pop("_id")

                result = (
                    Request.put(
                        org_id=org_id,
                        collection_name="channelmessage",
                        payload={"emojis": message.get("emojis")},
                        object_id=obj_id,
                    )
                    or {}
                )

                if isinstance(result, dict):
                    if result.__contains__("_id"):
                        # return status code 201 if user reaction was added
                        # return status code 200 if user reaction was removed
                        request_finished.send(
                            sender=self.__class__,
                            dispatch_uid="EditMessageSignal",
                            org_id=org_id,
                            channel_id=result.get("channel_id"),
                            data=result.copy(),
                        )

                        return Response(emoji, status=status_code)
                return Response(result)
        return Response(
            {"error": "message not found"}, status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        operation_id="last_message_instance",
        responses={
            200: openapi.Response(
                "Response", ChannelMessageUpdateSerializer(many=True)
            ),
            404: openapi.Response("Error Response", ErrorSerializer),
        },
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def last_message_instance(self, request, org_id, channel_id, timestamp):
        """Get all the messages sent in a channel.

        ```bash
        curl -X GET "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/messages/" -H  "accept: application/json"
        ```
        """
        data = {"channel_id": channel_id}
        params = self._clean_query_params(request)
        data.update(params)
        result = Request.get(org_id, "channelmessage", data) or []
        status_code = status.HTTP_404_NOT_FOUND
        if isinstance(result, list):
            message_count = len(result)
            if message_count > 0:
                result = result[-1]
                result = result["timestamp"]
            elif message_count == 0:
                result = timestamp

            status_code = status.HTTP_200_OK

        new_result = {"timestamp": result, "message_count": message_count}
        return Response(new_result, status=status_code)


channelmessage_views = ChannelMessageViewset.as_view(
    {
        "get": "message_all",
        "post": "message",
    }
)

channelmessage_views_group = ChannelMessageViewset.as_view(
    {"get": "message_retrieve", "put": "message_update", "delete": "message_delete"}
)

channelmessage_reactions = ChannelMessageViewset.as_view(
    {"get": "retrieve_message_reactions", "post": "update_message_reaction"}
)

channelmessage_analytics = ChannelMessageViewset.as_view(
    {"get": "org_message_analytics"}
)


@swagger_auto_schema(
    method="POST",
    request_body=ChannelMessageSearchSerializer,
    responses={
        200: openapi.Response(
            "Response", ChannelMessageSearchResultSerializer(many=True)
        ),
        400: openapi.Response("Error Response", ErrorSerializer),
    },
    operation_id="search-channel-messages",
)
@api_view(["POST"])
def search_messages(request, org_id, channel_id):
    """Search channel messages based on content, pinned status, file attachments etc.

    ```bash
    curl -X POST "{{baseUrl}}/v1/{{org_id}}/channels/{{channel_id}}/search_messages/"
    -H  "accept: application/json"
    -H  "Content-Type: application/json"
    -d "{
            \"user_id\": \"string\",
            \"content\": \"string\",
            \"has_files\": true,
            \"pinned\": true
        }"
    ```
    """

    serializer = ChannelMessageSearchSerializer(data=request.data)
    serializer.is_valid(raise_exception=True)
    data = serializer.data
    result = search_db(org_id, channel_id, "channelmessage", **data) or []
    if isinstance(result, list):
        response = {"result": result, "query": data}
        return Response(response, status=status.HTTP_200_OK)
    return Response(list(), status=status.HTTP_400_BAD_REQUEST)


search_channelmessage = search_messages


@api_view(["GET", "POST"])
def paginate_messages(request, org_id, channel_id):
    SITE_HOST = request.get_host()
    DEFAULT_PAGE_SIZE = 10

    page = int(request.GET.get("page", 1))
    # last_timestamp = request.GET.get("last_timestamp", None)
    page_size = int(request.GET.get("page_size", DEFAULT_PAGE_SIZE))
    user_id = request.GET.get("user_id", None)

    if not user_id:
        response = {"status": False, "message": "Please pass a user_id as a param"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    # Remove whitespace as a result of '+' conversion to ' '
    # last_timestamp = "+".join(last_timestamp.split(" "))
    # data = {"page": page, "last_timestamp": last_timestamp, "page_size":page_size}

    response = get_messages_from_page(
        org_id, "channelmessage", channel_id, page, page_size, site_host=SITE_HOST
    )

    payload = {
        "user_id": user_id,
        "last_page": page,
        "page_size": page_size,
        "date": timezone.now().isoformat(),
    }

    save_last_message_user(org_id, "userscroll", payload)
    user_id = request.GET.get("user_id", "error")

    if user_id == "error":
        response = {"status": True, "message": "Please pass a user_id as a param"}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)
    # Remove whitespace as a result of '+' conversion to ' '
    # last_timestamp = "+".join(last_timestamp.split(" "))
    # data = {"page": page, "last_timestamp": last_timestamp, "page_size": page_size}
    response = get_messages_from_page(
        org_id, "channelmessage", channel_id, page, page_size
    )

    # if response['data']:
    #     payload = {
    #         "user_id": user_id,
    #         "last_timestamp": response['data'][-1]['timestamp']
    #     }

    #     save_response = save_last_message_user(org_id, "userscroll", payload)

    return Response(response, status=status.HTTP_200_OK)


@api_view(["GET"])
def get_user_cursor(request, org_id, channel_id):
    # DEFAULT_PAGE_SIZE = 10
    user_id = request.GET.get("user_id", None)
    if user_id is None:
        response = {"message": "Pass a user_id as a url param", "status": False}
        return Response(response, status=status.HTTP_400_BAD_REQUEST)

    data = find_match_in_db(org_id, "userscroll", "user_id", user_id, return_data=True)
    response = {"data": data, "status": True, "message": "Last message lookup location"}

    return Response(response, status=status.HTTP_200_OK)


@swagger_auto_schema(
    method="GET",
    responses={
        200: openapi.Response(
            "Response", ChannelMessageSearchResultSerializer(many=True)
        ),
        400: openapi.Response("Error Response", ErrorSerializer),
    },
    operation_id="search-all-channel-messages",
)
@api_view(["GET"])
def search(request, org_id):
    """Search channel messages based on content, pinned status, file attachments etc."""
    query = request.query_params.getlist("query", [])
    result = search_channels(org_id, "channelmessage", query) or []
    response = {"result": result, "query": query}
    return Response(response, status=status.HTTP_200_OK)


@api_view(["GET"])
def test(request):
    return render(request, "index.html")


@swagger_auto_schema(
    method="GET",
    operation_id="workflow-search",
    responses={
        200: openapi.Response("Ok"),
        404: openapi.Response("Not found"),
    },
    manual_parameters=[
        openapi.Parameter(
            "q",
            openapi.IN_QUERY,
            description="Search Key",
            required=True,
            type=openapi.TYPE_STRING,
        ),
        openapi.Parameter(
            "filter",
            openapi.IN_QUERY,
            description="Filter Query",
            required=False,
            type=openapi.TYPE_STRING,
        ),
        openapi.Parameter(
            "page",
            openapi.IN_QUERY,
            description="Page Number",
            required=False,
            type=openapi.TYPE_INTEGER,
        ),
        openapi.Parameter(
            "limit",
            openapi.IN_QUERY,
            description="Number Per Page",
            required=False,
            type=openapi.TYPE_INTEGER,
        ),
    ],
)
@api_view(["GET"])
def workflow_search(request, org_id, member_id):
    """Search channel messages based on content"""

    q = request.GET.get("q", "")
    filter = request.query_params.getlist("filter", {})
    limit = request.GET.get("limit", 20)
    result = []
    msg_url = "https://channels.zuri.chat/api/v1/{org_id}/messages/{msg_id}/"

    try:
        if type(limit) == str:
            limit = int(limit)
    except ValueError:
        limit = 20

    paginator = SearchPagination()
    paginator.page_size = limit

    try:
        # return only channels that match filter param if filter is given
        # or return all channels
        if filter:
            filter = {"name": {"$in": filter}}

        payload = {
            "plugin_ID": settings.PLUGIN_ID,
            "organization_ID": org_id,
            "collection_name": "channel",
            "filter": filter,
            "object_id": "",
        }
        res = requests.post(settings.READ_URL, json=payload)

        if res.status_code == 200:
            channels = res.json().get("data", [])

            for channel in channels:
                # if user owns or is a member of the channel
                if (
                    channel.get("owner") == member_id
                    or member_id in channel.get("users", {}).keys()
                ):
                    # filter query to return only messages that belong to channel
                    msg_filter = {"channel_id": {"$eq": channel.get("_id", "")}}
                    payload = {
                        "plugin_ID": settings.PLUGIN_ID,
                        "organization_ID": org_id,
                        "collection_name": "channelmessage",
                        "filter": msg_filter,
                        "object_id": "",
                    }
                    res = requests.post(settings.READ_URL, json=payload)

                    if res.status_code == 200:
                        for message in res.json().get("data", []):
                            if q.lower() in message.get("content", "").lower():
                                entity_data = {
                                    "_id": message.get("_id", ""),
                                    "room_name": channel.get("name", ""),
                                    "title": channel.get("name", ""),
                                    "content": message.get("content", ""),
                                    "created_by": message.get("user_id", ""),
                                    "images_url": message.get("images_url", []),
                                    "created_at": message.get("timestamp", ""),
                                    "destination_url": msg_url.format(
                                        org_id=org_id, msg_id=message.get("_id", "")
                                    ),
                                }
                                result.append(entity_data)

            result = paginator.paginate_queryset(result, request)

            return paginator.get_paginated_response(result, q, filter, request)
    except Exception as e:
        print(e)
    result = paginator.paginate_queryset([], request)
    return paginator.get_paginated_response(result, q, filter, request)


@swagger_auto_schema(
    methods=["get"],
    operation_summary="searches for message by a user",
    responses={
        200: openapi.Response("Ok"),
        404: openapi.Response("Not found"),
    },
)
@api_view(["GET"])
def search_suggestions(request, org_id, member_id):
    filter = {"user_id": member_id}

    data = {}
    count = 0

    try:
        payload = {
            "plugin_ID": settings.PLUGIN_ID,
            "organization_ID": org_id,
            "collection_name": "channelmessage",
            "filter": filter,
            "object_id": "",
        }
        res = requests.post(settings.READ_URL, json=payload)

        for message in res.json().get("data", []):
            data[message.get("content", "")] = message.get("content", "")
            if count == 10:
                break

        response = {"status": "ok", "type": "suggestions", "data": data}

    except Exception as e:
        print(e)
        response = {"status": "ok", "type": "suggestions", "data": data}
    return Response(response, status=status.HTTP_200_OK)
