from django.db import models
from django.contrib.auth import get_user_model
from course_class.models import Course
import uuid
import qrcode
from io import BytesIO
from django.core.files.base import ContentFile
from PIL import Image
from collections import defaultdict

User = get_user_model()

class Quiz(models.Model):
    QUIZ_TYPES = [
        ('mcq', 'Multiple Choice'),
        ('true_false', 'True/False'),
        ('fill_blank', 'Fill in the Blank'),
        ('essay', 'Essay'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')
    quiz_type = models.CharField(max_length=20, choices=QUIZ_TYPES, default='mcq')
    time_limit = models.IntegerField(help_text="Time limit in minutes", default=30)
    passing_score = models.IntegerField(help_text="Minimum score to pass (percentage)", default=70)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    start_time = models.DateTimeField(null=True, blank=True)
    end_time = models.DateTimeField(null=True, blank=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.course.title}"

class Question(models.Model):
    QUESTION_TYPES = [
        ('mcq', 'Multiple Choice'),
        ('true_false', 'True/False'),
        ('fill_blank', 'Fill in the Blank'),
        ('essay', 'Essay'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    question_type = models.CharField(max_length=20, choices=QUESTION_TYPES, default='mcq')
    points = models.IntegerField(default=1)
    order = models.IntegerField(default=0)
    is_required = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    
    class Meta:
        ordering = ['order', 'created_at']
    
    def __str__(self):
        return f"{self.question_text[:50]}..."

class Choice(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    question = models.ForeignKey(Question, on_delete=models.CASCADE, related_name='choices')
    choice_text = models.CharField(max_length=500)
    is_correct = models.BooleanField(default=False)
    order = models.IntegerField(default=0)
    
    class Meta:
        ordering = ['order']
    
    def __str__(self):
        return f"{self.choice_text[:30]}..."

class Assignment(models.Model):
    ASSIGNMENT_TYPES = [
        ('individual', 'Individual'),
        ('group', 'Group'),
        ('peer_review', 'Peer Review'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments', null=True, blank=True)
    assignment_type = models.CharField(max_length=20, choices=ASSIGNMENT_TYPES, default='individual')
    due_date = models.DateTimeField()
    max_points = models.IntegerField(default=100)
    instructions = models.TextField(blank=True)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    assignment_file = models.FileField(upload_to='assignment_files/', blank=True, null=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.course.title if self.course else 'No Course'}"

class Exam(models.Model):
    EXAM_TYPES = [
        ('midterm', 'Midterm'),
        ('final', 'Final'),
        ('practice', 'Practice'),
        ('certification', 'Certification'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=200)
    description = models.TextField()
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='exams')
    exam_type = models.CharField(max_length=20, choices=EXAM_TYPES, default='practice')
    time_limit = models.IntegerField(help_text="Time limit in minutes", default=60)
    passing_score = models.IntegerField(help_text="Minimum score to pass (percentage)", default=70)
    start_date = models.DateTimeField()
    end_date = models.DateTimeField()
    is_proctored = models.BooleanField(default=False)
    allow_retakes = models.BooleanField(default=False)
    max_attempts = models.IntegerField(default=1)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    class Meta:
        ordering = ['-created_at']
    
    def __str__(self):
        return f"{self.title} - {self.course.title}"

class QuizAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE,null=True, blank=True)
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    is_passed = models.BooleanField(default=False)
    time_taken = models.IntegerField(help_text="Time taken in seconds", null=True, blank=True)
    
    class Meta:
        # unique_together = ['user', 'quiz']
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.user.email if self.user else 'Anonymous'} - {self.quiz.title}"

class QuizResponse(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    attempt = models.ForeignKey(QuizAttempt, on_delete=models.CASCADE, related_name='responses')
    question = models.ForeignKey(Question, on_delete=models.CASCADE)
    selected_choices = models.ManyToManyField(Choice, blank=True)
    text_response = models.TextField(blank=True)
    is_correct = models.BooleanField(null=True)
    points_earned = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    answered_at = models.DateTimeField(auto_now_add=True)
    
    # def __str__(self):
    #     return f"{self.attempt.user.email} - {self.question.question_text[:30]}"

class AssignmentSubmission(models.Model):
    SUBMISSION_STATUS = [
        ('submitted', 'Submitted'),
        ('graded', 'Graded'),
        ('late', 'Late'),
        ('missing', 'Missing'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='assignment_submissions')
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    submission_file = models.FileField(upload_to='assignments/', blank=True)
    submission_text = models.TextField(blank=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    graded_at = models.DateTimeField(null=True, blank=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    feedback = models.TextField(blank=True)
    status = models.CharField(max_length=20, choices=SUBMISSION_STATUS, default='submitted')
    is_late = models.BooleanField(default=False)
    
    class Meta:
        unique_together = ['user', 'assignment']
        ordering = ['-submitted_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.assignment.title}"

class ExamAttempt(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='exam_attempts')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(null=True, blank=True)
    score = models.DecimalField(max_digits=5, decimal_places=2, null=True, blank=True)
    is_passed = models.BooleanField(default=False)
    time_taken = models.IntegerField(help_text="Time taken in seconds", null=True, blank=True)
    attempt_number = models.IntegerField(default=1)
    
    class Meta:
        unique_together = ['user', 'exam', 'attempt_number']
        ordering = ['-started_at']
    
    def __str__(self):
        return f"{self.user.email} - {self.exam.title} (Attempt {self.attempt_number})"

class Certificate(models.Model):
    CERTIFICATE_TYPES = [
        ('course_completion', 'Course Completion'),
        ('quiz_certification', 'Quiz Certification'),
        ('exam_certification', 'Exam Certification'),
        ('assignment_certification', 'Assignment Certification'),
    ]
    
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='certificates')
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='certificates')
    certificate_type = models.CharField(max_length=30, choices=CERTIFICATE_TYPES, default='course_completion')
    title = models.CharField(max_length=200)
    description = models.TextField()
    issued_date = models.DateTimeField(auto_now_add=True)
    expiry_date = models.DateTimeField(null=True, blank=True)
    certificate_number = models.CharField(max_length=50, unique=True)
    qr_code = models.ImageField(upload_to='certificates/qr_codes/', blank=True)
    pdf_file = models.FileField(upload_to='certificates/pdfs/', blank=True)
    is_valid = models.BooleanField(default=True)
    
    # Related assessment data
    quiz_attempt = models.ForeignKey(QuizAttempt, on_delete=models.SET_NULL, null=True, blank=True)
    exam_attempt = models.ForeignKey(ExamAttempt, on_delete=models.SET_NULL, null=True, blank=True)
    assignment_submission = models.ForeignKey(AssignmentSubmission, on_delete=models.SET_NULL, null=True, blank=True)
    
    class Meta:
        ordering = ['-issued_date']
    
    def __str__(self):
        return f"{self.user.email} - {self.title}"
    
    def save(self, *args, **kwargs):
        if not self.certificate_number:
            self.certificate_number = f"CERT-{self.user.id}-{self.course.id}-{uuid.uuid4().hex[:8].upper()}"
        
        # Only generate QR code if it doesn't exist and we have required packages
        if not self.qr_code:
            try:
                self.generate_qr_code()
            except Exception as e:
                # Log the error but don't fail the save
                print(f"Failed to generate QR code: {e}")
        
        super().save(*args, **kwargs)
    
    def generate_qr_code(self):
        """Generate QR code for certificate verification"""
        try:
            import qrcode
            from io import BytesIO
            from django.core.files.base import ContentFile
            
            qr = qrcode.QRCode(
                version=1,
                error_correction=qrcode.constants.ERROR_CORRECT_L,
                box_size=10,
                border=4,
            )
            
            # QR code data includes certificate number and verification URL
            qr_data = f"https://yourdomain.com/verify/{self.certificate_number}"
            qr.add_data(qr_data)
            qr.make(fit=True)
            
            img = qr.make_image(fill_color="black", back_color="white")
            buffer = BytesIO()
            img.save(buffer, format='PNG')
            
            filename = f"qr_code_{self.certificate_number}.png"
            self.qr_code.save(filename, ContentFile(buffer.getvalue()), save=False)
        except ImportError:
            # qrcode package not installed, skip QR generation
            pass
        except Exception as e:
            # Other errors, skip QR generation
            print(f"Error generating QR code: {e}")
    
    def generate_pdf(self):
        """Generate PDF certificate"""
        try:
            from reportlab.pdfgen import canvas
            from reportlab.lib.pagesizes import letter
            from reportlab.lib.units import inch
            from reportlab.lib import colors
            from reportlab.platypus import SimpleDocTemplate, Paragraph, Spacer, Image
            from reportlab.lib.styles import getSampleStyleSheet, ParagraphStyle
            from io import BytesIO
            from django.core.files.base import ContentFile
            
            buffer = BytesIO()
            doc = SimpleDocTemplate(buffer, pagesize=letter)
            styles = getSampleStyleSheet()
            story = []
            
            # Title
            title_style = ParagraphStyle(
                'CustomTitle',
                parent=styles['Heading1'],
                fontSize=24,
                spaceAfter=30,
                alignment=1,  # Center alignment
                textColor=colors.darkblue
            )
            story.append(Paragraph("Certificate of Completion", title_style))
            story.append(Spacer(1, 20))
            
            # Certificate content
            content_style = ParagraphStyle(
                'Content',
                parent=styles['Normal'],
                fontSize=12,
                spaceAfter=12,
                alignment=1
            )
            
            story.append(Paragraph(f"This is to certify that", content_style))
            story.append(Spacer(1, 10))
            
            # Student name
            name_style = ParagraphStyle(
                'Name',
                parent=styles['Heading2'],
                fontSize=18,
                spaceAfter=20,
                alignment=1,
                textColor=colors.darkblue
            )
            story.append(Paragraph(f"{self.user.email}", name_style))
            story.append(Spacer(1, 10))
            
            story.append(Paragraph(f"has successfully completed the course", content_style))
            story.append(Spacer(1, 10))
            
            # Course name
            course_style = ParagraphStyle(
                'Course',
                parent=styles['Heading3'],
                fontSize=16,
                spaceAfter=20,
                alignment=1,
                textColor=colors.darkgreen
            )
            story.append(Paragraph(f"{self.course.title}", course_style))
            story.append(Spacer(1, 20))
            
            # Certificate details
            details_style = ParagraphStyle(
                'Details',
                parent=styles['Normal'],
                fontSize=10,
                spaceAfter=8,
                alignment=1
            )
            
            story.append(Paragraph(f"Certificate Number: {self.certificate_number}", details_style))
            story.append(Paragraph(f"Issued Date: {self.issued_date.strftime('%B %d, %Y')}", details_style))
            
            if self.quiz_attempt:
                story.append(Paragraph(f"Quiz Score: {self.quiz_attempt.score}%", details_style))
            elif self.exam_attempt:
                story.append(Paragraph(f"Exam Score: {self.exam_attempt.score}%", details_style))
            
            story.append(Spacer(1, 30))
            
            # QR Code
            if self.qr_code:
                try:
                    qr_img = Image(self.qr_code.path, width=1*inch, height=1*inch)
                    story.append(qr_img)
                    story.append(Paragraph("Scan to verify certificate", details_style))
                except Exception as e:
                    # Skip QR code if there's an error
                    print(f"Error adding QR code to PDF: {e}")
            
            doc.build(story)
            pdf_content = buffer.getvalue()
            buffer.close()
            
            filename = f"certificate_{self.certificate_number}.pdf"
            self.pdf_file.save(filename, ContentFile(pdf_content), save=False)
        except ImportError:
            # reportlab package not installed, skip PDF generation
            pass
        except Exception as e:
            # Other errors, skip PDF generation
            print(f"Error generating PDF: {e}")
