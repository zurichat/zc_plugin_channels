from django.core.signals import request_finished
from django.dispatch import receiver


@receiver(request_finished, sender=None)
def JoinedChannelSignal(sender, instance, created, **kwargs):
    uid = kwargs.get("dispatch_uid")

    # if uid=="API-CreateUser-View": # else create a profile
    if created == True:
        try :
            Profile.objects.create(user=instance)
        except:
            instance.profile.save()
    else:
        try :
            instance.profile.save()
        except (AttributeError, Profile.DoesNotExist):
            Profile.objects.create(user=instance)
    try :
        if instance.profile:
            instance.profile.save()
    except:
        try:
            Profile.objects.create(user=instance)
        except:
            pass

