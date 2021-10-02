import json
import logging
from dataclasses import dataclass
from urllib.parse import urlencode

import requests
from django.conf import settings
from django.urls import reverse

logger = logging.getLogger("sentry_sdk")

data = {"plugin_id": settings.PLUGIN_ID}
read = settings.READ_URL
write = settings.WRITE_URL
delete = settings.DELETE_URL


def check_payload(payload):
    if isinstance(payload, list):
        return True
    assert isinstance(payload, dict), "payload must be list or dict"
    return False


@dataclass
class Request:
    @staticmethod
    def get(org_id, collection_name, params={}):
        data = {"plugin_id": settings.PLUGIN_ID}
        url = f"{read}/{settings.PLUGIN_ID}/{collection_name}/{org_id}"
        if params:
            if "_id" not in params.keys():
                _filter = {}
                tmp = []
                data.update(
                    {
                        "organization_id": org_id,
                        "collection_name": collection_name,
                    }
                )
                for k, v in params.items():
                    if isinstance(v, list):
                        v = v[0]
                    if v.lower() in ["true", "false"]:
                        v = True if v.lower() == "true" else False
                    tmp.append({k: {"$eq": v}})
                _filter.update({"$and": tmp})

                data.update(
                    {
                        "filter": _filter,
                    }
                )
                data.pop("object_id", None)
                response = requests.post(read, data=json.dumps(data))
            else:
                url += f"?{urlencode(params)}"
                response = requests.get(url)
        else:
            response = requests.get(url)
        if response.status_code >= 200 and response.status_code < 300:
            return response.json()["data"]
        return {"error": response.json()}

    @staticmethod
    def post(org_id, collection_name, payload):
        data = {"plugin_id": settings.PLUGIN_ID}
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
        data = {"plugin_id": settings.PLUGIN_ID}
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
            data.update({"filter": {"_id": object_id}})
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
        data = {"plugin_id": settings.PLUGIN_ID}
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


def search_db(org_id, channel_id, collection_name, **params):

    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "filter": {
            "$and": [
                {"channel_id": {"$eq": channel_id}},
            ]
        },
    }
    if len(params) > 0:
        for param in params:
            if isinstance(params[param], bool):
                value = params[param]
                data["filter"]["$and"].append({param: {"$eq": value}})
                continue
            value = params[param]
            data["filter"]["$and"].append({param: {"$regex": value, "$options": "i"}})
    response = requests.post(read, data=json.dumps(data))
    if response.status_code >= 200 and response.status_code < 300:
        return response.json()["data"]
    return {"error": response.json()}


def get_messages_from_page(
    org_id, collection_name, channel_id, page, page_size, site_host=None
):
    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "filter": {
            "$and": [
                {"channel_id": {"$eq": channel_id}},
            ]
        },
        "options": {},
    }

    skips = page_size * (page - 1)

    data["options"].update(
        {
            "skip": skips,
            "limit": page_size,
        }
    )

    response = requests.post(read, data=json.dumps(data))

    data = response.json()
    pg_links = gen_page_links(org_id, "userscroll", channel_id, page, page_size)

    for i in pg_links:
        if pg_links[i] is not None:
            try:
                pg_links[i] = site_host + pg_links[i]
            except:  # noqa
                pass

    data["links"] = pg_links

    return data


def gen_page_links(org_id, collection_name, channel_id, cur_page, page_size):
    new_url = reverse(
        "paginate_messages", kwargs={"org_id": org_id, "channel_id": channel_id}
    )
    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "filter": {
            "$and": [
                {"channel_id": {"$eq": channel_id}},
            ]
        },
        "options": {},
    }

    skips = page_size * (cur_page - 1) + 1

    data["options"].update(
        {
            "skip": skips,
            "limit": page_size,
        }
    )

    response = requests.post(read, data=json.dumps(data))
    data = response.json()
    if cur_page > 1:
        prev_link = new_url + f"?page={cur_page - 1}&?page_size={page_size}"
        pass
    else:
        prev_link = None
    try:
        if not data["data"]:
            next_link = None
            pass
        else:
            next_link = new_url + f"?page={cur_page + 1}&page_size={page_size}"
    except:  # noqa
        print("Error RetrIEVEING DATA")
        pass
    data_links = {"prev": prev_link, "next": next_link}
    return data_links


def save_last_message_user(org_id, collection_name, payload):
    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "bulk_write": False,
        "payload": payload,
    }
    if find_match_in_db(org_id, collection_name, "user_id", payload["user_id"]):
        data["bulk_write"] = True
        data.update({"filter": {"user_id": {"$eq": payload["user_id"]}}})
        requests.put(write, data=json.dumps(data))
        print("UPDATED")

    else:
        requests.post(write, data=json.dumps(data))
        print("Created new")

    match = find_match_in_db(org_id, collection_name, "user_id", payload["user_id"])
    if match is None:
        requests.post(write, data=json.dumps(data))
        print("Created new")
    else:
        data.update({"object_id": payload["user_id"]})
        requests.put(read, data=json.dumps(data))
        print("Updated")


def find_match_in_db(org_id, collection_name, param, value, return_data=False):
    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "filter": {
            "$and": [
                {param: {"$eq": value}},
            ]
        },
    }

    response = requests.post(read, data=json.dumps(data))
    response_data = response.json()
    print(response_data)
    try:
        if response_data:
            return response_data["data"]
        if response_data["data"] is not None:
            print("We made a match")
            return True

    except:  # noqa
        print("No match")
        return None

def get_thread_from_message(org_id, collection_name, channelmessage_id, page, page_size):
    data = {
        "plugin_id": settings.PLUGIN_ID,
        "organization_id": org_id,
        "collection_name": collection_name,
        "filter": {
            "$and": [
                {"channelmessage_id": {"$eq": channelmessage_id}},
            ]
        },

        "options" : {

        }
    }

    skips = page_size * (page - 1)

    data["options"].update({
        "skip" : skips,
        "limit" : page_size,
        })
    
    response = requests.post(read, data=json.dumps(data))

    return response.json()

