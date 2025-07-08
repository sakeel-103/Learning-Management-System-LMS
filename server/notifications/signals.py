from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from course_class.models import Course, VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial
from progress.models import Progress
from assessment.models import Quiz, Assignment, Exam, QuizAttempt, AssignmentSubmission, ExamAttempt
from certification.models import Certificate
from accounts.models import User
from .utils import notify_user

# Helper: Notify all students
def notify_all_students(message, email_subject=None, email_message=None):
    students = User.objects.filter(user_type=User.STUDENT)
    for student in students:
        notify_user(student, message, email_subject, email_message)

# Course Events
@receiver(post_save, sender=Course)
def course_created_or_updated(sender, instance, created, **kwargs):
    action = "created" if created else "updated"
    notify_all_students(
        f"Course '{instance.title}' was {action}.",
        email_subject="Course Update",
        email_message=f"Hi,\n\nCourse '{instance.title}' has been {action}.\n\nTrackademy"
    )

@receiver(post_delete, sender=Course)
def course_deleted(sender, instance, **kwargs):
    notify_all_students(
        f"Course '{instance.title}' was deleted.",
        email_subject="Course Deleted",
        email_message=f"Hi,\n\nCourse '{instance.title}' has been removed.\n\nTrackademy"
    )

# Material Uploads
def material_notify(sender, instance, created, **kwargs):
    if created:
        notify_all_students(
            f"New {sender.__name__.replace('Material', '')} material '{instance.name}' added to course '{instance.course}'.",
            email_subject="New Course Material",
            email_message=f"Hi,\n\nNew material '{instance.name}' was added to the course '{instance.course}'.\n\nTrackademy"
        )

for material in [VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial]:
    post_save.connect(material_notify, sender=material)

# Progress Update
@receiver(post_save, sender=Progress)
def progress_updated(sender, instance, **kwargs):
    notify_user(
        instance.student,
        f"Your progress in '{instance.course.title}' is now {instance.percentage_completed}%.",
        email_subject="Progress Updated",
        email_message=f"Hi {instance.student.first_name},\n\nYour progress in '{instance.course.title}' is {instance.percentage_completed}%.\n\nTrackademy"
    )

# Quiz Scheduled or Attempted
@receiver(post_save, sender=Quiz)
def quiz_created(sender, instance, created, **kwargs):
    if created:
        notify_all_students(
            f"A new quiz '{instance.title}' has been scheduled.",
            email_subject="Quiz Scheduled",
            email_message=f"Hi,\n\nA quiz titled '{instance.title}' has been scheduled for the course '{instance.course}'.\n\nTrackademy"
        )

@receiver(post_save, sender=QuizAttempt)
def quiz_submitted(sender, instance, created, **kwargs):
    if instance.completed_at:
        notify_user(
            instance.user,
            f"Your quiz attempt for '{instance.quiz.title}' has been graded. Score: {instance.score:.2f}%",
            email_subject="Quiz Graded",
            email_message=f"Hi,\n\nYou have completed the quiz '{instance.quiz.title}' with a score of {instance.score:.2f}%.\n\nTrackademy"
        )

# Assignment Submitted
@receiver(post_save, sender=AssignmentSubmission)
def assignment_submitted(sender, instance, created, **kwargs):
    if created:
        notify_user(
            instance.user,
            f"Assignment '{instance.assignment.title}' submitted successfully.",
            email_subject="Assignment Submitted",
            email_message=f"Hi,\n\nYou have successfully submitted the assignment '{instance.assignment.title}'.\n\nTrackademy"
        )

# Exam Scheduled or Attempted
@receiver(post_save, sender=Exam)
def exam_created(sender, instance, created, **kwargs):
    if created:
        notify_all_students(
            f"A new exam '{instance.title}' has been scheduled.",
            email_subject="Exam Scheduled",
            email_message=f"Hi,\n\nA new exam '{instance.title}' has been added to the course '{instance.course}'.\n\nTrackademy"
        )

@receiver(post_save, sender=ExamAttempt)
def exam_submitted(sender, instance, **kwargs):
    if instance.completed_at:
        notify_user(
            instance.user,
            f"Your exam attempt for '{instance.exam.title}' has been recorded.",
            email_subject="Exam Attempt Submitted",
            email_message=f"Hi,\n\nYou have completed the exam '{instance.exam.title}'. Check your dashboard for results.\n\nTrackademy"
        )

# Certificate Issued
@receiver(post_save, sender=Certificate)
def certificate_issued(sender, instance, created, **kwargs):
    if created:
        notify_user(
            instance.user,
            f"You have been issued a certificate for '{instance.course_name}'.",
            email_subject="Certificate Issued",
            email_message=f"Hi,\n\nCongratulations! You’ve received a certificate for completing the course '{instance.course_name}'.\n\nTrackademy"
        )
