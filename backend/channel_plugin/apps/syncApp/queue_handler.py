import asyncio
from asyncio.tasks import gather
from django.conf import settings
from aiohttp import ClientSession
import json
import requests

# def _():
#     return {"event": "enter_organization"}

# async def demo_handler(task_data):
#     print("started")
#     await asyncio.sleep(5)
#     print("ENDED")


# demo_handler.get_schema = _
dummy_queue_data = [
    {
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
        "message": {
            "member_id":"OneHader",
            "organization_id":"1"
        }
    },
]

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
        except:
            print("Failed to initialize QueueHandler")
        else:
            self.__update_global_state(done=False)
            pass

    def _set_task_handler(self, handlers):
        for handler in handlers:
            try:
                schema = handler.get_schema()
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
        print("RUNING A TASK")
        try:
            compeleted = await task_handler.run(task_data)
        except Exception as exc:
            print(exc)
            pass
        
        if compeleted:
            self.__resolved_task.append(task_data)
        else:
            self.__unresolved_task.append(task_data)
            
        self.__task_queue.remove(task_data)

    def __update_global_state(self, done=True):
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
            
            url = f"https://api.zuri.chat/marketplace/plugins/{id}/"

            res = await session.get(url)
            
            if res.status == 200:
                data = json.loads(await res.read())
                queue = data.get("data").get("queue", [])
                # queue = dummy_queue_data # For debugging
                self.update_queue(queue)

    async def _process_queue(self):
        event_loop = asyncio.get_event_loop()
        tasks = []
        
        for task in self._get_queue():
            handler = self._task_handlers.get(task.get("event"))
            if handler:
                print("Gotten handler and sending")
                tasks.append(self.__run_task(handler, task))

        await asyncio.gather(*tasks)

    async def __start__(self):
        await self._get_queue_data()
        await self._process_queue()
        # await self.__end__()

    async def __end__(self):
        most_recent_task = {}
        id = 0

        for task in self.__resolved_task:
            if task.get("id") > id:
                most_recent_task = task

        if most_recent_task:
            id = settings.PLUGIN_ID
            url = f"https://api.zuri.chat/plugins/{id}/sync"

            res = requests.patch(url, json.dumps({"id": most_recent_task.get("id")}))
            if res.status_code >= 200 or res.status_code < 300:  
                self.__update_global_state(done=True)

    @staticmethod
    def run(handlers):
        queue_handler = QueueHandler.__get_runing_instance(handlers)
        try:
            asyncio.run(queue_handler.__start__())
        except (RuntimeError,  RuntimeWarning):
            future = asyncio.ensure_future(queue_handler.__start__())
