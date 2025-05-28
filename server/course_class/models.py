from django.db import models

# Create your models here.
# course_class/models.py
from django.db import models

class Course(models.Model):
    Title = models.CharField(max_length=255)
    Category = models.CharField(max_length=100)
    Level = models.CharField(max_length=100)
    Duration = models.CharField(max_length=50)
    Instructor = models.CharField(max_length=100)
    Course_Description = models.TextField()
    

    def __str__(self):
        return self.title