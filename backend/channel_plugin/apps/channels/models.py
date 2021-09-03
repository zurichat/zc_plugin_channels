# from django.db import models

# Create your models here.
from django.db import models


class Thread(models.Model):
    id = models.BigAutoField(primary_key=True)
    mmsg = models.CharField(max_length=50, blank=False, null=False)