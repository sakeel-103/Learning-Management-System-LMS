from django.contrib import admin
from .models import (
    Quiz, Question, Choice, Assignment, Exam, QuizAttempt, 
    QuizResponse, AssignmentSubmission, ExamAttempt, Certificate
)
from django.utils.html import format_html

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'quiz_type', 'time_limit', 'passing_score', 'is_active', 'created_at']
    list_filter = ['quiz_type', 'is_active', 'created_at', 'course']
    search_fields = ['title', 'description', 'course__title']
    list_editable = ['is_active', 'passing_score']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ['question_text', 'quiz', 'question_type', 'points', 'order', 'is_required']
    list_filter = ['question_type', 'is_required', 'quiz']
    search_fields = ['question_text', 'quiz__title']
    list_editable = ['points', 'order', 'is_required']
    readonly_fields = ['created_at']

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ['choice_text', 'question', 'is_correct', 'order']
    list_filter = ['is_correct', 'question__question_type']
    search_fields = ['choice_text', 'question__question_text']
    list_editable = ['is_correct', 'order']

@admin.register(Assignment)
class AssignmentAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'assignment_type', 'due_date', 'max_points', 'is_active']
    list_filter = ['assignment_type', 'is_active', 'due_date', 'course']
    search_fields = ['title', 'description', 'course__title']
    list_editable = ['is_active', 'max_points']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(Exam)
class ExamAdmin(admin.ModelAdmin):
    list_display = ['title', 'course', 'exam_type', 'time_limit', 'passing_score', 'start_date', 'end_date', 'is_active']
    list_filter = ['exam_type', 'is_active', 'is_proctored', 'course']
    search_fields = ['title', 'description', 'course__title']
    list_editable = ['is_active', 'passing_score']
    readonly_fields = ['created_at', 'updated_at']

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'quiz', 'score', 'is_passed', 'started_at', 'completed_at', 'time_taken']
    list_filter = ['is_passed', 'started_at', 'completed_at', 'quiz']
    search_fields = ['user__email', 'quiz__title']
    readonly_fields = ['started_at', 'completed_at', 'time_taken']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'quiz')

@admin.register(QuizResponse)
class QuizResponseAdmin(admin.ModelAdmin):
    list_display = ['attempt', 'question', 'is_correct', 'points_earned', 'answered_at']
    list_filter = ['is_correct', 'question__question_type', 'answered_at']
    search_fields = ['attempt__user__email', 'question__question_text']
    readonly_fields = ['answered_at']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('attempt__user', 'question')

@admin.register(AssignmentSubmission)
class AssignmentSubmissionAdmin(admin.ModelAdmin):
    list_display = ('id', 'user', 'assignment', 'submitted_at', 'is_late', 'status', 'file_link')
    list_filter = ('assignment', 'user', 'is_late', 'status')
    search_fields = ('user__email', 'assignment__title')
    readonly_fields = ('submitted_at',)

    def file_link(self, obj):
        if obj.submission_file:
            return format_html('<a href="{}" target="_blank">Download</a>', obj.submission_file.url)
        return "-"
    file_link.short_description = "File"

@admin.register(ExamAttempt)
class ExamAttemptAdmin(admin.ModelAdmin):
    list_display = ['user', 'exam', 'score', 'is_passed', 'attempt_number', 'started_at', 'completed_at']
    list_filter = ['is_passed', 'attempt_number', 'started_at', 'completed_at', 'exam']
    search_fields = ['user__email', 'exam__title']
    readonly_fields = ['started_at', 'completed_at', 'time_taken']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'exam')

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ['user', 'course', 'certificate_type', 'certificate_number', 'issued_date', 'is_valid']
    list_filter = ['certificate_type', 'is_valid', 'issued_date', 'course']
    search_fields = ['user__email', 'course__title', 'certificate_number']
    readonly_fields = ['certificate_number', 'issued_date', 'qr_code', 'pdf_file']
    
    def get_queryset(self, request):
        return super().get_queryset(request).select_related('user', 'course')
    
    def save_model(self, request, obj, form, change):
        if not change:  # Only for new certificates
            obj.generate_qr_code()
        super().save_model(request, obj, form, change)

def api_root(request):
    return JsonResponse({
        "message": "Welcome to the LMS API!",
        "endpoints": {
            "admin": "/admin/",
            "assessment": "/api/assessment/",
            # Add more endpoints as needed
        }
    })
