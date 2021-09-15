from django.http import JsonResponse

class AuthenticationMiddleware:

    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        response = self.get_response(request)
        return response

    def process_view(self, request, view_func, view_args, view_kwargs):
        view_exceptions = ["render_react", "schemaview"]
        user_token = request.GET.get("user_token")
        if view_func.__name__.lower() in view_exceptions:
            return
        # print(user_token)
        # Process user token from zc_core & raise exception if
        # the user isnt authenticated
        # return JsonResponse({"msg": "user not authenticated"})
