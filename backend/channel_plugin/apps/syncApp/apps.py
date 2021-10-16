from django.apps import AppConfig
class SyncAppConfig(AppConfig):
    name = 'apps.syncApp'

    def ready(self):
        pass
