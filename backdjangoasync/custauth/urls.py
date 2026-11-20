from django.urls import path
from rest_framework_simplejwt.views import (TokenObtainPairView, TokenRefreshView, TokenVerifyView)
from . import views
from asgiref.sync import sync_to_async


urlpatterns = [
  # path('token/', sync_to_async(TokenObtainPairView.as_view()), name='token_obtain_pair'),
  # path('token/refresh/', sync_to_async(TokenRefreshView.as_view()), name='token_refresh'),
  # path('token/verify/', sync_to_async(TokenVerifyView.as_view()), name='token_verify'),
  # path('cookietoken/', sync_to_async(views.CookieTokenObtainPairView.as_view()), name='cookie_token_obtain_pair'),
  path('cookietoken/refresh/', sync_to_async(views.CookieTokenRefreshView.as_view()), name='cookie_token_refresh'),

  path('aregister/', views.aregister, name='aregister'),
  path('asignin/', views.asignin, name='asignin'),
  path('asignout/', views.asignout, name='asignout'),
  path('asetpass/', views.asetpass, name='asetpass'),
  path('asetdata/', views.asetdata, name='asetdata'),
  path('agetdata/', views.agetdata, name='agetdata'),
  path('asetdata/', views.asetdata, name='asetdata'),
]