from rest_framework import viewsets
from .models import Stop, StopTimes, Trip
from .serializers import StopSerializer, StopTimesSerializer, TripSerializer


class StopViewSet(viewsets.ModelViewSet):
    queryset = Stop.objects.all()
    serializer_class = StopSerializer


class StopTimesViewSet(viewsets.ModelViewSet):
    queryset = StopTimes.objects.all()
    serializer_class = StopTimesSerializer


class TripViewSet(viewsets.ModelViewSet):
    queryset = Trip.objects.all()
    serializer_class = TripSerializer
