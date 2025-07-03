from django.db import models
from accounts.models import User  

class Certificate(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    course_name = models.CharField(max_length=255)
    issued_date = models.DateTimeField(auto_now_add=True)
    download_url = models.URLField(max_length=500, blank=True, null=True)
    verification_code = models.CharField(max_length=32, unique=True)
    is_active = models.BooleanField(default=True)

    def __str__(self):
        return f"Certificate for {self.user.email} - {self.course_name}"

    def generate_download_url(self):
        from uuid import uuid4
        if not self.download_url:
            self.download_url = f'/media/certificates/{self.user.id}_{uuid4()}.pdf'
            self.save()
        return self.download_url