import json
import random
from dataclasses import dataclass
from urllib.parse import urlencode

import requests
from django.conf import settings
from django.http import JsonResponse

from .fixtures import fixtures

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
    def get(org_id, collection_name, params=None):
        url = f"{read}/{settings.PLUGIN_ID}/{collection_name}/{org_id}/"
        if params is not None:
            url += f"?{urlencode(params)}/"
        print(url)
        try:
            response = requests.get(url)
            if response.status_code >= 200 and response.status_code < 300:
                return response.json()
            return JsonResponse({"error": response.json()}, status_code=400)
        except:  # noqa
            flag = True
            document = list()
            items = fixtures.get(collection_name)
            for item in items:
                for x, y in params.items():
                    if item[x] != y:
                        flag = False
                if flag:
                    document.append(item)
                flag = True

            if document:
                if len(document) == 1:
                    return document[0]
                return document
            return dict()

    @staticmethod
    def post(org_id, collection_name, payload):
        data.update(
            {
                "organization_id": org_id,
                "collection_name": collection_name,
                "bulk_write": check_payload(payload),
                "payload": payload,
            }
        )
        try:
            response = requests.post(write, data=json.dumps(data))
            if response.status_code >= 200 and response.status_code < 300:
                return response.json()
            return JsonResponse({"error": response.json()}, status_code=400)
        except:  # noqa
            payload.update({"_id": str(random.randint(1, 100))})
            return payload  # to be changed later

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
        try:
            response = requests.post(write, data=json.dumps(data))
            if response.status_code >= 200 and response.status_code < 300:
                return response.json()
            return JsonResponse({"error": response.json()}, status_code=400)
        except:  # noqa
            payload.update({"_id": str(random.randint(1, 100))})
            return payload  # to be changed later

    @staticmethod
    def delete(org_id, collection, payload, filter=None, object_id=None):
        raise NotImplementedError("Zuri Core has not implemeted")
