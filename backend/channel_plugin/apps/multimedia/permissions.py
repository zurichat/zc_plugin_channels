from rest_framework import permissions

from channel_plugin.utils.customrequest import Request


class IsMember(permissions.BasePermission):

    message = "Join channel to reply message."

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        channel_id = request.parser_context.get("kwargs", {}).get("channel_id")
        user_id = request.query_params.get("user_id")

        response = Request.get(org_id, "channel", {"_id": channel_id}) or {}
        if response.get("users", {}).get(user_id):
            return True
        return False


class IsOwner(permissions.BasePermission):

    message = "Cannot delete someone else's media."

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        msg_id = request.parser_context.get("kwargs", {}).get("msg_id")
        user_id = request.query_params.get("user_id")

        response = (
            Request.get(org_id, "media", {"message_id": msg_id, "user_id": user_id})
            or {}
        )

        if response[0].get("user_id") == user_id:
            return True
        return False


class CanReply(permissions.BasePermission):

    message = "Can only reply messages"

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        channelmessage_id = request.parser_context.get("kwargs", {}).get(
            "channelmessage_id"
        )

        response = (
            Request.get(org_id, "channelmessage", {"_id": channelmessage_id}) or {}
        )

        if response.get("can_reply"):
            return True
        return False
