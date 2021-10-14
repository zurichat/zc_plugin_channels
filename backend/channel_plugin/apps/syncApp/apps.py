from django.apps import AppConfig
from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.jobstores.memory import MemoryJobStore
from .jobs import job_function , run_qhandler_schedule

scheduler = BackgroundScheduler()
INTERVAL = 10
MAX_INSTANCES = 1
JOB_ID = "QH-Timer"

class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
        try:
            if len(scheduler.get_jobs()) <= 0:
                scheduler.add_job(run_qhandler_schedule, trigger="interval", minutes=INTERVAL, max_instances=MAX_INSTANCES, id=JOB_ID)
                scheduler.start()
        except:
            pass
