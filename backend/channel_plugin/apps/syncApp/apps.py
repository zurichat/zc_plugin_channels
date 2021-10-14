from django.apps import AppConfig
from .jobs import scheduler,  job_function # run_qhandler_schedule

class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
        if len(scheduler.get_jobs()) < 0:
            scheduler.add_job(job_function, trigger="interval", seconds=5, max_instances=1, id="Timer")
            scheduler.start()
