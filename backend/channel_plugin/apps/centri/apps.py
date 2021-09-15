from django.apps import AppConfig


class CentriConfig(AppConfig):
    name = 'apps.centri'

    def ready(self) -> None:
        try:
            import apps.centri.signals
        except ImportError:
            pass

        return super().ready()
