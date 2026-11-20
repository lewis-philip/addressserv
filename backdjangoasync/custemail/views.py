from rest_framework.response import Response
from rest_framework import status
from adrf.decorators import api_view
from asgiref.sync import sync_to_async
from django.core.mail import EmailMultiAlternatives
import random
import asyncio
from django.template.loader import render_to_string
from django.utils.html import strip_tags


#--------------------------------------------------------------------------------
# Declarations
#--------------------------------------------------------------------------------

emaildataobj = {
  'otp': {
    'subject': 'User identification e-mail',
    'fromemail': 'otp@domain.com',
    'replytolist': ['no_reply@domain.com']
  }
}


#--------------------------------------------------------------------------------
# Helper functions
#--------------------------------------------------------------------------------

async def aemailsend (
  fromemail,
  tolist,
  subject = None,
  bodytxt = None,
  bodyhtml = None,
  cclist = None,
  bcclist = None,
  replytolist = None,
  attachmentlist = None,
  headerdict = None,
  connection = None
):
  emailobj = EmailMultiAlternatives(
    from_email = fromemail,
    to = tolist,
    subject = subject,
    body = bodytxt,
    cc = cclist,
    bcc = bcclist,
    reply_to = replytolist,
    attachments = attachmentlist,  # [(filename, content, mimetype),...]
    headers = headerdict,  # {"Message-ID": "foo"}
    connection = connection
  )
  if bodyhtml:
    emailobj.attach_alternative(bodyhtml, 'text/html')
  await sync_to_async(emailobj.send)(fail_silently=False)
  # print('Email sent...')


#--------------------------------------------------------------------------------
# Views
#--------------------------------------------------------------------------------

@api_view(['POST'])
async def aemail(request, format=None):
  if request.method == 'POST':
    try:
      reqdata = request.data
      subject = reqdata.get('subject', '')
      bodytxt = reqdata.get('bodytxt', '')
      bodyhtml = reqdata.get('bodyhtml', '')
      fromemail = reqdata.get('fromemail', '')
      tolist = reqdata.get('tolist', [])
      cclist = reqdata.get('cclist', [])
      bcclist = reqdata.get('bcclist', [])
      replytolist = reqdata.get('replytolist', [])
      attachmentlist = reqdata.get('attachmentlist', [])
      headerdict = reqdata.get('headerdict', {})
      connection = reqdata.get('connection', '')
      if fromemail and len(tolist) > 0:
        asyncio.create_task(aemailsend(
          fromemail = fromemail,
          tolist = tolist,
          subject = subject,
          bodytxt = bodytxt,
          bodyhtml = bodyhtml,
          cclist = cclist,
          bcclist = bcclist,
          replytolist = replytolist,
          attachmentlist = attachmentlist,
          headerdict = headerdict,
          connection = connection
        ))
        return Response({'message': 'email sent'}, status=status.HTTP_200_OK)
      else:
        return Response({'message': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
      return Response({'message': str(ex)}, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
async def aotpsend(request, format=None):
  if request.method == 'POST':
    try:
      reqdata = request.data
      tolist = reqdata.get('tolist', [])
      appname = reqdata.get('appname', '')
      fromemail = emaildataobj['otp']['fromemail']
      subject = emaildataobj['otp']['subject']
      replytolist = emaildataobj['otp']['replytolist']
      otp = str(random.randint(1000, 9999))
      bodyhtml = render_to_string('otp.html', context={'otp': otp, 'appname': appname})
      bodytxt = strip_tags(bodyhtml)
      if subject and fromemail and len(tolist) > 0 and bodytxt:
        asyncio.create_task(aemailsend(
          fromemail = fromemail,
          tolist = tolist,
          subject = subject,
          bodytxt = bodytxt,
          bodyhtml = bodyhtml,
          replytolist = replytolist
        ))
        return Response({'otp': otp}, status=status.HTTP_200_OK)
      else:
        return Response({'message': 'bad request'}, status=status.HTTP_400_BAD_REQUEST)
    except Exception as ex:
      return Response({'message': str(ex)}, status=status.HTTP_400_BAD_REQUEST)

