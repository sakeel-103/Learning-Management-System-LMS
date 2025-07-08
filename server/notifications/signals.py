from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from course_class.models import Course, VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial
from progress.models import Progress
from accounts.models import User
from .utils import notify_user

@receiver(post_save, sender=Course)
def course_created_or_updated(sender, instance, created, **kwargs):
    students = User.objects.filter(user_type=User.STUDENT)
    action = "created" if created else "updated"
    for student in students:
        notify_user(
            user=student,
            message=f"A course '{instance.title}' was {action}.",
            email_subject="Course Update",
            email_message=f"Hello {student.email},\n\nThe course '{instance.title}' was {action}."
        )

@receiver(post_delete, sender=Course)
def course_deleted(sender, instance, **kwargs):
    students = User.objects.filter(user_type=User.STUDENT)
    for student in students:
        notify_user(
            user=student,
            message=f"The course '{instance.title}' was deleted.",
            email_subject="Course Deleted",
            email_message=f"Hello {student.email},\n\nThe course '{instance.title}' has been removed."
        )

@receiver(post_save, sender=Progress)
def progress_updated(sender, instance, created, **kwargs):
    notify_user(
        user=instance.student,
        message=f"Your progress in '{instance.course.title}' was updated to {instance.percentage_completed}%.",
        email_subject="Progress Update",
        email_message=f"Hello {instance.student.email},\n\nYour course progress in '{instance.course.title}' is now {instance.percentage_completed}%."
    )

def material_notify(sender, instance, **kwargs):
    students = User.objects.filter(user_type=User.STUDENT)
    for student in students:
        notify_user(
            user=student,
            message=f"New {sender.__name__.replace('Material', '')} material '{instance.name}' uploaded for course '{instance.course}'.",
            email_subject="New Course Material",
            email_message=f"Hello {student.email},\n\nNew material '{instance.name}' has been added for the course '{instance.course}'."
        )

# Bind material uploads
for model in [VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial]:
    post_save.connect(material_notify, sender=model)
