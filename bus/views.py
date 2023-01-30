from django.shortcuts import render
from django.views.generic import View

# Create your views here.


class StopSearchView(View):

    @staticmethod
    def get(request):
        return render(request, template_name='stop_search.html')

    @staticmethod
    def post(request):
        ...
