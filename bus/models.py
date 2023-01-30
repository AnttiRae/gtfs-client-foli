from django.db import models

# Create your models here.


# pysäkki
class Stop(models.Model):
    name = models.CharField(max_length=100, default='')


# aikataulu
class StopTimes(models.Model):
    trip_id = models.CharField(max_length=100, default='')
    departure_time = models.TimeField()
    stop = models.ForeignKey(Stop, related_name='stop_times', on_delete=models.CASCADE)


# linja
class Trip(models.Model):
    route_id = models.IntegerField()
    head_sign = models.CharField(max_length=100, default='')
    direction = models.IntegerField()
