from rest_framework import viewsets, status, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.views import APIView
from django.shortcuts import get_object_or_404
from django.utils import timezone
from django.db import transaction
from django.http import HttpResponse
from django.core.files.base import ContentFile
import json
import uuid
from datetime import datetime, timedelta

from .models import (
    Quiz, Question, Choice, Assignment, Exam, QuizAttempt, 
    QuizResponse, AssignmentSubmission, ExamAttempt, Certificate
)
from .serializers import (
    QuizSerializer, QuestionSerializer, ChoiceSerializer, AssignmentSerializer,
    ExamSerializer, QuizAttemptSerializer, QuizResponseSerializer,
    AssignmentSubmissionSerializer, ExamAttemptSerializer, CertificateSerializer,
    QuizSubmissionSerializer, AutoGradeResponseSerializer, TimerSerializer,
    CertificateVerificationSerializer
)

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = []  # Allow public access
    
    def get_queryset(self):
        return Quiz.objects.filter(is_active=True)
    
    @action(detail=True, methods=['post'])
    def start_attempt(self, request, pk=None):
        """Start a new quiz attempt"""
        quiz = self.get_object()
        user = request.user
        
        # Check if user already has an attempt
        existing_attempt = QuizAttempt.objects.filter(user=user, quiz=quiz).first()
        if existing_attempt and not existing_attempt.completed_at:
            return Response({
                'attempt_id': existing_attempt.id,
                'time_remaining': quiz.time_limit * 60,
                'message': 'Resuming existing attempt'
            })
        
        # Create new attempt
        attempt = QuizAttempt.objects.create(user=user, quiz=quiz)
        
        return Response({
            'attempt_id': attempt.id,
            'time_remaining': quiz.time_limit * 60,
            'message': 'Quiz attempt started'
        })
    
    @action(detail=True, methods=['post'])
    def submit_attempt(self, request, pk=None):
        """Submit quiz attempt with auto-grading"""
        quiz = self.get_object()
        user = request.user
        
        serializer = QuizSubmissionSerializer(data=request.data)
        if not serializer.is_valid():
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
        attempt = get_object_or_404(QuizAttempt, user=user, quiz=quiz, completed_at__isnull=True)
        
        with transaction.atomic():
            # Process responses
            responses_data = serializer.validated_data['responses']
            total_points = 0
            earned_points = 0
            correct_answers = 0
            total_questions = quiz.questions.count()
            feedback = []
            
            for response_data in responses_data:
                question_id = response_data.get('question_id')
                selected_choice_ids = response_data.get('selected_choice_ids', [])
                text_response = response_data.get('text_response', '')
                
                question = get_object_or_404(Question, id=question_id, quiz=quiz)
                total_points += question.points
                
                # Create response
                response = QuizResponse.objects.create(
                    attempt=attempt,
                    question=question,
                    text_response=text_response
                )
                
                if selected_choice_ids:
                    choices = Choice.objects.filter(id__in=selected_choice_ids)
                    response.selected_choices.set(choices)
                
                # Auto-grade based on question type
                if question.question_type == 'mcq':
                    correct_choices = question.choices.filter(is_correct=True)
                    selected_correct = response.selected_choices.filter(is_correct=True).count()
                    selected_total = response.selected_choices.count()
                    
                    if selected_correct == correct_choices.count() and selected_total == correct_choices.count():
                        response.is_correct = True
                        response.points_earned = question.points
                        earned_points += question.points
                        correct_answers += 1
                    else:
                        response.is_correct = False
                        response.points_earned = 0
                
                elif question.question_type == 'true_false':
                    correct_choice = question.choices.filter(is_correct=True).first()
                    if response.selected_choices.filter(id=correct_choice.id).exists():
                        response.is_correct = True
                        response.points_earned = question.points
                        earned_points += question.points
                        correct_answers += 1
                    else:
                        response.is_correct = False
                        response.points_earned = 0
                
                response.save()
                
                # Add feedback
                feedback.append({
                    'question_id': str(question.id),
                    'is_correct': response.is_correct,
                    'points_earned': float(response.points_earned),
                    'correct_answer': self._get_correct_answer(question)
                })
            
            # Calculate final score
            score = (earned_points / total_points * 100) if total_points > 0 else 0
            is_passed = score >= quiz.passing_score
            
            # Update attempt
            attempt.score = score
            attempt.is_passed = is_passed
            attempt.completed_at = timezone.now()
            attempt.time_taken = serializer.validated_data.get('time_taken', 0)
            attempt.save()
            
            # Generate certificate if passed
            if is_passed:
                self._generate_certificate(user, quiz, attempt)
            
            return Response({
                'score': score,
                'is_passed': is_passed,
                'correct_answers': correct_answers,
                'total_questions': total_questions,
                'feedback': feedback,
                'attempt_id': attempt.id
            })
    
    def _get_correct_answer(self, question):
        """Get correct answer for feedback"""
        if question.question_type in ['mcq', 'true_false']:
            correct_choices = question.choices.filter(is_correct=True)
            return [choice.choice_text for choice in correct_choices]
        return None
    
    def _generate_certificate(self, user, quiz, attempt):
        """Generate certificate for passed quiz"""
        certificate = Certificate.objects.create(
            user=user,
            course=quiz.course,
            certificate_type='quiz_certification',
            title=f"Quiz Certification - {quiz.title}",
            description=f"Successfully completed {quiz.title} with a score of {attempt.score}%",
            quiz_attempt=attempt
        )
        certificate.generate_pdf()
        return certificate

