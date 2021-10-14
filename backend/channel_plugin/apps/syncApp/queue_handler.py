import asyncio
from django.conf import settings
from aiohttp import ClientSession
import json
from django.urls import reverse
from channel_plugin.utils.customrequest import request_view_by_name, find_match_in_db
import requests
from .utils import BadServerResponse

# def _():
#     return {"event": "enter_organization"}

# async def demo_handler(task_data):
#     print("started")
#     await asyncio.sleep(5)
#     print("ENDED")


# demo_handler.get_schema = _

class QueueHandler:

    """"
        TO USE THIS CLASS JUST CALL THE QueueHandler.run(handlers)
        handlers must be objects that have a get_schema() method which returns a 
        dict {"event": "name-of-event-handler-is-handling"}
        and an asynchronus run(task) method which starts the handler
    """

    __task_queue = []
    __resolved_task = []
    __unresolved_task = []
    _task_handlers = dict()

    def __init__(self, handlers=[]) -> None:
        try:
            self._set_task_handler(handlers)
        except Exception as e:
            print(f"Failed to initialize QueueHandler due to {e}")
        else:
            self.__update_global_state(done=False)
            pass

    def _set_task_handler(self, handlers):
        for handler in handlers:
            try:
                schema = handler.get_schema()
                print(f"\n {schema} \n")
                assert isinstance(schema, dict), f"handler.get_schema() returned a {type(schema)} instead of dict"
                assert isinstance(schema.get("event"), str), f"schema event must be of type string"
                self._task_handlers.update({schema.get("event"): handler})
            except:
                pass

    def _item_in_queue(self, item:dict):
        ids = []

        for task in self.__task_queue:
            ids.append(task["id"])

        return item["id"] in ids
      
    async def __run_task(self, task_handler, task_data):
        compeleted = False
        try:
            compeleted = await task_handler.run(task_data)
        except:
            pass
        if compeleted:
            self.__resolved_task.append(task_data)
        else:
            self.__unresolved_task.append(task_data)
        self.__task_queue.remove(task_data)

    def __update_global_state(self, done=True, *args, **kwargs):
        print(args)
        print(kwargs)
        if done:
            settings.SYNC_HANDLER=None
        else:
            settings.SYNC_HANDLER=self
        return {
            "SYNC_HANDLER": settings.SYNC_HANDLER,
        }

    @staticmethod
    def __set_runing_instance(handlers):
        settings.SYNC_HANDLER = QueueHandler(handlers)
        return QueueHandler(handlers)
    
    @staticmethod
    def __get_runing_instance(handlers):
        return (
            settings.SYNC_HANDLER
            if settings.SYNC_HANDLER else
            QueueHandler.__set_runing_instance(handlers)
        )

    def _get_queue(self):
        for item in self.__task_queue:
            yield item

    def update_queue(self, items:list):
        for item in items:
            if isinstance(item, dict):
                if not self._item_in_queue(item):
                    self.__task_queue.append(item)

    async def _get_queue_data(self):
        async with ClientSession()  as  session :
            id = settings.PLUGIN_ID
            url = f"https://api.zuri.chat//marketplace/plugins/{id}/"
            res = await session.get(url)
            
            if res.status == 200:
                data = json.loads(await res.read())
                queue = data.get("queue", [] )
                queue = [{
                            "id":20,
                            "event":"leave_organization",
                            "message":{
                                    "member_id":"testmaster",
                                    "organization_id": "6167b3f14cd3cc2a7af3dbe6"
                                }
                            },
                            {
                            "id": 30,
                            "event": "enter_organization",
                            "message": { "member_id":"6166cd978eac3b6a751cfb83",
                                            "organization_id":"61459d8e62688da5302acdb1"
                            }},
                                                ]
                self.update_queue(queue)

    async def _process_queue(self):
        event_loop = asyncio.get_event_loop()
        tasks = []
        for task in self._get_queue():
            handler = self._task_handlers.get(task.get("event"))

            if handler:
                tasks.append(self.__run_task(handler, task))

        await asyncio.gather(*tasks)

    async def __start__(self):
        await self._get_queue_data()
        await self._process_queue()
        await self.__end__()

    async def __end__(self):
        most_recent_task = None
        id = 0

        for task in self.__resolved_task:
            if task.get("id") > id:
                most_recent_task = task

        if most_recent_task:
            async with ClientSession() as session:
                id = settings.PLUGIN_ID
                url = f"https://api.zuri.chat//marketplace/plugins/{id}/sync"
                
                res = await session.post(url, {"id": most_recent_task.get("id")})
                
                if res.status == 200:
                    self.__update_global_state(done=True)


    @staticmethod
    def run(handlers):
        queue_handler = QueueHandler.__get_runing_instance(handlers)
        asyncio.run(queue_handler.__start__())


