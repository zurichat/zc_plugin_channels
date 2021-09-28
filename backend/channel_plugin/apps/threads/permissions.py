from rest_framework import permissions

from channel_plugin.utils.customrequest import Request


class IsMember(permissions.BasePermission):

    message = "Join channel to reply message."

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        channel_id = request.query_params.get("channel_id")
        user_id = request.data.get("user_id") or request.query_params.get("user_id")

        response = Request.get(org_id, "channel", {"_id": channel_id}) or {}
        if response.get("users", {}).get(user_id):
            return True
        return False


class IsOwner(permissions.BasePermission):

    message = "Cannot edit someone else's message."

    def has_permission(self, request, view):

        if request.method == "DELETE":
            self.message = "Cannot delete someone else's message."

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        thread_id = request.parser_context.get("kwargs", {}).get("thread_id")
        user_id = request.query_params.get("user_id")

        response = Request.get(org_id, "thread", {"_id": thread_id}) or {}

        if response.get("user_id") == user_id:
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
        if response.__contains__("_id"):
            if response.get("can_reply"):
                return True
        return False
