from rest_framework import permissions

from channel_plugin.utils.customrequest import Request


class IsChannelMember(permissions.BasePermission):
    
    message = "You have to be a member of a channel to add users."

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        user_id = request.data.get("user_id") or request.query_params.get("user_id")
        channel_id = request.parser_context.get("kwargs", {}).get(
            "channel_id"
        ) or request.query_params.get("channel_id")

        response = Request.get(org_id, "channel", {"_id": channel_id}) or {}
        if response.get("users", {}).get(user_id):
            return True
        return False


class IsOrganizationMember(permissions.BasePermission):
    def has_permission(self, request, view):
        # TODO: complete when organization users endpoint is ready
        # response = 
        return True


class IsAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        # TODO: change when auth middle-ware is ready
        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        user_id = request.data.get("user_id") or request.query_params.get("user_id")
        channel_id = request.parser_context.get("kwargs", {}).get(
            "channel_id"
        ) or request.query_params.get("channel_id")

        response = Request.get(org_id, "channel", {"_id": channel_id}) or {}
        if response.get("users", {}).get(user_id):
            return True
        return False



