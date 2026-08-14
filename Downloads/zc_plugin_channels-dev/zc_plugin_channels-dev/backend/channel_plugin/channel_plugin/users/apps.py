from django.apps import AppConfig
from django.utils.translation import gettext_lazy as _


class UsersConfig(AppConfig):
    name = "channel_plugin.users"
    verbose_name = _("Users")

    def ready(self):
        try:
            import channel_plugin.users.signals  # noqa F401
        except ImportError:
            pass
