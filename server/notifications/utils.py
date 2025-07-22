from django.core.mail import send_mail
from django.conf import settings
from .models import Notification

def notify(user, title, message, link=None):
    # In-app notification
    Notification.objects.create(
        recipient=user,
        title=title,
        message=message,
        link=link
    )

    # Email notification
    send_mail(
        subject=title,
        message=message + (f"\nLink: {link}" if link else ""),
        from_email=settings.DEFAULT_FROM_EMAIL,
        recipient_list=[user.email],
        fail_silently=True
    )
