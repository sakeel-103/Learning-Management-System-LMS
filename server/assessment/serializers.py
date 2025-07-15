from rest_framework import serializers
from django.contrib.auth import get_user_model
from .models import (
    Quiz, Question, Choice, Assignment, Exam, QuizAttempt, 
    QuizResponse, AssignmentSubmission, ExamAttempt, Certificate
)
from course_class.models import Course
from course_class.serializers import CourseSerializer
import uuid

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'user_type']
        read_only_fields = fields
from .models import Quiz, Question, Choice
class ChoiceSerializer(serializers.ModelSerializer):
    class Meta:
        model = Choice
        fields = '__all__'

class QuestionSerializer(serializers.ModelSerializer):
    choices = ChoiceSerializer(many=True, read_only=True)
    
    class Meta:
        model = Question
        fields = '__all__'

class FlexibleCourseField(serializers.Field):
    def to_internal_value(self, data):
        # Accept both int and UUID
        try:
            # Try UUID
            course = Course.objects.get(id=uuid.UUID(str(data)))
        except (ValueError, Course.DoesNotExist):
            try:
                # Try integer PK
                course = Course.objects.get(pk=int(data))
            except (ValueError, Course.DoesNotExist):
                raise serializers.ValidationError("Course must be a valid UUID or integer ID of an existing course.")
        return course

    def to_representation(self, value):
        return str(value.id)  # Always output as UUID string

class QuizSerializer(serializers.ModelSerializer):
    questions = QuestionSerializer(many=True, read_only=True)
    course = FlexibleCourseField()
    course_detail = CourseSerializer(source='course', read_only=True)
    start_time = serializers.DateTimeField(required=False, allow_null=True)
    end_time = serializers.DateTimeField(required=False, allow_null=True)
    
    class Meta:
        model = Quiz
        fields = [
            'id', 'title', 'description', 'course', 'course_detail', 'quiz_type',
            'time_limit', 'passing_score', 'is_active', 'questions', 
            'start_time', 'end_time',
            'created_at', 'updated_at'
        ]

    def create(self, validated_data):
        course = validated_data.pop('course')
        quiz = Quiz.objects.create(course=course, **validated_data)
        return quiz

    def update(self, instance, validated_data):
        if 'course' in validated_data:
            instance.course = validated_data.pop('course')
        return super().update(instance, validated_data)

class AssignmentSerializer(serializers.ModelSerializer):
    assignment_file = serializers.FileField(use_url=True, required=False)
    
    class Meta:
        model = Assignment
        fields = [
            'id', 'title', 'description', 'assignment_type',
            'due_date', 'max_points', 'instructions',
            'is_active', 'created_at', 'updated_at', 'assignment_file', 'course'
        ]

class ExamSerializer(serializers.ModelSerializer):
    course = CourseSerializer(read_only=True)
    course_id = serializers.UUIDField(write_only=True)
    
    class Meta:
        model = Exam
        fields = [
            'id', 'title', 'description', 'course', 'course_id', 'exam_type',
            'time_limit', 'passing_score', 'start_date', 'end_date', 'is_proctored',
            'allow_retakes', 'max_attempts', 'is_active', 'created_at', 'updated_at'
        ]

class QuizResponseSerializer(serializers.ModelSerializer):
    selected_choices = ChoiceSerializer(many=True, read_only=True)
    selected_choice_ids = serializers.ListField(
        child=serializers.UUIDField(),
        write_only=True,
        required=False
    )
    
    class Meta:
        model = QuizResponse
        fields = [
            'id', 'question', 'selected_choices', 'selected_choice_ids',
            'text_response', 'is_correct', 'points_earned', 'answered_at'
        ]
        read_only_fields = ['is_correct', 'points_earned', 'answered_at']
    
    def create(self, validated_data):
        selected_choice_ids = validated_data.pop('selected_choice_ids', [])
        response = QuizResponse.objects.create(**validated_data)
        
        if selected_choice_ids:
            choices = Choice.objects.filter(id__in=selected_choice_ids)
            response.selected_choices.set(choices)
        
        return response

class QuizAttemptSerializer(serializers.ModelSerializer):
    quiz = QuizSerializer(read_only=True)
    quiz_id = serializers.UUIDField(write_only=True)
    responses = QuizResponseSerializer(many=True, read_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = QuizAttempt
        fields = [
            'id', 'user', 'quiz', 'quiz_id', 'started_at', 'completed_at',
            'score', 'is_passed', 'time_taken', 'responses'
        ]
        read_only_fields = ['user', 'started_at', 'completed_at', 'score', 'is_passed', 'time_taken']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class AssignmentSubmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = AssignmentSubmission
        fields = '__all__'

class ExamAttemptSerializer(serializers.ModelSerializer):
    exam = ExamSerializer(read_only=True)
    exam_id = serializers.UUIDField(write_only=True)
    user = UserSerializer(read_only=True)
    
    class Meta:
        model = ExamAttempt
        fields = [
            'id', 'user', 'exam', 'exam_id', 'started_at', 'completed_at',
            'score', 'is_passed', 'time_taken', 'attempt_number'
        ]
        read_only_fields = ['user', 'started_at', 'completed_at', 'score', 'is_passed', 'time_taken', 'attempt_number']
    
    def create(self, validated_data):
        validated_data['user'] = self.context['request'].user
        return super().create(validated_data)

class CertificateSerializer(serializers.ModelSerializer):
    user = UserSerializer(read_only=True)
    course = CourseSerializer(read_only=True)
    quiz_attempt = QuizAttemptSerializer(read_only=True)
    exam_attempt = ExamAttemptSerializer(read_only=True)
    assignment_submission = AssignmentSubmissionSerializer(read_only=True)
    
    class Meta:
        model = Certificate
        fields = [
            'id', 'user', 'course', 'certificate_type', 'title', 'description',
            'issued_date', 'expiry_date', 'certificate_number', 'qr_code',
            'pdf_file', 'is_valid', 'quiz_attempt', 'exam_attempt', 'assignment_submission'
        ]
        read_only_fields = [
            'user', 'issued_date', 'certificate_number', 'qr_code', 'pdf_file'
        ]

class QuizSubmissionSerializer(serializers.Serializer):
    quiz_id = serializers.UUIDField()
    responses = serializers.ListField(
        child=serializers.DictField()
    )
    time_taken = serializers.IntegerField(required=False)

class AutoGradeResponseSerializer(serializers.Serializer):
    score = serializers.DecimalField(max_digits=5, decimal_places=2)
    is_passed = serializers.BooleanField()
    correct_answers = serializers.IntegerField()
    total_questions = serializers.IntegerField()
    feedback = serializers.ListField(child=serializers.DictField())

class TimerSerializer(serializers.Serializer):
    time_remaining = serializers.IntegerField()
    is_expired = serializers.BooleanField()
    warning_threshold = serializers.IntegerField()

class CertificateVerificationSerializer(serializers.Serializer):
    certificate_number = serializers.CharField()
    is_valid = serializers.BooleanField()
    certificate_data = CertificateSerializer(read_only=True) 
    fields = '__all__' 