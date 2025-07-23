from django.db.models.signals import post_save, post_delete
from django.dispatch import receiver
from accounts.models import User
from course_class.models import Course, CourseMaterial
from assessment.models import AssignmentSubmission, Certificate, QuizAttempt, Assignment, Quiz
from .utils import notify
from progress.models import VideoProgress
from django.db.models import F
from notifications.models import Notification


@receiver(post_save, sender=User)
def notify_admin_on_instructor_request(sender, instance, created, **kwargs):
    if created and str(instance.user_type) == str(User.INSTRUCTOR) and not instance.has_access:
        admin = User.objects.filter(user_type=User.ADMIN).first()
        if admin:
            notify(
                user=admin,
                title="Instructor Access Request",
                message=f"{instance.email} has requested instructor access.",
                link=f"/admin/accounts/user/{instance.id}/change/"
            )

@receiver(post_save, sender=User)
def notify_instructor_on_approval(sender, instance, **kwargs):
    if str(instance.user_type) == str(User.INSTRUCTOR) and instance.has_access:
        notify(
            user=instance,
            title="Access Granted",
            message="Your instructor account has been approved by admin."
        )

@receiver(post_save, sender=Course)
def notify_users_on_course_creation(sender, instance, created, **kwargs):
    if created:
        print("Signal Triggered: Course Created -", instance.title)
        users = User.objects.exclude(user_type=User.ADMIN)  
        for user in users:
            notify(
                user=user,
                title="New Course Available",
                message=f"A new course titled '{instance.title}' has been added.",
                link=f"/courses/{instance.id}"
            )

@receiver(post_delete, sender=Course)
def notify_on_course_deletion(sender, instance, **kwargs):
    try:
        # Notify everyone except Admin (user_type = 3)
        users = User.objects.exclude(user_type=User.ADMIN)
        for user in users:
            notify(
                user=user,
                title="Course Removed",
                message=f"The course '{instance.title}' has been removed from the system.",
                link="/courses"
            )
    except Exception as e:
        print("Course Deletion Notification Error:", e)


@receiver(post_save, sender=Assignment)
def notify_students_on_assignment_creation(sender, instance, created, **kwargs):
    if not created:
        return
    course = instance.course
    try:
        students = User.objects.filter(user_type=User.STUDENT)
        for student in students:
            notify(
                user=student,
                title="New Assignment Posted",
                message=f"A new assignment '{instance.title}' has been added in course '{course.title}'.",
                link=f"/courses/{course.id}/assignments"
            )
    except Exception as e:
        print("Assignment Notification Error:", e)


@receiver(post_save, sender=Quiz)
def notify_students_on_quiz_creation(sender, instance, created, **kwargs):
    if not created:
        return
    course = instance.course
    try:
        students = User.objects.filter(user_type=User.STUDENT)
        for student in students:
            notify(
                user=student,
                title="New Quiz Posted",
                message=f"A new quiz '{instance.title}' has been added in course '{course.title}'",
                link=f"/courses/{course.id}/assignments"
            )
    except Exception as e:
        print("Assignment Notification Error:", e)

@receiver(post_save, sender=QuizAttempt)
def notify_student_on_quiz_pass(sender, instance, **kwargs):
    if instance.completed_at and instance.is_passed:
        notify(
            user=instance.user,
            title="Quiz Score",
            message=f"Congratulations! You completed the quiz '{instance.quiz.title}' with a score of {instance.score}%."
        )

@receiver(post_save, sender=CourseMaterial)
def notify_students_on_material_upload(sender, instance, created, **kwargs):
    if created:
        try:
            course_title = instance.course.title
            material_name = instance.name

            students = User.objects.filter(user_type=User.STUDENT)

            for student in students:
                notify(
                    user=student,
                    title="New Material Uploaded",
                    message=f"'{material_name}' has been added to the course '{course_title}'.",
                    link=f"/courses/{instance.course.id}"
                )
        except Exception as e:
            print("Error sending material upload notification:", e)

@receiver(post_delete, sender=CourseMaterial)
def notify_students_on_material_deletion(sender, instance, **kwargs):
    try:
        course_title = instance.course.title
        material_name = instance.name
        users = User.objects.filter(user_type=User.STUDENT)

        for user in users:
            notify(
                user=user,
                title="Material removed",
                message=f"'{material_name}' has been removed from the course '{course_title}'.",
                link=f"/courses"
            )
    except Exception as e:
        print("Material Deletion Notification Error:", e)

@receiver(post_save, sender=VideoProgress)
def notify_student_on_course_completion(sender, instance, **kwargs):
    student = instance.student
    video = instance.video
    course = video.course

    if str(student.user_type) != str(User.STUDENT):
        return

    all_videos = CourseMaterial.objects.filter(course=course, material_type='video').only('id', 'name', 'material_type')
    total_videos = all_videos.count()

    if total_videos == 0:
        return

    # Filter videos with at least 95% watched
    completed_videos = VideoProgress.objects.filter(
        student=student,
        video__in=all_videos,
        video_duration__gt=0,  # Avoid division by 0 or 0-duration videos
        watched_seconds__gte=F('video_duration') * 0.95
    ).values_list('video_id', flat=True).distinct().count()

    # Only send notification if ALL videos are completed (>= 95%)
    if completed_videos == total_videos:
        already_sent = Notification.objects.filter(
            recipient=student,
            title__icontains="Course Completed",
            message__icontains=course.title
        ).exists()
        if not already_sent:
            notify(
                user=student,
                title="Course Completed 🎉",
                message=f"You've completed 100% of the course '{course.title}'. Congratulations!",
                link=f"/courses/{course.id}"
            )