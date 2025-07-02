from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.mail import send_mail
from django.conf import settings
from django.views.decorators.csrf import csrf_exempt
from django.utils.decorators import method_decorator
from .models import Subscriber
from .serializers import SubscriberSerializer

@method_decorator(csrf_exempt, name='dispatch')
class SubscribeView(APIView):
    def post(self, request, *args, **kwargs):
        try:
            email = request.data.get('email', '').strip().lower()
            
            if not email:
                return Response(
                    {'error': 'Email is required'},
                    status=status.HTTP_400_BAD_REQUEST
                )
            
            try:
                subscriber = Subscriber.objects.get(email=email)
                if subscriber.is_active:
                    return Response(
                        {'error': 'This email is already subscribed.'},
                        status=status.HTTP_400_BAD_REQUEST
                    )
                subscriber.is_active = True
                subscriber.save()
            except Subscriber.DoesNotExist:
                subscriber = Subscriber.objects.create(
                    email=email,
                    is_active=True
                )
            
            send_mail(
                'Subscription Confirmation',
                'Thank you for subscribing to our newsletter!',
                settings.DEFAULT_FROM_EMAIL,
                [email],
                fail_silently=False,
            )
            
            subscriber.confirmation_sent = True
            subscriber.save()
            
            return Response(
                {'message': 'Subscription successful! Check your email for confirmation.'},
                status=status.HTTP_201_CREATED
            )
            
        except Exception as e:
            return Response(
                {'error': str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )