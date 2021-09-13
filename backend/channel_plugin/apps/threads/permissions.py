from rest_framework import permissions

from channel_plugin.utils.customrequest import Request


class IsMember(permissions.BasePermission):

    message = "Join channel to reply message."

    def has_permission(self, request, view):

        org_id = request.parser_context.get("kwargs", {}).get("org_id")
        channelmessage_id = request.parser_context.get("kwargs", {}).get(
            "channelmessage_id"
        )
        user_id = request.data.get("user_id")

        res = Request.get(org_id, "channelmessage", {"_id": channelmessage_id})
        response = Request.get(org_id, "channel", {"_id": res.get("channel_id")})

        if response.get("users", {}).get(user_id):
            return True
        return False
