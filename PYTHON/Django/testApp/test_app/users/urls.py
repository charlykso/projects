from django.urls import path
from . import views

urlpatterns = [
    path('all', views.getUsers, name='getUsers'),
    path('create', views.createUser, name='createUser'),
]
