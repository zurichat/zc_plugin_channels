# from django import http
# from django.conf import settings
# from django.http import JsonResponse
# import logging
import re

from sentry_sdk import capture_message

host_regex = re.compile(r"(\d+\.\d+\.\d+\.\d+|localhost):[\d+]{4}")


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
            response = self.process_response(request, response)
            capture_message(f'Production - {response.__dict__["_headers"]}')
            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except KeyError:
                pass
            capture_message(f'Production - {response.__dict__["_headers"]}')
            capture_message(f'Production Keys- {response.__dict__["_headers"].keys()}')

        return response

    def process_response(self, request, response):

        result = host_regex.match(request.get_host())
        if request.method in ["GET"]:
            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except KeyError:
                pass

        if request.method in ["GET", "POST", "PUT", "DELETE"] and result:
            try:
                del response.__dict__["_headers"]["access-control-allow-origin"]
            except KeyError:
                pass

        if "workspace" in request.path:
            capture_message(response.__dict__["_headers"])

        return response
