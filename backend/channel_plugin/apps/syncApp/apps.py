from django.apps import AppConfig
from .queue_handler import QueueHandler as QH
from .task_handler import JoinTaskHandler, RemoveTaskHandler  


class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
    	# print("App is ready")
    	QH.run(handlers = [JoinTaskHandler, RemoveTaskHandler]) 
    	print("CONCLUDE")