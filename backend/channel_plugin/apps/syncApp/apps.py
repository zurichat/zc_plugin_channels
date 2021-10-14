from django.apps import AppConfig
from .queue_handler import QueueHandler as QH, JOIN_TaskHandler, REMOVE_TaskHandler  

class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
    	# print("App is ready")
    	QH.run(handlers = [JOIN_TaskHandler, REMOVE_TaskHandler]) 
    	print("CONCLUDE")