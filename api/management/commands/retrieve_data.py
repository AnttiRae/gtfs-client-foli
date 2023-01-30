from django.core.management.base import BaseCommand
from api.models import Stop
import requests
import json


class Command(BaseCommand):
    help = 'Retrieve data from föli api'

    def handle(self, *args, **options):
        try:
            stops_response = requests.get('http://data.foli.fi/gtfs/v0/20230119-163758/stops')
        except ConnectionError:
            self.stdout.write(self.style.ERROR('Connection problem with retrieving data'))
        else:
            stops = json.loads(stops_response.content)
            for stop in stops.values():
                Stop.objects.get_or_create(
                    name=stop['stop_name'],
                    id=stop['stop_code']
                )
