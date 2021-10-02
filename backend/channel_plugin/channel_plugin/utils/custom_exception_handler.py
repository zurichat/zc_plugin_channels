from rest_framework.views import exception_handler

from .customexceptions import CustomThrottled


def custom_exception_handler(exc, context):
    # Call REST framework's default exception handler first,
    # to get the standard error response.
    response = exception_handler(exc, context)

    if isinstance(
        exc, CustomThrottled
    ):  # check that a CustomThrottled exception is raised
        custom_response_data = {  # prepare custom response data
            "message": exc.detail,
            "availableIn": "%d seconds" % exc.wait,
            "throttleType": type(exc.throttle_instance).__name__,
        }
        response.data = (
            custom_response_data  # set the custom response data on response object
        )

    return response
