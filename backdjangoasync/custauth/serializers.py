#from rest_framework import serializers
from adrf import serializers
from django.contrib.auth.models import Group
from . import models


class GroupSerializer(serializers.ModelSerializer):
  class Meta:
    model = Group
    fields = ['name']


class CustUserSerializer(serializers.ModelSerializer):
  groups = GroupSerializer(many=True)

  class Meta:
    model = models.CustUser
    fields = ['id','email','fullname','groups','is_loggedin','is_staff','is_active']

