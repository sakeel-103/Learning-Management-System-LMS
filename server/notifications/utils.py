from .models import Notification
from .tasks import send_email_notification

def notify_user(user, message, email_subject=None, email_message=None):
    # In-app notification
    Notification.objects.create(user=user, message=message)

    # Email notification
    if email_subject and email_message:
        send_email_notification.delay(email_subject, email_message, [user.email])
