from django.urls import path
from . import views

urlpatterns = [
    path('all', views.getPosts, name='getPosts'),
    path('create', views.createPost, name='createPost'),
]