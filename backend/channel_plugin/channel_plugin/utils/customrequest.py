import json
from dataclasses import dataclass
from urllib.parse import urlencode

import requests
from django.conf import settings

data = {"plugin_id": settings.PLUGIN_ID}
read = settings.READ_URL
write = settings.WRITE_URL
delete = settings.DELETE_URL


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
        if params is not None and len(params) > 0:
            data = dict()
            for k, v in params.items():
                data.update({k: v[0]})
            url += f"?{urlencode(data)}"
        response = requests.get(url)
        if response.status_code >= 200 and response.status_code < 300:
            return response.json()["data"]
        return {"error": response.json()}

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
        response = requests.post(write, data=json.dumps(data))
        if response.status_code >= 200 and response.status_code < 300:
            payload.update({"_id": response.json().get("data", {}).get("object_id")})
            return payload
        return {"error": response.json()}

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
        bulk_write = data.get("bulk_write")
        if bulk_write:
            if data_filter is None:
                return {"error": "Filter must be set for multiple payload"}
            data.update({"filter": data_filter})
        else:
            if object_id is None:
                return {"error": "Object ID must be set for multiple payload"}
            data.update({"object_id": object_id})

        response = requests.put(write, data=json.dumps(data))
        if response.status_code >= 200 and response.status_code < 300:
            if not bulk_write:
                tmp = {"_id": object_id}
                response = Request.get(org_id, collection_name, tmp)
                return response
            else:
                response = Request.get(org_id, collection_name)
                return response
        return {"error": response}

    @staticmethod
    def delete(org_id, collection_name, data_filter=None, object_id=None):
        data.update(
            {
                "organization_id": org_id,
                "collection_name": collection_name,
            }
        )
        if data_filter is not None:
            data.update({"filter": data_filter, "bulk_delete": True})
        else:
            if object_id is None:
                return {"error": "Object ID or Filter must be set"}
            data.update({"object_id": object_id})

        response = requests.post(delete, data=json.dumps(data))

        if response.status_code >= 200 and response.status_code < 300:
            return response.json()
        return {"error": response}
