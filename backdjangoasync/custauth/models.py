from django.db import models
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from django.utils import timezone
import os
from . import managers


class CustUser(AbstractBaseUser, PermissionsMixin):
  email = models.EmailField(max_length=255, unique=True)
  fullname = models.CharField(max_length=255, default='')
  is_loggedin = models.BooleanField(default=False)
  is_staff = models.BooleanField(default=False)
  is_active = models.BooleanField(default=True)
  date_joined = models.DateTimeField(default=timezone.now)

  # The unique identifier for the CustUser model is 'email' field
  USERNAME_FIELD = 'email'
  # Other mandatory fields
  REQUIRED_FIELDS = ['fullname']
  # All objects for the class CustUser come from CustUserManager
  objects = managers.CustUserManager()

  class Meta:
    verbose_name_plural = 'CustUsers'

  def __str__(self):
    return self.email

  def get_fullname(self):
    return self.fullname

