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
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth.models import User
from .models import Course, QuizAttempt  
from rest_framework.permissions import AllowAny
# adjust imports
import random
import string
from decimal import Decimal
from django.utils.timezone import now
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

    @action(detail=True, methods=['post'], url_path='submit_attempt', permission_classes=[])
    def submit_attempt(self, request, pk=None):
        try:
            quiz = self.get_object()
            data = request.data
            attempt_id = data.get('attempt_id')
            responses = data.get('responses', [])

            # Handle anonymous user
            user = request.user if request.user.is_authenticated else None

            # Get or create the attempt
            attempt = QuizAttempt.objects.filter(id=attempt_id, quiz=quiz).first()
            if not attempt:
                attempt = QuizAttempt.objects.create(quiz=quiz, user=user)

            total_points = 0
            earned_points = 0

            for response_data in responses:
                question_id = response_data['question_id']
                selected_choice_ids = response_data.get('selected_choice_ids', [])

                try:
                    question = Question.objects.get(id=question_id, quiz=quiz)
                except Question.DoesNotExist:
                    continue

                response = QuizResponse.objects.create(
                    attempt=attempt,
                    question=question
                )
                if question.question_type == 'mcq':
                    correct_choices = set(question.choices.filter(is_correct=True).values_list('id', flat=True))
                    selected_choices = set(map(str, selected_choice_ids))

                    response.selected_choices.set(selected_choice_ids)

                    if correct_choices == selected_choices:
                        response.is_correct = True
                        response.points_earned = question.points
                        earned_points += question.points
                    else:
                        response.is_correct = False
                        response.points_earned = 0

                    response.save()

                total_points += question.points

            # Calculate score percentage
            score_percentage = (earned_points / total_points * 100) if total_points > 0 else 0
            attempt.score = round(Decimal(score_percentage), 2)
            attempt.is_passed = score_percentage >= quiz.passing_score
            attempt.completed_at = now()
            attempt.time_taken = (attempt.completed_at - attempt.started_at).total_seconds()
            attempt.save()

            return Response({
                'score': float(attempt.score),
                'is_passed': attempt.is_passed,
                'time_taken': attempt.time_taken
            }, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({'error': str(e)}, status=status.HTTP_400_BAD_REQUEST)
    
    def get_queryset(self):
        return Quiz.objects.filter(is_active=True)
    
    @action(detail=False, methods=['get'], url_path='by_course/(?P<course_id>[^/.]+)')
    def by_course(self, request, course_id=None):
        """Return quizzes for a given course id"""
        quizzes = Quiz.objects.filter(course__id=course_id, is_active=True)
        serializer = self.get_serializer(quizzes, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['post'], url_path='start')
    def start(self, request, pk=None):
        """Start a new quiz attempt and return attempt_id and quiz_id"""
        quiz = self.get_object()
        user = request.user

        # Check if user already has an attempt
        existing_attempt = QuizAttempt.objects.filter(user=user, quiz=quiz).first()
        if existing_attempt and not existing_attempt.completed_at:
            return Response({
                'attempt_id': existing_attempt.id,
                'quiz_id': str(quiz.id),
                'time_remaining': quiz.time_limit * 60,
                'message': 'Resuming existing attempt'
            })

        # Create new attempt
        attempt = QuizAttempt.objects.create(user=user, quiz=quiz)

        return Response({
            'attempt_id': attempt.id,
            'quiz_id': str(quiz.id),
            'time_remaining': quiz.time_limit * 60,
            'message': 'Quiz attempt started'
        })
    
    # def submit_attempt(self, request, pk=None):
    #     """Submit quiz attempt with auto-grading"""
    #     quiz = self.get_object()
    #     # Use None for anonymous users, or the real user if authenticated
    #     user = request.user if request.user.is_authenticated else None
        
    #     serializer = QuizSubmissionSerializer(data=request.data)
    #     if not serializer.is_valid():
    #         return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        
    #     attempt = get_object_or_404(QuizAttempt, user=user, quiz=quiz, completed_at__isnull=True)
        
    #     with transaction.atomic():
    #         # Process responses
    #         responses_data = serializer.validated_data['responses']
    #         total_points = 0
    #         earned_points = 0
    #         correct_answers = 0
    #         total_questions = quiz.questions.count()
    #         feedback = []
            
    #         for response_data in responses_data:
    #             question_id = response_data.get('question_id')
    #             selected_choice_ids = response_data.get('selected_choice_ids', [])
    #             text_response = response_data.get('text_response', '')
                
    #             question = get_object_or_404(Question, id=question_id, quiz=quiz)
    #             total_points += question.points
                
    #             # Create response
    #             response = QuizResponse.objects.create(
    #                 attempt=attempt,
    #                 question=question,
    #                 text_response=text_response
    #             )
                
    #             if selected_choice_ids:
    #                 choices = Choice.objects.filter(id__in=selected_choice_ids)
    #                 response.selected_choices.set(choices)
                
    #             # Auto-grade based on question type
    #             if question.question_type == 'mcq':
    #                 correct_choices = question.choices.filter(is_correct=True)
    #                 selected_correct = response.selected_choices.filter(is_correct=True).count()
    #                 selected_total = response.selected_choices.count()
                    
    #                 if selected_correct == correct_choices.count() and selected_total == correct_choices.count():
    #                     response.is_correct = True
    #                     response.points_earned = question.points
    #                     earned_points += question.points
    #                     correct_answers += 1
    #                 else:
    #                     response.is_correct = False
    #                     response.points_earned = 0
                
    #             elif question.question_type == 'true_false':
    #                 correct_choice = question.choices.filter(is_correct=True).first()
    #                 if response.selected_choices.filter(id=correct_choice.id).exists():
    #                     response.is_correct = True
    #                     response.points_earned = question.points
    #                     earned_points += question.points
    #                     correct_answers += 1
    #                 else:
    #                     response.is_correct = False
    #                     response.points_earned = 0
                
    #             response.save()
                
    #             # Add feedback
    #             feedback.append({
    #                 'question_id': str(question.id),
    #                 'is_correct': response.is_correct,
    #                 'points_earned': float(response.points_earned),
    #                 'correct_answer': self._get_correct_answer(question)
    #             })
            
    #         # Calculate final score
    #         score = (earned_points / total_points * 100) if total_points > 0 else 0
    #         is_passed = score >= quiz.passing_score
            
    #         # Update attempt
    #         attempt.score = score
    #         attempt.is_passed = is_passed
    #         attempt.completed_at = timezone.now()
    #         attempt.time_taken = serializer.validated_data.get('time_taken', 0)
    #         attempt.save()
            
    #         # Generate certificate if passed
    #         if is_passed:
    #             self._generate_certificate(user, quiz, attempt)
            
    #         return Response({
    #             'score': score,
    #             'is_passed': is_passed,
    #             'correct_answers': correct_answers,
    #             'total_questions': total_questions,
    #             'feedback': feedback,
    #             'attempt_id': attempt.id
    #         })
    
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

from rest_framework.decorators import api_view, permission_classes

@api_view(['GET'])
# @permission_classes([permissions.IsAuthenticated])
@permission_classes([AllowAny])
def check_certificate_eligibility(request):
    course_id = request.query_params.get('course_id')

    if not course_id:
        return Response({"message": "Course ID is required."}, status=status.HTTP_400_BAD_REQUEST)

    try:
        course = Course.objects.get(id=course_id)
    except Course.DoesNotExist:
        return Response({"message": "Course not found."}, status=status.HTTP_404_NOT_FOUND)

    # If user is not logged in, return dummy values (for testing)
    user = request.user if request.user and request.user.is_authenticated else None

    if not user:
        # Return dummy data for unauthenticated access
        return Response({
            "eligible": True,
            "user_name": "Guest User",
            "course_title": course.title,
            "duration": getattr(course, "duration", "N/A"),
            "verification_code": f"FREE-CERT-{random.randint(100000, 999999)}",
            "quiz_details": {
                "quiz_title": "Sample Quiz",
                "score": 100,
                "date_passed": str(datetime.now().date())
            }
        })

    # For logged-in users: check if they passed the quiz
    has_passed = QuizAttempt.objects.filter(
        user=user,
        quiz__course=course,
        is_passed=True
    ).exists()

    if not has_passed:
        return Response({
            "eligible": False,
            "message": "You must pass the course quiz to receive a certificate."
        })

    # Logged-in + eligible user
    return Response({
        "eligible": True,
        "user_name": user.get_full_name() or user.username,
        "course_title": course.title,
        "duration": getattr(course, "duration", "N/A"),
        "verification_code": f"TRACK-{random.randint(100000, 999999)}",
        "quiz_details": {
            "quiz_title": "Passed Quiz",
            "score": 92,
            "date_passed": str(datetime.now().date())
        }
    })
class QuestionViewSet(viewsets.ModelViewSet):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    permission_classes = []  # Allow public access

class ChoiceViewSet(viewsets.ModelViewSet):
    queryset = Choice.objects.all()
    serializer_class = ChoiceSerializer
    permission_classes = []  # Allow public access

from rest_framework import serializers
from .models import QuizAttempt

class QuizAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuizAttempt
        fields = '__all__'

from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import QuizAttempt

@api_view(['GET'])

def get_quiz_attempt(request, attempt_id):
    try:
        attempt = QuizAttempt.objects.get(id=attempt_id, user=request.user)
        # Build feedback as in your submission response
        feedback = []
        for response in attempt.responses.all():
            feedback.append({
                "question_text": response.question.question_text,
                "user_answer": response.selected_choices.first().choice_text if response.selected_choices.exists() else "",
                "correct_answer": ", ".join([c.choice_text for c in response.question.choices.filter(is_correct=True)]),
                "is_correct": response.is_correct
            })
        return Response({
            "score": attempt.score,
            "is_passed": attempt.is_passed,
            "total_questions": attempt.quiz.questions.count(),
            "feedback": feedback
        })
    except QuizAttempt.DoesNotExist:
        return Response({"error": "Attempt not found"}, status=status.HTTP_404_NOT_FOUND)


