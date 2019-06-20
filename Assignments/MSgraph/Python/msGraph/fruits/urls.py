from django.urls import path

from . import views

urlpatterns = [
  # /fruits
  path('', views.home, name='home'),
  path('signin', views.sign_in, name='signin'),
  path('callback', views.callback, name='callback'),
  path('signout', views.sign_out, name='signout'),
  path('list', views.list, name='list'),
]