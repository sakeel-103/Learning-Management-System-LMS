from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    instructor = models.CharField(max_length=100)
    course_description = models.TextField()
    schedule_type = models.CharField(max_length=20, default='Live')
    start_date = models.DateField(null=True, blank=True)
    end_date = models.DateField(null=True, blank=True)
    sessions = models.CharField(max_length=100, blank=True)
    prerequisites = models.JSONField(default=list, blank=True)

    def __str__(self):
        return self.title

class CourseMaterial(models.Model):
    course = models.ForeignKey(Course, related_name='materials', on_delete=models.CASCADE)
    file = models.FileField(upload_to='course_materials/')
    file_type = models.CharField(max_length=50)  # 'video', 'pdf', etc.
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.file_type} for {self.course.title}"