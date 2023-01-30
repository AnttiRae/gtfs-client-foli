from .models import Stop, StopTimes, Trip
from rest_framework import serializers


class StopSerializer(serializers.Serializer):
    class Meta:
        model = Stop
        fields = ['name', 'id']


class StopTimesSerializer(serializers.Serializer):
    class Meta:
        model = StopTimes
        fields = ['trip_id', 'departure_time', 'stop']


class TripSerializer(serializers.Serializer):
    model = Trip
    fields = ['route_id', 'head_sign', 'direction']
