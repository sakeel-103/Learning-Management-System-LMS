from django.contrib import admin
from .models import Quiz, Question, Choice, QuizAttempt, Answer, Certificate

@admin.register(Quiz)
class QuizAdmin(admin.ModelAdmin):
    list_display = ('title', 'duration_minutes', 'passing_score', 'is_active')
    search_fields = ('title', 'description')

@admin.register(Question)
class QuestionAdmin(admin.ModelAdmin):
    list_display = ('question_text', 'quiz', 'question_type', 'points')
    list_filter = ('question_type', 'quiz')
    search_fields = ('question_text',)

@admin.register(Choice)
class ChoiceAdmin(admin.ModelAdmin):
    list_display = ('choice_text', 'question', 'is_correct')
    list_filter = ('is_correct', 'question__quiz')
    search_fields = ('choice_text',)

@admin.register(QuizAttempt)
class QuizAttemptAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'start_time', 'end_time', 'score', 'is_completed')
    list_filter = ('is_completed', 'quiz')
    search_fields = ('user__username', 'quiz__title')

@admin.register(Answer)
class AnswerAdmin(admin.ModelAdmin):
    list_display = ('quiz_attempt', 'question', 'is_correct', 'points_earned')
    list_filter = ('is_correct', 'question__quiz')
    search_fields = ('question__question_text',)

@admin.register(Certificate)
class CertificateAdmin(admin.ModelAdmin):
    list_display = ('user', 'quiz', 'issue_date', 'score')
    list_filter = ('quiz',)
    search_fields = ('user__username', 'quiz__title') 