# from django import http
# from django.conf import settings
# from django.http import JsonResponse
# import logging
import re

from sentry_sdk import capture_message

local_host_regex = re.compile(r"(\d+\.\d+\.\d+\.\d+|localhost):[\d+]{4}")


class AuthenticationMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):  # noqa
        view_exceptions = ["render_react", "schemaview"]
        # user_token = request.GET.get("user_token")
        if view_func.__name__.lower() in view_exceptions:
            return
        # print(user_token)
        # Process user token from zc_core & raise exception if
        # the user isnt authenticated
        # return JsonResponse({"msg": "user not authenticated"})


class CorsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        if response:
            result = local_host_regex.match(request.get_host())

            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except KeyError:
                pass

            if (
                not result
                and request.method
                in [
                    "PUT",
                    "PATCH",
                    "DELETE",
                ]
                or response.status_code == 404
                and request.method == "GET"
            ):
                if not response.__dict__["_headers"].__contains__(
                    "access-control-allow-origin"
                ):
                    response.__dict__["_headers"]["access-control-allow-origin"] = (
                        "Access-Control-Allow-Origin",
                        f"{request.scheme}://zuri.chat",
                    )
                    capture_message(
                        f'Production Live [PUT,DELETE,PATCH,POST,GET]- {response.__dict__["_headers"]}'
                    )

            if "zuri-zuri-plugin-channels.js" in request.path:

                capture_message(
                    f'Production Live Static - {response.__dict__["_headers"]}'
                )

            if result:

                capture_message(f'Production Local - {response.__dict__["_headers"]}')
        capture_message(f"Production Request - {request.headers}")
        capture_message(f"Production Request DICT - {request.META.keys()}")

        return response

    def process_response(self, request, response):

        result = local_host_regex.match(request.get_host())

        if result:

            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except KeyError:
                pass

        return response
