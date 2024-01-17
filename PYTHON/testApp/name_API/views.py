from django.shortcuts import render, redirect
from rest_framework import viewsets
from .serializers import MyModelSerializer
from .models import User
from rest_framework.response import Response
from django.contrib.auth import logout


def home(request):
    print("This is good")
    print(request)
    

def logout(request):
    logout(request)