class AssignmentViewSet(viewsets.ModelViewSet):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer
    permission_classes = []  # Allow public access
    
    def get_queryset(self):
        return Assignment.objects.filter(is_active=True)
    
    @action(detail=True, methods=['post'])
    def submit_assignment(self, request, pk=None):
        """Submit assignment"""
        assignment = self.get_object()
        user = request.user
        
        # Check if already submitted
        existing_submission = AssignmentSubmission.objects.filter(
            user=user, assignment=assignment
        ).first()
        
        if existing_submission:
            return Response({
                'error': 'Assignment already submitted'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        serializer = AssignmentSubmissionSerializer(
            data=request.data,
            context={'request': request}
        )
        
        if serializer.is_valid():
            submission = serializer.save(assignment_id=assignment.id)
            
            # Check if late submission
            if submission.submitted_at > assignment.due_date:
                submission.is_late = True
                submission.status = 'late'
                submission.save()
            
            return Response({
                'message': 'Assignment submitted successfully',
                'submission_id': submission.id,
                'is_late': submission.is_late
            })
        
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamViewSet(viewsets.ModelViewSet):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer
    permission_classes = []  # Allow public access
    
    def get_queryset(self):
        return Exam.objects.filter(is_active=True)
    
    @action(detail=True, methods=['post'])
    def start_exam(self, request, pk=None):
        """Start exam attempt"""
        exam = self.get_object()
        user = request.user
        
        # Check exam availability
        now = timezone.now()
        if now < exam.start_date or now > exam.end_date:
            return Response({
                'error': 'Exam is not available at this time'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Check attempt limits
        existing_attempts = ExamAttempt.objects.filter(user=user, exam=exam)
        if existing_attempts.count() >= exam.max_attempts:
            return Response({
                'error': 'Maximum attempts reached'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new attempt
        attempt_number = existing_attempts.count() + 1
        attempt = ExamAttempt.objects.create(
            user=user,
            exam=exam,
            attempt_number=attempt_number
        )
        
        return Response({
            'attempt_id': attempt.id,
            'time_remaining': exam.time_limit * 60,
            'attempt_number': attempt_number
        })

class TimerView(APIView):
    """Handle exam/quiz timer logic"""
    permission_classes = [permissions.IsAuthenticated]
    
    def get(self, request):
        attempt_id = request.query_params.get('attempt_id')
        attempt_type = request.query_params.get('type')  # 'quiz' or 'exam'
        
        if attempt_type == 'quiz':
            attempt = get_object_or_404(QuizAttempt, id=attempt_id, user=request.user)
            time_limit = attempt.quiz.time_limit * 60
        else:
            attempt = get_object_or_404(ExamAttempt, id=attempt_id, user=request.user)
            time_limit = attempt.exam.time_limit * 60
        
        # Calculate time remaining
        elapsed_time = (timezone.now() - attempt.started_at).total_seconds()
        time_remaining = max(0, time_limit - elapsed_time)
        is_expired = time_remaining <= 0
        
        # Auto-submit if expired
        if is_expired and not attempt.completed_at:
            self._auto_submit_attempt(attempt, attempt_type)
        
        return Response({
            'time_remaining': int(time_remaining),
            'is_expired': is_expired,
            'warning_threshold': 300  # 5 minutes warning
        })
    
    def _auto_submit_attempt(self, attempt, attempt_type):
        """Auto-submit attempt when time expires"""
        if attempt_type == 'quiz':
            # For quiz, calculate score based on answered questions
            responses = attempt.responses.all()
            total_points = sum(response.question.points for response in responses)
            earned_points = sum(response.points_earned for response in responses)
            
            score = (earned_points / total_points * 100) if total_points > 0 else 0
            is_passed = score >= attempt.quiz.passing_score
            
            attempt.score = score
            attempt.is_passed = is_passed
            attempt.completed_at = timezone.now()
            attempt.time_taken = attempt.quiz.time_limit * 60
            attempt.save()
            
            if is_passed:
                self._generate_certificate(attempt.user, attempt.quiz, attempt)

class CertificateViewSet(viewsets.ModelViewSet):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer
    permission_classes = []  # Allow public access
    
    def get_queryset(self):
        # Return all certificates for public access
        return Certificate.objects.all()
    
    def list(self, request, *args, **kwargs):
        """Override list method to handle errors gracefully"""
        try:
            queryset = self.filter_queryset(self.get_queryset())
            serializer = self.get_serializer(queryset, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                'error': 'Failed to fetch certificates',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    def retrieve(self, request, *args, **kwargs):
        """Override retrieve method to handle errors gracefully"""
        try:
            instance = self.get_object()
            serializer = self.get_serializer(instance)
            return Response(serializer.data)
        except Exception as e:
            return Response({
                'error': 'Failed to fetch certificate',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        """Download certificate PDF"""
        try:
            certificate = self.get_object()
            
            if not certificate.pdf_file:
                certificate.generate_pdf()
            
            response = HttpResponse(certificate.pdf_file, content_type='application/pdf')
            response['Content-Disposition'] = f'attachment; filename="certificate_{certificate.certificate_number}.pdf"'
            return response
        except Exception as e:
            return Response({
                'error': 'Failed to download certificate PDF',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    
    @action(detail=False, methods=['post'])
    def verify(self, request):
        """Verify certificate by number"""
        try:
            certificate_number = request.data.get('certificate_number')
            
            try:
                certificate = Certificate.objects.get(
                    certificate_number=certificate_number,
                    is_valid=True
                )
                
                serializer = CertificateSerializer(certificate)
                return Response({
                    'is_valid': True,
                    'certificate_data': serializer.data
                })
            except Certificate.DoesNotExist:
                return Response({
                    'is_valid': False,
                    'error': 'Certificate not found or invalid'
                })
        except Exception as e:
            return Response({
                'error': 'Failed to verify certificate',
                'detail': str(e)
            }, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class AutoGradeView(APIView):
    """Auto-grading for MCQs and other question types"""
    permission_classes = [permissions.IsAuthenticated]
    
    def post(self, request):
        """Auto-grade quiz responses"""
        attempt_id = request.data.get('attempt_id')
        attempt = get_object_or_404(QuizAttempt, id=attempt_id, user=request.user)
        
        responses = attempt.responses.all()
        total_points = 0
        earned_points = 0
        correct_answers = 0
        total_questions = attempt.quiz.questions.count()
        
        for response in responses:
            question = response.question
            total_points += question.points
            
            # Grade based on question type
            if question.question_type == 'mcq':
                correct_choices = question.choices.filter(is_correct=True)
                selected_correct = response.selected_choices.filter(is_correct=True).count()
                selected_total = response.selected_choices.count()
                
                if selected_correct == correct_choices.count() and selected_total == correct_choices.count():
                    response.is_correct = True
                    response.points_earned = question.points
                    earned_points += question.points
                    correct_answers += 1
                else:
                    response.is_correct = False
                    response.points_earned = 0
            
            elif question.question_type == 'true_false':
                correct_choice = question.choices.filter(is_correct=True).first()
                if response.selected_choices.filter(id=correct_choice.id).exists():
                    response.is_correct = True
                    response.points_earned = question.points
                    earned_points += question.points
                    correct_answers += 1
                else:
                    response.is_correct = False
                    response.points_earned = 0
            
            response.save()
        
        # Calculate final score
        score = (earned_points / total_points * 100) if total_points > 0 else 0
        is_passed = score >= attempt.quiz.passing_score
        
        # Update attempt
        attempt.score = score
        attempt.is_passed = is_passed
        attempt.completed_at = timezone.now()
        attempt.save()
        
        return Response({
            'score': score,
            'is_passed': is_passed,
            'correct_answers': correct_answers,
            'total_questions': total_questions
        })

class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = []  # Allow public access

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = []  # Allow public access
