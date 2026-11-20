#from rest_framework import serializers
from adrf import serializers
from .models import *



class CustomerSerializer(serializers.ModelSerializer):
  class Meta:
    model = Customer
    fields = ['custuser', 'customertype', 'phone', 'vatnumber', 'note', 'name', 'line1', 'line2', 'city', 'county', 'country', 'postcode']


class PackageSerializer(serializers.ModelSerializer):
  class Meta:
    model = Package
    fields = ['id', 'custuser', 'puid', 'name', 'duration', 'fromdate', 'todate', 'netprice', 'discount', 'vat', 'note', 'status', 'canceldate', 'cancelfromdate']


class BusinessSerializer(serializers.ModelSerializer):
  class Meta:
    model = Business
    fields = ['custuser', 'name', 'note', 'email', 'line1', 'line2', 'city', 'county', 'country', 'postcode']


class PersonSerializer(serializers.ModelSerializer):
  class Meta:
    model = Person
    fields = ['id', 'custuser', 'name', 'note', 'email', 'line1', 'line2', 'city', 'county', 'country', 'postcode', 'file', 'type', 'size', 'filename', 'ext', 'is_approved']


