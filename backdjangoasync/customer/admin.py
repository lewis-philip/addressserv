from django.contrib import admin
from .models import *


class CustomerAdmin(admin.ModelAdmin):
  model = Customer
  list_display = ('name', 'custuser', 'customertype', 'phone', 'vatnumber', 'note', 'line1', 'line2', 'city', 'county', 'country', 'postcode', 'created', 'modified',)
  list_filter = ('name', 'custuser', 'customertype',)
  search_fields = ('name',)
  ordering = ('name',)

admin.site.register(Customer, CustomerAdmin)


class PackageAdmin(admin.ModelAdmin):
  model = Package
  list_display = ('custuser', 'puid', 'name', 'duration', 'fromdate', 'todate', 'netprice', 'discount', 'vat', 'note', 'status', 'canceldate', 'cancelfromdate', 'created', 'modified', 'id',)
  list_filter = ('custuser', 'puid', 'name', 'fromdate', 'todate', 'id',)
  search_fields = ('custuser',)
  ordering = ('custuser',)

admin.site.register(Package, PackageAdmin)


class BusinessAdmin(admin.ModelAdmin):
  model = Business
  list_display = ('name', 'custuser', 'note', 'email', 'line1', 'line2', 'city', 'county', 'country', 'postcode', 'created', 'modified',)
  list_filter = ('name', 'custuser', 'note', 'email', 'postcode',)
  search_fields = ('name',)
  ordering = ('name',)

admin.site.register(Business, BusinessAdmin)


class PersonAdmin(admin.ModelAdmin):
  model = Person
  list_display = ('name', 'custuser', 'note', 'email', 'line1', 'line2', 'city', 'county', 'country', 'postcode', 'file', 'type', 'size', 'filename', 'ext', 'is_approved', 'created', 'modified', 'id',)
  list_filter = ('name', 'custuser', 'note', 'email', 'postcode', 'id',)
  search_fields = ('name',)
  ordering = ('name',)

admin.site.register(Person, PersonAdmin)


