import asyncio
from typing import Iterable
from django.conf import settings
from aiohttp import ClientSession
import bisect
import json


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
        except:
            print("Failed to initialize QueueHandler")
        else:
            self.__update_global_state(self, done=False)
            pass
    
    def _set_task_handler(self, handlers):
        for handler in handlers:
            schema = handler.get_schema()
            
            assert isinstance(schema, dict), f"handler.get_schema() returned a {type(schema)} instead of dict"
            assert isinstance(schema.get("event"), str), f"schema event must be of type string"

            self._task_handlers.update({schema.get("event"): handler})

    def update_queue(self, items:list):
        for item in items:
            if isinstance(item, dict):
                if not self._item_in_queue(item):
                    self.__task_queue.append(item)

    def _item_in_queue(self, item:dict):
        ids = []

        for task in self.__task_queue:
            ids.append(task["id"])

        return item["id"] in ids
    
    def __update_global_state(self, done=True):
        if done:
            settings.SYNC_HANDLER=None
        else:
            settings.SYNC_HANDLER=self
        return {
            "SYNC_HANDLER": settings.SYNC_HANDLER,
        }
    
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

    async def _get_queue_data(self):
        async with ClientSession()  as  session :
            # id = settings.PLUGIN_ID
            id = "6165f520375a4616090b8275"
            url = f"https://api.zuri.chat//marketplace/plugins/{id}/"
            res = await session.get(url)
            
            if res.status == 200:
                data = json.loads(await res.read())
                queue = data.get("queue", [
                    {
                        "id": 1,
                        "event": "enter_organization",
                    }, 
                    {
                        "id": 10,
                        "event": "enter_organization"
                    },
                    {
                        "id": 5,
                        "event": "enter_organization"
                    },
                    {
                        "id": 2,
                        "event": "leave_organization"
                    }
                ])
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
                # id = settings.PLUGIN_ID
                id = "6165f520375a4616090b8275" or settings.PLUGIN_ID
                url = f"https://api.zuri.chat//marketplace/plugins/{id}/sync"
                
                res = await session.post(url, {"id": most_recent_task.get("id")})
                
                if res.status == 200:
                    self.__update_global_state(done=True)


    @staticmethod
    def run(handlers):
        queue_handler = QueueHandler.__get_runing_instance(handlers)
        asyncio.run(queue_handler.__start__())


