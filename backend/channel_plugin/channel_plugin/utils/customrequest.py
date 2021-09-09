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
        url = f"{read}/{settings.PLUGIN_ID}/{collection_name}/{org_id}"
        print(repr(url))
        if params is not None and len(params) > 0:
            url += f"?{urlencode(params)}"
            print("We have params")
            print(repr(url))
        print("Sending request to : " + url + " now")
        try:
            # response = requests.get("https://api.zuri.chat/data/read/613654ede2358b02686503bb/channel/xxxYYY")
            response = requests.get(url)
            # if response.status_code >= 200 and response.status_code < 300:
            try:
                return response.json()['data']
            except:
                return response.json()
            # return JsonResponse({"error": response.json()}, status_code=400)
        except Exception as e:  # no internet access
            # flag = True
            # document = [str(e)]
            # items = fixtures.get(collection_name)
            # for item in items:
            #     for x, y in params.items():
            #         if item[x] != y:
            #             flag = False
            #     if flag:
            #         document.append(item)
            #     flag = True

            # if document:
            #     if len(document) == 1:
            #         return document[0]
            #     return document
            return {'error':str(e)}

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
    def put(org_id, collection_name, payload, data_filter=None, object_id=None):
        data.update(
            {
                "organization_id": org_id,
                "collection_name": collection_name,
                "bulk_write": check_payload(payload),
                "payload": payload,
            }
        )
        if data.get("bulk_write"):
            if data_filter is None:
                return JsonResponse(
                    {"error": "Filter must be set for multiple payload"}
                )
            data.update({"filter": data_filter})
        else:
            if object_id is None:
                return JsonResponse(
                    {"error": "Object ID must be set for multiple payload"}
                )
            data.update({"object_id": object_id})
        try:
            response = requests.patch(write, data=json.dumps(data))
            if response.status_code >= 200 and response.status_code < 300:
                return response.json()
            return JsonResponse({"error": response.json()}, status_code=400)
        except:  # noqa
            document = {}
            for item in fixtures.get(collection_name):
                if item.get("_id") == object_id:
                    document.update(item)
            if document:
                document.update(payload)
                return document
            return dict()  # to be changed later

    @staticmethod
    def delete(org_id, collection, payload, data_filter=None, object_id=None):
        raise NotImplementedError("Zuri Core has not implemeted")
