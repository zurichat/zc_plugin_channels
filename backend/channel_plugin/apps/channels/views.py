import json
from typing import Set
from django.http.response import Http404, JsonResponse
from drf_yasg import openapi
from drf_yasg.utils import swagger_auto_schema
from rest_framework import serializers, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ViewSet
from channel_plugin.utils.customrequest import Request

from .serializers import (  # SearchMessageQuerySerializer,
    ChannelSerializer,
    ChannelUpdateSerializer,
    UserSerializer,
)

# Create your views here.


class ChannelViewset(ViewSet):
    @swagger_auto_schema(
        request_body=ChannelSerializer,
        responses={201: openapi.Response("Response", ChannelUpdateSerializer)},
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
        return Response(result, status=status.HTTP_201_CREATED)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", ChannelUpdateSerializer(many=True))
        }
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def channel_all(self, request, org_id):

        """
        This gets all channels for a
        particular organization identified by ID
        """
        data = {}
        data.update(dict(request.query_params))
        result = Request.get(org_id, "channel", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
        operation_id="message read one channel",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def channel_retrieve(self, request, org_id, channel_id):
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data)
        return Response(result, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        request_body=ChannelUpdateSerializer,
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def channel_update(self, request, org_id, channel_id):
        serializer = ChannelUpdateSerializer(
            data=request.data, context={"org_id": org_id}
        )
        serializer.is_valid(raise_exception=True)
        channel = serializer.data.get("channel")
        result = channel.update(org_id, channel_id)
        return Response(result, status=status.HTTP_200_OK)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def channel_delete(self, request, org_id, channel_id):
        return Response({"msg": "To be implemened"}, status=status.HTTP_204_NO_CONTENT)


channel_views = ChannelViewset.as_view(
    {
        "get": "channel_all",
        "post": "channels",
    }
)

channel_views_group = ChannelViewset.as_view(
    {"get": "channel_retrieve", "put": "channel_update", "delete": "channel_delete"}
)


class ChannelMemberViewset(ViewSet):
    
    def validate_name(self, name):
        return name

    def retrieve_channel(self, request, org_id, channel_id):
        """
            This method get's a retrives channel data
            from zc-core
        """
        data = {"_id": channel_id}
        result = Request.get(org_id, "channel", data)
        return result

    def find_user(self, users, user_id):
        """
            This method finds a user from a list of users
        """
        for user in users:
            if user["_id"] == user_id:
                return user

    def filter_params(self, serializer, params):
        """ This method all parameters not in user serializer """
        fields = list(serializer().get_fields().keys())
        
        keys = list(filter(
                lambda param: bool(param in fields),
                params.keys()
        ))

        for key in params:
            if key not in keys:
                del params[key]
        return params

    def filter_users(self, users, params):
        output = []
        
        for param in params.items():
            out = list(filter(
                    lambda user: param in user.items(),
                    users.values())
            )

            for item in out:
                if item not in output:
                    output.append(item)
        
        output = []
        for user in users.values():
            flag = 0
            
            for param in params.items():
                if param in user.items():
                    flag += 1
                else:
                    break

            if flag == len(list(params.items())):
                output.append(user)

        return list(output) if bool(params) else list(users.values())

    @swagger_auto_schema(
        request_body=UserSerializer,
        responses={201: openapi.Response("Response", UserSerializer)},
        operation_id="add-channel-member",
    )
    @action(
        methods=["POST"],
        detail=False,
    )
    def add_member(self, request, org_id, channel_id):

        """
        This method adds a user to a channel identified by ID
        """

        "get the channel from zc-core"
        channel = self.retrieve_channel(request, org_id, channel_id)
        assert bool(channel) == True
    
        "check if the user is aleady a member of the channel"
        user = self.find_user(channel["users"], request.data.get("_id"))
        
        if not user:
            "add the add the user to the channel"    
            user_data = {
                "_id": request.data.get("_id"),
                "role_id": request.data.get("role_id"),
                "is_admin": request.data.get("is_admin", "false"),
            }

            serializer = UserSerializer(data=user_data)
            serializer.is_valid(raise_exception=True)
            # add user to the channel
            channel["users"].update({
                f"{user_data['_id']}": serializer.data
            })

            serializer = ChannelUpdateSerializer(data=channel, context={"org_id": org_id})
            
            # hack to overide serializer's validate_name method
            serializer.validate_name = self.validate_name

            serializer.is_valid(raise_exception=True)
            channel = serializer.data.get("channel")
            result = channel.update(org_id, channel_id)   
            
            if type(result) == JsonResponse:
                assert result.status_code >= 200 and result.status_code < 300
            
            # send signal to centri app to message centrifugo
            
            return Response(user_data, status=status.HTTP_201_CREATED)

        return Response(user, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={
            200: openapi.Response("Response", UserSerializer(many=True))
        },
        operation_id="list-channel-members",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def list_members(self, request, org_id, channel_id):
        """
        This gets all members for a
        particular channel identified by ID
        """

        data = {'_id': channel_id}
        # data.update(dict(request.query_params))

        "get the channel from zc-core"
        channel = self.retrieve_channel(request, org_id, channel_id)
        assert bool(channel) == True #make sure the channel was found

        #clean params
        test_data = {
            "1": {"role": "20", "is_admin":"true", "_id": "1"},
            "2": {"role": "20", "is_admin":"true", "_id": "1"},
            "3": {"role": "20", "is_admin":"false", "_id": "1"}
        }

        users = self.filter_users(
            test_data,
            self.filter_params(UserSerializer, request.query_params)
        )

        serializer = UserSerializer(data=users, many=True)
        serializer.is_valid(raise_exception=True)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @swagger_auto_schema(
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
        operation_id="retrieve-member-detail",
    )
    @action(
        methods=["GET"],
        detail=False,
    )
    def get_member(self, request, org_id, channel_id, member_id):
        channel = self.retrieve_channel(request, org_id, channel_id)
        assert bool(channel) == True
    
        "check if the user is aleady a member of the channel"
        user_data = self.find_user(channel["users"], member_id)
        
        if user_data:
            "add the add the user to the channel"
            serializer = UserSerializer(data=user_data)
            serializer.is_valid(raise_exception=True)
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(
            {"error": "User not found"}, 
            status=status.HTTP_404_NOT_FOUND
        )

    @swagger_auto_schema(
        request_body=ChannelUpdateSerializer,
        responses={200: openapi.Response("Response", ChannelUpdateSerializer)},
        operation_id="upadte-member-details",
    )
    @action(
        methods=["PUT"],
        detail=False,
    )
    def update_member(self, request, org_id, channel_id, member_id):
        """
            This method update a channels member details
        """

        "get the channel from zc-core"
        channel = self.retrieve_channel(request, org_id, channel_id)
        assert bool(channel) == True
    
        "check if the user is aleady a member of the channel"
        user_data = self.find_user(channel["users"], member_id)
        
        if user_data:
            "update the users data"    
            for key in user_data.keys():
                if key != "_id":
                    user_data[key] = request.data.get(key, user_data[key])

            serializer = UserSerializer(data=user_data)
            serializer.is_valid(raise_exception=True)
            
            # add user to the channel
            channel["users"].update({
                f"{member_id}": serializer.data
            })

            serializer = ChannelUpdateSerializer(data=channel, context={"org_id": org_id})
            
            # hack to overide serializer's validate_name method
            serializer.validate_name = self.validate_name

            serializer.is_valid(raise_exception=True)
            channel = serializer.data.get("channel")
            result = channel.update(org_id, channel_id)
            
            if type(result) == JsonResponse:
                assert result.status_code >= 200 and result.status_code < 300
            
            return Response(user_data, status=status.HTTP_200_OK)
        return Response(
            {"error": "User not found"}, 
            status=status.HTTP_404_NOT_FOUND)

    @action(
        methods=["DELETE"],
        detail=False,
    )
    def remove_member(self, request, org_id, channel_id, member_id):
        channel = self.retrieve_channel(request, org_id, channel_id)
        assert bool(channel) == True
    
        "check if the user is aleady a member of the channel"
        user_data = self.find_user(channel["users"], member_id)

        if user_data:
            "Remove  the user from the channel"
            del channel["users"][member_id]
            serializer = ChannelUpdateSerializer(data=channel, context={"org_id": org_id})

            # hack to overide serializer's validate_name method
            serializer.validate_name = self.validate_name

            serializer.is_valid(raise_exception=True)
            channel = serializer.data.get("channel")
            result = channel.update(org_id, channel_id)   
            
            if type(result) == JsonResponse:
                assert result.status_code >= 200 and result.status_code < 300
            
            # send signal to centri app to left message centrifugo

            return Response({"msg": "success"}, status=status.HTTP_204_NO_CONTENT)

        return Response({"error": "member not found"}, status=status.HTTP_404_NOT_FOUND)


channel_members_list_create_views = ChannelMemberViewset.as_view(
    {
        "get": "list_members",
        "post": "add_member",
    }
)

channel_members_update_retrieve_views = ChannelMemberViewset.as_view(
    {
        "get": "get_member",
        "put":"update_member",
        "delete": "remove_member"
    }
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
