from django.apps import AppConfig


class CentriConfig(AppConfig):
    name = 'apps.centri'

    def ready(self) -> None:
        try:
            from apps.centri.signals import (
                channel_signals, 
                thread_signals, 
                message_signals, 
                central_signals,
            )
        except ImportError:
            pass

        return super().ready()
