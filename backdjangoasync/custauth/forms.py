from django.contrib.auth.forms import UserCreationForm, UserChangeForm
from .models import CustUser

class CustUserCreationForm(UserCreationForm):
  class Meta:
    model = CustUser
    fields = ('email',)

class CustUserChangeForm(UserChangeForm):
  class Meta:
    model = CustUser
    fields = ('email',)