from django.db import models
from django.conf import settings
# from courses.models import Course

class TempCourse(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField(blank=True)

    def __str__(self):
        return self.title

class Progress(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    # course = models.ForeignKey(Course, on_delete=models.CASCADE)
    course = models.ForeignKey('TempCourse', on_delete = models.CASCADE)

    percentage_completed = models.FloatField(default=0.0)  # overall completion
    assignments_completed = models.IntegerField(default=0)
    quizzes_completed = models.IntegerField(default=0)

    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'course')

    def __str__(self):
        return f"{self.student.email} - {self.course.title}"
