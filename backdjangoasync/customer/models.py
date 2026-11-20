from django.db import models
from custauth.models import CustUser
from datetime import date
from dateutil.relativedelta import relativedelta
from django.utils import timezone
import os


#--------------------------------------------------------------------------------
# Helper function
#--------------------------------------------------------------------------------

def get_todate():
  return date.today() + relativedelta(months=1)

def get_uploadto_personid(instance, filename):
  return os.path.join('image', 'file', 'pid', str(instance.pk), timezone.now().strftime('%Y%m%d_%H%M%S_%f.') + str(instance.ext))
# def get_upload_path(instance, filename):
#   return os.path.join('image', 'file', 'person' + str(instance.pk), timezone.now().strftime('%Y%m%d_%H%M%S_%f.') + str(instance.ext))
# def get_upload_path(instance, filename):
#   return os.path.join('image', 'accountphoto', str(CustUser.objects.get(email=instance.email).pk), filename)


#--------------------------------------------------------------------------------
# Model
#--------------------------------------------------------------------------------

class Customer(models.Model):
  customertypechoices = [
    ('Business', 'Business'),
    ('Personal', 'Personal')
  ]

  custuser = models.OneToOneField(CustUser, primary_key=True, on_delete=models.CASCADE, related_name='customer', db_column='custuser_id')
  customertype = models.CharField(max_length=200, choices=customertypechoices)
  phone = models.CharField(max_length=200, blank=True, null=True)
  vatnumber = models.CharField(max_length=200, blank=True, null=True)
  note = models.CharField(max_length=400, blank=True, null=True)
  name = models.CharField(max_length=200)
  line1 = models.CharField(max_length=200)
  line2 = models.CharField(max_length=200, blank=True, null=True)
  city = models.CharField(max_length=100)
  county = models.CharField(max_length=100, blank=True, null=True)
  country = models.CharField(max_length=100)
  postcode = models.CharField(max_length=100)
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name_plural = 'Customers'

  def __str__(self):
    return self.name


class Package(models.Model):
  statuschoices = [
    ('New', 'New'),
    ('Approved', 'Approved'),  # Approved = Invoiced
    ('Active', 'Active'),      # Active = Paid
    ('Expired', 'Expired'),
    ('Canceled', 'Canceled'),
    ('Repaid', 'Repaid')
  ]

  custuser = models.ForeignKey(CustUser, on_delete=models.CASCADE, related_name='package', db_column='custuser_id')
  puid = models.IntegerField(default=0)
  name = models.CharField(max_length=200)
  duration = models.IntegerField(default=0)
  fromdate = models.DateField(default=date.today)
  todate = models.DateField(default=get_todate)
  netprice = models.DecimalField(max_digits=8, decimal_places=2)
  discount = models.DecimalField(max_digits=3, decimal_places=2)
  vat = models.DecimalField(max_digits=3, decimal_places=2)
  note = models.CharField(max_length=400, blank=True, null=True)
  status = models.CharField(max_length=200, choices=statuschoices, default='New')
  canceldate = models.DateField(blank=True, null=True)
  cancelfromdate = models.DateField(blank=True, null=True)
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name_plural = 'Packages'

  def __str__(self):
    return self.name


class Business(models.Model):
  custuser = models.OneToOneField(CustUser, primary_key=True, on_delete=models.CASCADE, related_name='business', db_column='custuser_id')
  name = models.CharField(max_length=200)
  note = models.CharField(max_length=400, blank=True, null=True)
  email = models.CharField(max_length=100)
  line1 = models.CharField(max_length=200)
  line2 = models.CharField(max_length=200, blank=True, null=True)
  city = models.CharField(max_length=100)
  county = models.CharField(max_length=100, blank=True, null=True)
  country = models.CharField(max_length=100)
  postcode = models.CharField(max_length=100)
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name_plural = 'Businesses'

  def __str__(self):
    return self.name


class Person(models.Model):
  custuser = models.ForeignKey(CustUser, on_delete=models.CASCADE, related_name='person', db_column='custuser_id')
  name = models.CharField(max_length=200)
  note = models.CharField(max_length=400, blank=True, null=True)
  email = models.CharField(max_length=100)
  line1 = models.CharField(max_length=200)
  line2 = models.CharField(max_length=200, blank=True, null=True)
  city = models.CharField(max_length=100)
  county = models.CharField(max_length=100, blank=True, null=True)
  country = models.CharField(max_length=100)
  postcode = models.CharField(max_length=100)
  file = models.FileField(upload_to=get_uploadto_personid, blank=True, null=True)
  type = models.CharField(max_length=20, blank=True, null=True)
  size = models.BigIntegerField(blank=True, null=True)
  filename = models.CharField(max_length=200, blank=True, null=True)
  ext = models.CharField(max_length=20, blank=True, null=True)
  is_approved = models.BooleanField(default=False)
  created = models.DateTimeField(auto_now_add=True)
  modified = models.DateTimeField(auto_now=True)

  class Meta:
    verbose_name_plural = 'Persons'

  def __str__(self):
    return self.name


