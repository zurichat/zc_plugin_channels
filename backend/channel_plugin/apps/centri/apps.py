from django.apps import AppConfig


class CentriConfig(AppConfig):
    name = 'apps.centri'

    def ready(self) -> None:
        from apps.centri import signals
        return super().ready()