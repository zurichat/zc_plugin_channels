from django.core.signals import request_finished
from django.dispatch import receiver


@receiver(request_finished, sender=None)
def JoinedChannelSignal(sender, instance, created, **kwargs):
    uid = kwargs.get("dispatch_uid")