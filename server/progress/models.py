from django.db import models
from accounts.models import User
from course_class.models import Course

class Progress(models.Model):
    student = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        limit_choices_to={'user_type': User.STUDENT},
        related_name='student_progress'
    )
    course = models.ForeignKey(
        Course,
        on_delete=models.CASCADE,
        related_name='course_progress'
    )
    percentage_completed = models.DecimalField(max_digits=5, decimal_places=2)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        unique_together = ('student', 'course')
        verbose_name = "Student Progress"
        verbose_name_plural = "Student Progress"

    def __str__(self):
        return f"{self.student.email} - {self.course.title}: {self.percentage_completed}%"
