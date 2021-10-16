from django.apps import AppConfig
import threading
from apps.syncApp.jobs import run_qhandler_schedule


class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
        try:
            th = threading.Thread(target=run_qhandler_schedule)
            th.start()
        except:
            pass
        