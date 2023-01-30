from django.urls import path

from bus import views

urlpatterns = [
    path('', views.StopSearchView.as_view(), name='stop_search')
]
