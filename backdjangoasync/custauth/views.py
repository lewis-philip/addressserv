from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework_simplejwt.tokens import RefreshToken
from .models import *
from .serializers import *
from django.utils import timezone
from rest_framework import status
from adrf.decorators import api_view
from asgiref.sync import sync_to_async


#--------------------------------------------------------------------------------
# Helper function
#--------------------------------------------------------------------------------

async def auserdata(id):
  if id:
    try:
      user = await CustUser.objects.aget(id = id)
    except CustUser.DoesNotExist:
      user = None
    if user and user.is_active:
      userdata = await CustUserSerializer(user).adata
      userdata['groups'] = [x['name'] for x in userdata['groups']]
      return {'userdata': userdata}
    else:
      return {'userdata': {}}
  else:
    return {'userdata': {}}


#--------------------------------------------------------------------------------
# View
#--------------------------------------------------------------------------------

# class CookieTokenObtainPairView(TokenObtainPairView):
#   def post(self, request: Request, *args, **kwargs) -> Response:
#     response = super().post(request, *args, **kwargs)
#     # print(response.data)
#     access_token = response.data["access"]
#     response.set_cookie(
#       key=settings.SIMPLE_JWT["ACCESS_COOKIE_KEY"],
#       value=access_token,
#       domain=settings.SIMPLE_JWT["ACCESS_COOKIE_DOMAIN"],
#       path=settings.SIMPLE_JWT["ACCESS_COOKIE_PATH"],
#       expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
#       secure=settings.SIMPLE_JWT["ACCESS_COOKIE_SECURE"],
#       httponly=settings.SIMPLE_JWT["ACCESS_COOKIE_HTTP_ONLY"],
#       samesite=settings.SIMPLE_JWT["ACCESS_COOKIE_SAMESITE"],
#     )
#     response.data = {"refresh_token": response.data["refresh"]}
#     # print(response.data)
#     return response


class CookieTokenRefreshView(TokenRefreshView):
  def post(self, request: Request, *args, **kwargs) -> Response:
    response = super().post(request, *args, **kwargs)
    # print(response.data)
    access_token = response.data["access"]
    response.set_cookie(
      key=settings.SIMPLE_JWT["ACCESS_COOKIE_KEY"],
      value=access_token,
      domain=settings.SIMPLE_JWT["ACCESS_COOKIE_DOMAIN"],
      path=settings.SIMPLE_JWT["ACCESS_COOKIE_PATH"],
      expires=settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
      secure=settings.SIMPLE_JWT["ACCESS_COOKIE_SECURE"],
      httponly=settings.SIMPLE_JWT["ACCESS_COOKIE_HTTP_ONLY"],
      samesite=settings.SIMPLE_JWT["ACCESS_COOKIE_SAMESITE"],
    )
    response.data = {"message": "access_token returned as cookie"}
    # print(response.data)
    return response