class TaskHandler:
    def __init__(self):
        # self.job_status = {"event": "enter_organization"}
        self.BASE_URL = "https://channels.zuri.chat/api"
    
    @staticmethod
    def run(data):
        print("RECEIVED DATA :" + str(data))
        assert isinstance(data, dict), f"Improper data type"
        
        self.__process_data()
    
    # @staticmethod
    def __process_data(self):
        self.member_id = data["message"]["member_id"]
        self.organization_id = data["message"]["organization_id"]
        self.event = data["event"]

    @staticmethod
    def get_schema():
        print("HEO")
        return {"event": "enter_organization"}

class JOIN_TaskHandler(TaskHandler):
    def __init__(self):
        pass

    # @staticmethod
    def __process_data(self):
        print("Processing Data")
        self.member_id = data["message"]["member_id"]
        self.organization_id = data["message"]["organization_id"]
        self.event = data["event"]
        default_channels =JOIN_TaskHandler.__get_default_channels()
        JOIN_TaskHandler.__add_member_to_channel(__member_id, __organization_id, default_channels)
        # super().
    @staticmethod
    def __get_default_channels(self):
        print("Get Default Channels")
        data = find_match_in_db(__organization_id, "channel", default, True, return_data=True)
        default_channel = [i["_id"] for i in data]
        return default_channels

    @staticmethod
    def __add_member_to_channel(self, member_id, org_id, channels):
        print("Add Member to Channel")
        for channel in channels:
            endpoint_url = f"/v1/{org_id}/channels/{channel_id}/members/"
            data = {"_id": member_id,
                    "role_id": "member",
                    "is_admin": false,
                    "notifications": {
                     "web": "nothing",
                     "mobile": "mentions",
                     "same_for_mobile": true,
                     "mute": false
                    }
                }
            response = requests.post(__BASE_URL + endpoint_url, data=json.loads(data))
    

class REMOVE_TaskHandler(TaskHandler):
    # def __init__(self):
    #     self.job_status = {"event":"leave_organization"}
    #     super().__init__()

    # @staticmethod
    # def __retrieve_user_channels(org_id, user_id):
    #     endpoint_url = f"/v1/{org_id}/channels/users/{user_id}/"
    #     response = requests.get(self.BASE_URL + endpoint_url)
    #     if response.status_code < 500:
    #         try:
    #             data = response.json()
    #             channel_ids = [i["_id"] for i in data]
    #             return channel_ids

    #         except Exception as e:
    #             print(f"\n ERROR {e} \n")
    #             raise BadServerResponse
    #     else:
    #         raise BadServerResponse

    # @staticmethod
    # def __remove_from_channels(member_id, org_id, channels=[]):
    #     for channel_id in channels:
    #         try:
    #             endpoint_url = f"/v1/{org_id}/channels/{channel_id}/members/{member_id}/"
    #             response = requests.delete(self.BASE_URL + endpoint_url)
    #         except Exception as e:
    #             raise BadServerResponse

    # @staticmethod
    # def run(data):
    #     assert isinstance(data, dict), f"Improper data type"
    #     member_id = data["message"]["member_id"]
    #     organization_id = data["message"]["organization_id"]
    #     event = data["event"]
        
    #     user_channels = self.retrieve_user_channels(organization_id, member_id)
    #     self.remove_from_channels(member_id, organization_id, user_channels)
    
    
    # @staticmethod
    # def get_schema():
    #     print(__job_status)
    #     return {"event":"leave_organization"}
    pass