from django.conf import settings
import bisect

class QueueHandler:
    __task_queue = []
    __resolved_task = set()
    __unresolved_task = set()

    def retrieve_queue():
        pass

    def update_queue(self, items:list):
        for item in items:
            if not self._item_in_queue(item):
                bisect.insort(self.__task_queue, item)

    def _item_in_queue(self, item:dict):
        ids = []

        for task in self.__task_queue:
            ids.append(task["id"])

        return item["id"] in ids
    
    def __update_global_state(self, done=True):
        if done:
            settings.SYNC_HANDLER=None
            settings.SYNC_HANDLER_RUNING=False
        else:
            settings.SYNC_HANDLER=self
            settings.SYNC_HANDLER_RUNING=True

        return {
            "SYNC_HANDLER": settings.SYNC_HANDLER,
            "SYNC_HANDLER_RUNING": settings.SYNC_HANDLER_RUNING
        }

    def __run_queue_task():
        pass

    def __get_runing_instance__():
        return (
            settings.SYNC_HANDLER_RUNING
            if settings.SYNC_HANDLER_RUNING else
            QueueHandler() 
        )

    def _get_queue(self):
        for item in self.TaskQueue:
            yield item

    def run():
        pass