@api_view(['POST'])
async def aregister(request, format = None):
  if request.method == 'POST':
    try:
      email = request.data.get('email', None)
      password = request.data.get('password', None)
      fullname = request.data.get('fullname', None)
      if email and password and fullname:
        try:
          user = await CustUser.objects.aget(email = email)
          return Response({'message': 'exists'}, status = status.HTTP_409_CONFLICT)
        except CustUser.DoesNotExist:
          user = await sync_to_async(CustUser.objects.create_user)(email = email, password=password, fullname=fullname)
          await user.asave()
          group = await Group.objects.aget(name='customer')
          await sync_to_async(user.groups.add)(group)
          return Response({'message': 'created'}, status = status.HTTP_200_OK)
      else:
        return Response({'message': 'bad request'}, status = status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asetpass(request, format = None):
  if request.method == 'POST':
    try:
      email = request.data.get('email', None)
      password = request.data.get('password', None)
      if email and password:
        try:
          user = await CustUser.objects.aget(email = email)
        except CustUser.DoesNotExist:
          user = None
        if user and user.is_active:
          await sync_to_async(user.set_password)(password)
          await user.asave()
          if sync_to_async(user.check_password)(password):
            return Response({'message': 'password changed'}, status = status.HTTP_200_OK)
          else:
            return Response({'message': 'wrong credentials'}, status = status.HTTP_404_NOT_FOUND)
        else:
          return Response({'message': 'wrong credentials'}, status = status.HTTP_404_NOT_FOUND)
      else:
        return Response({'message': 'bad request'}, status = status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asignin(request, format = None):
  if request.method == 'POST':
    try:
      email = request.data.get('email', None)
      password = request.data.get('password', None)
      if email and password:
        try:
          user = await CustUser.objects.aget(email = email)
        except CustUser.DoesNotExist:
          user = None
        if user and await sync_to_async(user.check_password)(password) and user.is_active:
          user.is_loggedin = True
          user.last_login = timezone.now()
          await user.asave(update_fields=['is_loggedin','last_login'])
          refresh = await sync_to_async(RefreshToken.for_user)(user)
          refresh_token = str(refresh)
          access_token = str(refresh.access_token)
          userdata = await auserdata(user.pk)
          if 'userdata' in userdata and userdata['userdata'] and 'id' in userdata['userdata'] and userdata['userdata']['id']:
            # print(userdata['userdata']['id'])
            userdata['userdata']['id'] = urlsafe_base64_encode(str(userdata['userdata']['id']).encode('utf-8'))
          userdata['refresh_token'] = refresh_token
          response = Response(userdata, status = status.HTTP_200_OK)
          response.set_cookie(
            key = settings.SIMPLE_JWT["ACCESS_COOKIE_KEY"],
            value = access_token,
            domain = settings.SIMPLE_JWT["ACCESS_COOKIE_DOMAIN"],
            path = settings.SIMPLE_JWT["ACCESS_COOKIE_PATH"],
            expires = settings.SIMPLE_JWT["ACCESS_TOKEN_LIFETIME"],
            secure = settings.SIMPLE_JWT["ACCESS_COOKIE_SECURE"],
            httponly = settings.SIMPLE_JWT["ACCESS_COOKIE_HTTP_ONLY"],
            samesite = settings.SIMPLE_JWT["ACCESS_COOKIE_SAMESITE"],
          )
          # print(response.data)
          return response
        else:
          return Response({'message': 'wrong credentials'}, status = status.HTTP_404_NOT_FOUND)
      else:
        return Response({'message': 'bad request'}, status = status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asignout(request, format = None):
  if request.method == 'POST':
    try:
      id = int(urlsafe_base64_decode(request.data.get('id', None)))
      if id:
        try:
          user = await CustUser.objects.aget(id = id)
        except CustUser.DoesNotExist:
          user = None
      if user:
        user.is_loggedin = False
        await user.asave(update_fields = ['is_loggedin'])
        return Response({'message': 'logged out'}, status = status.HTTP_200_OK)
      else:
        return Response({'message': 'wrong credentials'}, status = status.HTTP_404_NOT_FOUND)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def agetdata(request, format = None):
  if request.method == 'POST':
    try:
      id = int(urlsafe_base64_decode(request.data.get('id', None)))
      userdata = await auserdata(id)
      if 'userdata' in userdata and userdata['userdata'] and 'id' in userdata['userdata'] and userdata['userdata']['id']:
        userdata['userdata']['id'] = urlsafe_base64_encode(str(userdata['userdata']['id']).encode('utf-8'))
      return Response(userdata, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asetdata(request, format = None):
  if request.method == 'POST':
    try:
      id = int(urlsafe_base64_decode(request.data.get('id', None)))
      try:
        user = await CustUser.objects.aget(pk = id)
      except CustUser.DoesNotExist:
        user = None
      if not user:
        return Response({'message': 'user not found'}, status = status.HTTP_404_NOT_FOUND)
      elif user and ( \
           user.fullname != request.data.get('fullname', None) or \
           user.is_active != request.data.get('is_active', None)):
        user.fullname = request.data.get('fullname', None)
        user.is_active = request.data.get('is_active', None)
        await user.asave(update_fields=['fullname', 'is_active'])
      userdata = await auserdata(user.pk)
      if 'userdata' in userdata and userdata['userdata'] and 'id' in userdata['userdata'] and userdata['userdata']['id']:
        userdata['userdata']['id'] = urlsafe_base64_encode(str(userdata['userdata']['id']).encode('utf-8'))
      return Response(userdata, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


