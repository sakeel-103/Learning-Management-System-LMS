from .models import Notification
from django.core.mail import send_mail

def notify_user(user, message, email_subject=None, email_message=None):
    # In-app notification
    Notification.objects.create(user=user, message=message)

    # Direct email (synchronous)
    if email_subject and email_message:
        send_mail(
            subject=email_subject,
            message=email_message,
            from_email='prajwalbm90@gmail.com',
            recipient_list=[user.email],
            fail_silently=False
        )
