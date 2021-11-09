import requests
from django.urls import reverse

SITE_HOST = "https://channels.zuri.chat"


def test_view(view_name, params, method="get", data=None):
    STATUS_CODES = {
        100: "Informational response",
        200: "Success",
        300: "Redirection",
        400: "Client Error",
        500: "Server Error",
    }
    url = SITE_HOST + reverse(view_name, kwargs=params)
    func = getattr(requests, method)
    response = func(url, data=data)
    verbose_name = view_name.split(":")[-1]
    verbose_name = " ".join(verbose_name.split("_"))
    verbose_name = verbose_name.title()
    data = {"success": True}
    for i, e in enumerate(STATUS_CODES):
        if response.status_code >= 400:
            data["success"] = False
        if response.status_code >= e and response.status_code < e + 100:
            data.update(
                {"view_name": verbose_name, "status_code": e, "type": "Endpoint Status"}
            )
            return data
