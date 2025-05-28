from django.db import models

class Course(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    instructor = models.CharField(max_length=100)
    course_description = models.TextField()

    def __str__(self):
        return self.title
