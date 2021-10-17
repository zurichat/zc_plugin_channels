import asyncio
from asyncio import tasks
from asyncio.events import Handle
import aiohttp
from django.conf import settings
import json
# from channel_plugin.utils.customrequest import find_match_in_db
import requests
from requests.sessions import session
from apps.syncApp.utils import BadServerResponse
from channel_plugin.utils.customrequest import change_collection_name

data = {"plugin_id": settings.PLUGIN_ID}
read = settings.READ_URL
write = settings.WRITE_URL
delete = settings.DELETE_URL

timeout = aiohttp.ClientTimeout(60*2)


@change_collection_name
async def find_match_in_db(org_id, collection_name, param, value, return_data=False):
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
    async with aiohttp.ClientSession(timeout=timeout) as session:

        response = await session.post(read, data=json.dumps(data), timeout=timeout)
        
        if response.status >= 200 or response.status < 300:
            response_data = json.loads(await response.read()) or {}
            assert isinstance(response_data, dict), "Invalid response returned"

            try:
                if return_data:
                    return response_data["data"]

                if response_data["data"] is not None:
                    print("We made a match")
                    return True

            except:  # noqa
                print("No match")
                return None


class JoinTaskHandler:
    __BASE_URL = "https://channels.zuri.chat/api"

    def __init__(self, data):
        self.process_data(data)
        # return self

    @staticmethod
    async def run(data):
        try:
            assert isinstance(data, dict), f"Improper data type"
            assert isinstance(data.get("message"), dict), "message must be of type dict"
            handler = JoinTaskHandler(data)
            await handler.__execute_operations()
            return True    
        except:
            return False

    @staticmethod
    def get_schema():
        return {"event": "enter_organization"}

    def process_data(self, data):
        self.member_id = data["message"]["member_id"]
        self.organization_id = data["message"]["organization_id"]
        self.event = data["event"]
    
    async def __execute_operations(self):
        print("Executing process")
        default_channels = await self.__get_default_channels()
        print(default_channels)
        await self.__add_member_to_channel(self.member_id, self.organization_id, default_channels)
            
    async def __get_default_channels(self):
        data = await find_match_in_db(self.organization_id, "channel", "default", True, return_data=True)
        assert  isinstance(data, list), "find_match_in_db returned an invalid type"

        default_channel = [i["_id"] for i in data]
        print(default_channel)
        return default_channel or []

    async def __add_member_to_channel(self, member_id, org_id, channels):
        loop = asyncio.get_event_loop()        
        task = []
        
        async def add_member(channel):
            try:
                session = aiohttp.ClientSession(timeout=timeout)
                endpoint_url = f"/v1/{org_id}/channels/{channel}/members/"
                data = {
                    "_id": member_id,
                    "role_id": "member",
                    "is_admin": False,
                    "notifications": {
                        "web": "nothing",
                        "mobile": "mentions",
                        "same_for_mobile": True,
                        "mute": False
                    }
                }
                url = (self.__BASE_URL + endpoint_url)
                headers = {
                    "Content-Type": "application/json"
                }
                res = await session.post(url, data=json.dumps(data), headers=headers, timeout=timeout)
                await session.close()
            except Exception as err:
                print(err)
                pass
            
        for channel in channels:
            task.append(add_member(channel))

        await asyncio.gather(*task)


class RemoveTaskHandler:
    __BASE_URL = "https://channels.zuri.chat/api"
    
    def __init__(self, data):
        self.process_data(data)
        # return self
        # self.__execute_operations()
        
    @staticmethod
    async def run(data):
        print(f"\nRUNNING Remove Task Handler with \n{data}")
        assert isinstance(data, dict), f"Improper data type"
        assert isinstance(data.get("message"), dict), "message must be of type dict"
        # RemoveTaskHandler.__create_new_instance(data)
        handler = RemoveTaskHandler(data)
        await handler.__execute_operations()
        return True

    def process_data(self, data):
        self.member_id = data["message"]["member_id"]
        self.organization_id = data["message"]["organization_id"]
        self.event = data["event"]
    
    @staticmethod
    def get_schema():
        return {"event":"leave_organization"}

    async def __execute_operations(self):
        default_channels = await self.__retrieve_user_channels(self.organization_id, self.member_id) 
        print(f"Default Chnnales {default_channels}")   
        await self.__remove_from_channels(self.member_id, self.organization_id, default_channels)

    async def __retrieve_user_channels(self, org_id, user_id):
        print("GETTING USER CHANNELS")
        endpoint_url = f"/v1/{org_id}/channels/users/{user_id}/"
        session = aiohttp.ClientSession()
        response = await session.get(RemoveTaskHandler.__BASE_URL + endpoint_url)
        # response = requests.get(RemoveTaskHandler.__BASE_URL + endpoint_url)
        if response.status >= 200 and response.status < 300 :
            try:
                data = await response.json()
                print(data)
                channel_ids = [i["_id"] for i in data]
                print("GOTTEN CHANNELS")
                print(channel_ids or "Member does not belong to any channels")
                return channel_ids or []
            except Exception as e:
                print(e)
                return []
                # raise BadServerResponse
        await session.close()


    async def __remove_from_channels(self, member_id, org_id, channels=[]):
        if len(channels) > 0:
            tasks = []
            
            session = aiohttp.ClientSession(timeout=timeout)
            for channel_id in channels:
                async def remove_user():
                    try:
                        endpoint_url = f"/v1/{org_id}/channels/{channel_id}/members/{member_id}/"
                        await session.delete(url=RemoveTaskHandler.__BASE_URL + endpoint_url)
                    except Exception as e:
                        raise BadServerResponse
                tasks.append(remove_user())
            await asyncio.gather(*tasks)
            await session.close()
    
    
    