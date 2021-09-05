import json
from dataclasses import dataclass
from os import write
from urllib.parse import quote_plus

import requests
from django.conf import settings
from django.http import JsonResponse

data = {"plugin_id": settings.PLUGIN_ID, "bulk_write": False, "payload": {}}
read = settings.READ_URL
write = settings.WRITE_URL


def check_payload(payload):
    if type(payload) == list:
        return True
    assert type(payload) == dict, "payload must be list or dict"
    return False


@dataclass
class Request:
    @staticmethod
    def get(org_id, collection, params=None):
        url = f"{read}/{settings.PLUGIN_ID}/{collection}/{org_id}/?{params}"
        if params is not None:
            params = quote_plus(params)
            url += f"?{params}"
        response = requests.get(url)
        if response.status_code >= 200 and response.status_code < 300:
            return response.json()
        return response.json()

    @staticmethod
    def post(org_id, collection, payload):
        data.update(
            {
                "organization_id": org_id,
                "collection_name": collection,
                "bulk_write": check_payload(payload),
                "payload": payload,
            }
        )
        response = requests.post(write, data=json.dumps(data))
        if response.status_code >= 200 and response.status_code < 300:
            return response.json()
        return response.json()

    @staticmethod
    def put(org_id, collection, payload, filter=None, object_id=None):
        data.update(
            {
                "organization_id": org_id,
                "collection_name": collection,
                "bulk_write": check_payload(payload),
                "payload": payload,
            }
        )
        if data.get("bulk_write"):
            if filter is None:
                return JsonResponse(
                    {"error": "Filter must be set for multiple payload"}
                )
            data.update({"filter": filter})
        else:
            if object_id is None:
                return JsonResponse(
                    {"error": "Object ID must be set for multiple payload"}
                )
            data.update({"object_id": object_id})

        response = requests.post(write, data=json.dumps(data))
        if response.status_code >= 200 and response.status_code < 300:
            return response.json()
        return response.json()

    @staticmethod
    def delete(org_id, collection, payload, filter=None, object_id=None):
        raise NotImplementedError("Zuri Core has not implemeted")
