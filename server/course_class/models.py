from django.db import models

# Create your models here.
# course_class/models.py
from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    instructor = models.CharField(max_length=100)
    description = models.TextField()
    prerequisites = models.JSONField(default=list, blank=True)  # or use TextField with JSON string

    def __str__(self):
        return self.title