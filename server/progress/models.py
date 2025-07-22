from django.db import models
from django.conf import settings
from course_class.models import CourseMaterial

class VideoProgress(models.Model):
    student = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    video = models.ForeignKey(CourseMaterial, on_delete=models.CASCADE)
    watched_seconds = models.FloatField(default=0)
    video_duration = models.FloatField(default=0)
    updated_at = models.DateTimeField(auto_now=True)


    class Meta:
        unique_together = ('student', 'video')

    def __str__(self):
        return f"{self.student.email} - {self.video.name} - {self.watched_seconds}s"
