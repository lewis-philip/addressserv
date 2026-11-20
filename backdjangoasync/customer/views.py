from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode
from django.conf import settings
from rest_framework.request import Request
from rest_framework.response import Response
from django.db.models import Prefetch, Q 
from .models import *
from .serializers import *
from django.utils import timezone
from datetime import date
from rest_framework import status
from adrf.decorators import api_view
from asgiref.sync import sync_to_async


#--------------------------------------------------------------------------------
# Helper function
#--------------------------------------------------------------------------------

async def asetpackagestatus(custuserid):
  try:
    custuser = await CustUser.objects.aget(id = custuserid)
  except CustUser.DoesNotExist:
    return
  # Expired
  await Package.objects.filter(custuser = custuser, status__in = ['New', 'Approved', 'Active'], cancelfromdate__isnull = True, todate__lt = date.today()).aupdate(status = "Expired")
  # Canceled
  await Package.objects.filter(custuser = custuser, status__in = ['New', 'Approved', 'Active'], cancelfromdate__isnull = False, cancelfromdate__lt = date.today()).aupdate(status = "Canceled")


async def acustomerdata(custuserid):
  if custuserid:
    await asetpackagestatus(custuserid)
    responsedata = {}
    try:
      custuser = await CustUser.objects.select_related('customer', 'business').prefetch_related(
          Prefetch('package', queryset = Package.objects.order_by('id')),
          Prefetch('person', queryset = Person.objects.order_by('id'))
        ).aget(id = custuserid)
      try:
        customer = custuser.customer
      except Exception:
        customer = None
      if customer:
        customerdata = await CustomerSerializer(customer).adata
        responsedata['customer'] = customerdata
      try:
        package = custuser.package.all()
      except Exception:
        package = None
      if package:
        packagedata = await PackageSerializer(package, many=True).adata
        responsedata['package'] = packagedata
      try:
        business = custuser.business
      except Exception:
        business = None
      if business:
        businessdata = await BusinessSerializer(business).adata
        responsedata['business'] = businessdata
      try:
        person = custuser.person.all()
      except Exception:
        person = None
      if person:
        persondata = await PersonSerializer(person, many=True).adata
        responsedata['person'] = persondata
      return {'responsedata': responsedata}
    except CustUser.DoesNotExist:
      return {'responsedata': {}}
  else:
    return {'responsedata': {}}


async def aencodeid(customerdata):
  if 'customer' in customerdata and customerdata['customer']:
    customerdata['customer']['custuser'] = urlsafe_base64_encode(str(customerdata['customer']['custuser']).encode('utf-8'))
  if 'business' in customerdata and customerdata['business']:
    customerdata['business']['custuser'] = urlsafe_base64_encode(str(customerdata['business']['custuser']).encode('utf-8'))
  if 'package' in customerdata and customerdata['package']:
    for item in customerdata['package']:
      item['custuser'] = urlsafe_base64_encode(str(item['custuser']).encode('utf-8'))
  if 'person' in customerdata and customerdata['person']:
    for item in customerdata['person']:
      item['custuser'] = urlsafe_base64_encode(str(item['custuser']).encode('utf-8'))
  return customerdata


#--------------------------------------------------------------------------------
# View
#--------------------------------------------------------------------------------

