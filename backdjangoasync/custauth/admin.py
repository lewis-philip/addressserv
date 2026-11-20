from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .forms import CustUserCreationForm, CustUserChangeForm
from .models import *

class CustUserAdmin(UserAdmin):
  model = CustUser
  add_form = CustUserCreationForm
  form = CustUserChangeForm
  list_display = ('email', 'fullname', 'is_loggedin', 'is_staff', 'is_active', 'id',)
  list_filter = ('email', 'fullname', 'is_loggedin', 'is_staff', 'is_active', 'id',)
  fieldsets = (
    (None,
     {'fields': ('email', 'fullname', 'password')}
    ),
    ('Permissions',
     {'fields': ('is_staff', 'is_active', 'groups', 'user_permissions')}
    ),
  )
  add_fieldsets = (
    (None,
     {'classes': ('wide',),
      'fields': ('email', 'fullname', 'password1', 'password2', 'is_staff', 'is_active', 'groups', 'user_permissions')}
    ),
  )
  search_fields = ('email',)
  ordering = ('email',)

admin.site.register(CustUser, CustUserAdmin)


