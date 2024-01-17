from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views


urlpatterns = [
    path('', views.home, name="home"),
    # path('api/login/google/', GoogleLoginView.as_view(), name='api-login-google'),
    path('logout', views.logout, name="logout"),
]
