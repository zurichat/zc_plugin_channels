from django.apps import AppConfig

# from channel_plugin.apps.syncApp import task_handler
# from apscheduler.schedulers.background import BackgroundScheduler
# from apscheduler.jobstores.memory import MemoryJobStore
from .scheduler.schedulers import SingleJobBackgroundScheduler
from .scheduler.jobs import job_function , run_qhandler_schedule, my_listener
from datetime import datetime, timedelta
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
scheduler = SingleJobBackgroundScheduler()

from .queue_handler import QueueHandler as QHandler
from .task_handler import RemoveTaskHandler, JoinTaskHandler 

INTERVAL = 20
MAX_INSTANCES = 1
JOB_ID = "QHTimer"

class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
        # try:
        #     if not scheduler.Custom_is_running:
        #         scheduler.Custom_is_running = True
        #         scheduler.start()
        #         scheduler.add_job(run_qhandler_schedule, trigger="interval", seconds=INTERVAL, max_instances=MAX_INSTANCES, id=JOB_ID, replace_existing=True, coalesce=True)
        #         scheduler.add_listener(my_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
        #         print("JOB_SCHEDULED")
        # except:
        #     pass
        QHandler.run([JoinTaskHandler, RemoveTaskHandler])
