from django.urls import path
from . import views

urlpatterns = [
  path('agetdata/', views.agetdata, name='agetdata'),
  path('asetdata/', views.asetdata, name='asetdata'),
  path('asetfile/', views.asetfile, name='asetfile'),
  path('adeletefile/', views.adeletefile, name='adeletefile'),
]