@api_view(['POST'])
async def agetdata(request, format = None):
  if request.method == 'POST':
    try:
      custuserid = int(urlsafe_base64_decode(request.data.get('custuserid', None)))
      responsedata = await acustomerdata(custuserid)
      if 'responsedata' in responsedata and responsedata['responsedata']:
        responsedata = await aencodeid(responsedata['responsedata'])
        return Response(responsedata, status = status.HTTP_200_OK)
      else:
        return Response({}, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asetdata(request, format = None):
  if request.method == 'POST':
    try:
      # Primary key consistency check
      if 'customer' not in request.data or not request.data['customer']:
        return Response({'message': '* Customer dictionary missing or empty *'}, status = status.HTTP_400_BAD_REQUEST)
      reqcustomercustuser = request.data['customer'].get('custuser', None)
      if not reqcustomercustuser:
        return Response({'message': '* Missing reqcustomercustuser *'}, status = status.HTTP_400_BAD_REQUEST)
      if 'package' in request.data and request.data['package']:
        if any(item.get('custuser', None) != reqcustomercustuser for item in request.data['package']):
          return Response({'message': '* Wrong reqpackagecustuser *'}, status = status.HTTP_400_BAD_REQUEST)
      if 'business' in request.data and request.data['business']:
        reqbusinesscustuser = request.data['business'].get('custuser', None)
        if not reqbusinesscustuser or (reqcustomercustuser and reqbusinesscustuser and reqcustomercustuser != reqbusinesscustuser):
          return Response({'message': '* Wrong reqbusinesscustuser *'}, status = status.HTTP_400_BAD_REQUEST)
      if 'person' in request.data and request.data['person']:
        if any(item.get('custuser', None) != reqcustomercustuser for item in request.data['person']):
          return Response({'message': '* Wrong reqpersoncustuser *'}, status = status.HTTP_400_BAD_REQUEST)

      reqcustuserid = int(urlsafe_base64_decode(reqcustomercustuser))
      try:
        custuser = await CustUser.objects.select_related('customer', 'business').prefetch_related(
            Prefetch('package', queryset = Package.objects.order_by('id')),
            Prefetch('person', queryset = Person.objects.order_by('id'))
          ).aget(id = reqcustuserid)
      except CustUser.DoesNotExist:
        custuser = None
      try:
        customer = custuser.customer
      except Exception:
        customer = None
      try:
        package = custuser.package.all()
      except Exception:
        package = None
      if 'package' in request.data and request.data['package'] and package:
        packageidlist = package.values_list('pk', flat = True)
        reqpackageidlist = [item.get('id', None) for item in request.data['package'] if item.get('id', None)]
        if await sync_to_async(set(reqpackageidlist).intersection)(packageidlist) != set(reqpackageidlist):
          return Response({'message': '* Wrong reqpackageid *'}, status = status.HTTP_400_BAD_REQUEST)
      try:
        business = custuser.business
      except Exception:
        business = None
      try:
        person = custuser.person.all()
      except Exception:
        person = None
      if 'person' in request.data and request.data['person'] and person:
        personidlist = person.values_list('pk', flat = True)
        reqpersonidlist = [item.get('id', None) for item in request.data['person'] if item.get('id', None)]
        if await sync_to_async(set(reqpersonidlist).intersection)(personidlist) != set(reqpersonidlist):
          return Response({'message': '* Wrong reqpersonid *'}, status = status.HTTP_400_BAD_REQUEST)

      # Customer - update
      if customer and ( \
         customer.customertype != request.data['customer'].get('customertype', None) or \
         customer.phone != request.data['customer'].get('phone', None) or \
         customer.vatnumber != request.data['customer'].get('vatnumber', None) or \
         customer.note != request.data['customer'].get('note', None) or \
         customer.name != request.data['customer'].get('name', None) or \
         customer.line1 != request.data['customer'].get('line1', None) or \
         customer.line2 != request.data['customer'].get('line2', None) or \
         customer.city != request.data['customer'].get('city', None) or \
         customer.county != request.data['customer'].get('county', None) or \
         customer.country != request.data['customer'].get('country', None) or \
         customer.postcode != request.data['customer'].get('postcode', None)):
        customer.customertype = request.data['customer'].get('customertype', None)
        customer.phone = request.data['customer'].get('phone', None)
        customer.vatnumber = request.data['customer'].get('vatnumber', None)
        customer.note = request.data['customer'].get('note', None)
        customer.name = request.data['customer'].get('name', None)
        customer.line1 = request.data['customer'].get('line1', None)
        customer.line2 = request.data['customer'].get('line2', None)
        customer.city = request.data['customer'].get('city', None)
        customer.county = request.data['customer'].get('county', None)
        customer.country = request.data['customer'].get('country', None)
        customer.postcode = request.data['customer'].get('postcode', None)
        await customer.asave()
      # Customer - insert
      elif not customer:
        customer = Customer(
          custuser = custuser,
          customertype = request.data['customer'].get('customertype', None),
          phone = request.data['customer'].get('phone', None),
          vatnumber = request.data['customer'].get('vatnumber', None),
          note = request.data['customer'].get('note', None),
          name = request.data['customer'].get('name', None),
          line1 = request.data['customer'].get('line1', None),
          line2 = request.data['customer'].get('line2', None),
          city = request.data['customer'].get('city', None),
          county = request.data['customer'].get('county', None),
          country = request.data['customer'].get('country', None),
          postcode = request.data['customer'].get('postcode', None)
        )
        await customer.asave()

      # Package - delete
      if ('package' not in request.data or not request.data['package']) and package:
        await package.filter(status = 'New').adelete()
        async for packageobj in package.filter(todate__gte = date.today(), status__in = ['Approved', 'Active'], cancelfromdate__isnull = False):
          packageobj.status = 'Canceled'
          await packageobj.asave()
          print('send message about package cancellation and possible repayment due 1')
      elif 'package' in request.data and request.data['package']:
        if package:
          # Package - delete old
          packageiddeletelist = list(set(packageidlist) - set(reqpackageidlist))
          # print(packageiddeletelist)
          await package.filter(pk__in = packageiddeletelist, status = 'New').adelete()
          async for packagedeleteobj in package.filter(pk__in = packageiddeletelist, todate__gte = date.today(), status__in = ['Approved', 'Active'], cancelfromdate__isnull = False):
            packagedeleteobj.status = 'Canceled'
            await packagedeleteobj.asave()
            print('send message about package cancellation and possible repayment due 2')
        cancellation = False
        for reqpackage in request.data['package']:
          try:
            packageobj = await package.aget(pk = reqpackage.get('id', None))
          except Exception:
            packageobj = None
          # Package - update
          if packageobj and ( \
             packageobj.puid != reqpackage.get('puid', None) or \
             packageobj.name != reqpackage.get('name', None) or \
             packageobj.duration != reqpackage.get('duration', None) or \
             packageobj.fromdate != reqpackage.get('fromdate', None) or \
             packageobj.todate != reqpackage.get('todate', None) or \
             packageobj.netprice != reqpackage.get('netprice', None) or \
             packageobj.discount != reqpackage.get('discount', None) or \
             packageobj.vat != reqpackage.get('vat', None) or \
             packageobj.note != reqpackage.get('note', None) or \
             packageobj.status != reqpackage.get('status', None) or \
             packageobj.canceldate != reqpackage.get('canceldate', None) or \
             packageobj.cancelfromdate != reqpackage.get('cancelfromdate', None)):
            if packageobj.cancelfromdate == None and reqpackage.get('cancelfromdate', None) != None:
              cancellation = True
            packageobj.puid = reqpackage.get('puid', None)
            packageobj.name = reqpackage.get('name', None)
            packageobj.duration = reqpackage.get('duration', None)
            packageobj.fromdate = reqpackage.get('fromdate', None)
            packageobj.todate = reqpackage.get('todate', None)
            packageobj.netprice = reqpackage.get('netprice', None)
            packageobj.discount = reqpackage.get('discount', None)
            packageobj.vat = reqpackage.get('vat', None)
            packageobj.note = reqpackage.get('note', None)
            packageobj.status = reqpackage.get('status', None)
            packageobj.canceldate = reqpackage.get('canceldate', None)
            packageobj.cancelfromdate = reqpackage.get('cancelfromdate', None)
            await packageobj.asave()
            if cancellation:
              print('send message about package cancellation and possible repayment due 3')
              cancellation = False
          # Package - insert
          elif not packageobj:
            packageobj = Package(
              custuser = custuser,
              puid = reqpackage.get('puid', None),
              name = reqpackage.get('name', None),
              duration = reqpackage.get('duration', None),
              fromdate = reqpackage.get('fromdate', None),
              todate = reqpackage.get('todate', None),
              netprice = reqpackage.get('netprice', None),
              discount = reqpackage.get('discount', None),
              vat = reqpackage.get('vat', None),
              note = reqpackage.get('note', None)
            )
            await packageobj.asave()
            print('send message about new package and possible invoicing due')

      # Business - delete
      if ('business' not in request.data or not request.data['business']) and business:
        await business.adelete()
      # Business - update
      elif 'business' in request.data and request.data['business'] and business and ( \
         business.name != request.data['business'].get('name', None) or \
         business.note != request.data['business'].get('note', None) or \
         business.email != request.data['business'].get('email', None) or \
         business.line1 != request.data['business'].get('line1', None) or \
         business.line2 != request.data['business'].get('line2', None) or \
         business.city != request.data['business'].get('city', None) or \
         business.county != request.data['business'].get('county', None) or \
         business.country != request.data['business'].get('country', None) or \
         business.postcode != request.data['business'].get('postcode', None)):
        business.name = request.data['business'].get('name', None)
        business.note = request.data['business'].get('note', None)
        business.email = request.data['business'].get('email', None)
        business.line1 = request.data['business'].get('line1', None)
        business.line2 = request.data['business'].get('line2', None)
        business.city = request.data['business'].get('city', None)
        business.county = request.data['business'].get('county', None)
        business.country = request.data['business'].get('country', None)
        business.postcode = request.data['business'].get('postcode', None)
        await business.asave()
      # Business - insert
      elif 'business' in request.data and request.data['business'] and not business:
        business = Business(
          custuser = custuser,
          name = request.data['business'].get('name', None),
          note = request.data['business'].get('note', None),
          email = request.data['business'].get('email', None),
          line1 = request.data['business'].get('line1', None),
          line2 = request.data['business'].get('line2', None),
          city = request.data['business'].get('city', None),
          county = request.data['business'].get('county', None),
          country = request.data['business'].get('country', None),
          postcode = request.data['business'].get('postcode', None)
        )
        await business.asave()

      # Person - delete
      if ('person' not in request.data or not request.data['person']) and person:
        await person.adelete()
      elif 'person' in request.data and request.data['person']:
        if person:
          # Person - delete old
          personiddeletelist = list(set(personidlist) - set(reqpersonidlist))
          # print(personiddeletelist)
          await person.filter(pk__in = personiddeletelist).adelete()
        for reqperson in request.data['person']:
          try:
            personobj = await person.aget(pk = reqperson.get('id', None))
          except Exception:
            personobj = None
          # Person - update
          if personobj and ( \
             personobj.name != reqperson.get('name', None) or \
             personobj.note != reqperson.get('note', None) or \
             personobj.email != reqperson.get('email', None) or \
             personobj.line1 != reqperson.get('line1', None) or \
             personobj.line2 != reqperson.get('line2', None) or \
             personobj.city != reqperson.get('city', None) or \
             personobj.county != reqperson.get('county', None) or \
             personobj.country != reqperson.get('country', None) or \
             personobj.postcode != reqperson.get('postcode', None)):
            personobj.name = reqperson.get('name', None)
            personobj.note = reqperson.get('note', None)
            personobj.email = reqperson.get('email', None)
            personobj.line1 = reqperson.get('line1', None)
            personobj.line2 = reqperson.get('line2', None)
            personobj.city = reqperson.get('city', None)
            personobj.county = reqperson.get('county', None)
            personobj.country = reqperson.get('country', None)
            personobj.postcode = reqperson.get('postcode', None)
            await personobj.asave()
          # Person - insert
          elif not personobj:
            personobj = Person(
              custuser = custuser,
              name = reqperson.get('name', None),
              note = reqperson.get('note', None),
              email = reqperson.get('email', None),
              line1 = reqperson.get('line1', None),
              line2 = reqperson.get('line2', None),
              city = reqperson.get('city', None),
              county = reqperson.get('county', None),
              country = reqperson.get('country', None),
              postcode = reqperson.get('postcode', None)
            )
            await personobj.asave()
            print('send message about new person and possible invoicing due')

      responsedata = await acustomerdata(reqcustuserid)
      if 'responsedata' in responsedata and responsedata['responsedata']:
        responsedata = await aencodeid(responsedata['responsedata'])
        return Response(responsedata, status = status.HTTP_200_OK)
      else:
        return Response({}, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def asetfile(request, format = None):
  if request.method == 'POST':
    try:
      try:
        person = await Person.objects.aget(id=int(request.data.get('id', None)))
      except Person.DoesNotExist:
        person = None
      if not person:
        return Response({'message': '* Wrong request *'}, status = status.HTTP_404_NOT_FOUND)
      person.file = request.data.get('file', None)
      person.type = request.data.get('type', None)
      person.size = int(request.data.get('size', None))
      person.filename = request.data.get('filename', None)
      person.ext = request.data.get('ext', None)
      await person.asave(update_fields=['file','type','size','filename','ext'])
      responsedata = await acustomerdata(person.custuser_id)
      if 'responsedata' in responsedata and responsedata['responsedata']:
        responsedata = await aencodeid(responsedata['responsedata'])
        return Response(responsedata, status = status.HTTP_200_OK)
      else:
        return Response({}, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def adeletefile(request, format = None):
  if request.method == 'POST':
    try:
      try:
        person = await Person.objects.aget(id=request.data.get('id', None))
      except Person.DoesNotExist:
        person = None
      if not person:
        return Response({'message': '* Wrong request *'}, status = status.HTTP_404_NOT_FOUND)
      person.file = None
      person.type = None
      person.size = None
      person.filename = None
      person.ext = None
      await person.asave(update_fields=['file','type','size','filename','ext'])
      responsedata = await acustomerdata(person.custuser_id)
      if 'responsedata' in responsedata and responsedata['responsedata']:
        responsedata = await aencodeid(responsedata['responsedata'])
        return Response(responsedata, status = status.HTTP_200_OK)
      else:
        return Response({}, status = status.HTTP_200_OK)
    except Exception as ex:
      return Response({'message': str(ex)}, status = status.HTTP_400_BAD_REQUEST)

