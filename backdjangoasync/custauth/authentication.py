from rest_framework_simplejwt.authentication import JWTAuthentication
from django.conf import settings
from rest_framework.authentication import CSRFCheck
from rest_framework import exceptions


#--------------------------------------------------------------------------------
# Helper functions
#--------------------------------------------------------------------------------

def enforce_csrf(request):  # Enforce CSRF validation
  check = CSRFCheck()
  check.process_request(request)
  reason = check.process_view(request, None, (), {})
  if reason:
    raise exceptions.PermissionDenied('CSRF Failed: %s' % reason)


#--------------------------------------------------------------------------------
# Classes
#--------------------------------------------------------------------------------

class CookieJWTAuthentication(JWTAuthentication):  # Customized authentication class
  def authenticate(self, request):
    header = self.get_header(request)
    if header:
      access_token = self.get_raw_token(header)
    else:
      access_token = request.COOKIES.get(settings.SIMPLE_JWT['ACCESS_COOKIE_KEY']) or None
    if access_token is None:
      return None
    validated_token = self.get_validated_token(access_token)
    enforce_csrf(request)
    return self.get_user(validated_token), validated_token

