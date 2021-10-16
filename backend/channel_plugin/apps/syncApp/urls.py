from django.urls import path
from .scheduler.schedulers import SingleJobBackgroundScheduler
from .scheduler.jobs import run_qhandler_schedule
from .scheduler.listeners import qhandler_listener
from apscheduler.events import EVENT_JOB_EXECUTED, EVENT_JOB_ERROR
from apps.syncApp.views import (
    sync_notifier
)

urlpatterns = [
    path("sync/", sync_notifier, name="sync_notifier"),
]

INTERVAL = 10
MAX_INSTANCES = 1
JOB_ID = "QHTimer"

scheduler = SingleJobBackgroundScheduler()
if not scheduler.Custom_is_running_task:
            print("ADDING JOB")
            scheduler.Custom_is_running_task = True
            scheduler.add_job(run_qhandler_schedule, trigger="interval", minutes=INTERVAL, max_instances=MAX_INSTANCES, id=JOB_ID, replace_existing=True, coalesce=True)
            scheduler.add_listener(qhandler_listener, EVENT_JOB_EXECUTED | EVENT_JOB_ERROR)
            scheduler.start()
            print("JOB_SCHEDULED")
    
