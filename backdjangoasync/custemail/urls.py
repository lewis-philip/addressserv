from django.urls import path
from . import views

urlpatterns = [
  path('aemail/', views.aemail, name='aemail'),
  path('aotpsend/', views.aotpsend, name='aotpsend'),
]
