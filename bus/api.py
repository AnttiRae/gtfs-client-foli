class APIWorker:

    def get_stop_info(self, stop_id: int):
        print('JAU')

    def get_stop_times_by_stop_id(self, stop_id: int):
        ...

    def get_stop_route_by_trip_id(self, trip_id: str):
        ...

    def get_route_by_route_id(self, route_id: int):
        ...

    def send_request(self, request: str):
        function = getattr(self, request)
        function()

