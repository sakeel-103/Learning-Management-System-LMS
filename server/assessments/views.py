from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.utils import timezone
from datetime import timedelta
import qrcode
from io import BytesIO
from django.core.files import File
from reportlab.pdfgen import canvas
from reportlab.lib.pagesizes import letter
from reportlab.lib import colors
from .models import Quiz, Question, Choice, QuizAttempt, Answer, Certificate
from .serializers import (
    QuizSerializer, QuestionSerializer, ChoiceSerializer,
    QuizAttemptSerializer, AnswerSerializer, CertificateSerializer
)
from django.http import FileResponse

class QuizViewSet(viewsets.ModelViewSet):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer
    permission_classes = [IsAuthenticated]

    @action(detail=True, methods=['post'])
    def start_attempt(self, request, pk=None):
        quiz = self.get_object()
        
        # Check if user already has an active attempt
        active_attempt = QuizAttempt.objects.filter(
            user=request.user,
            quiz=quiz,
            is_completed=False
        ).first()
        
        if active_attempt:
            return Response({
                'error': 'You already have an active attempt for this quiz'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Create new attempt
        attempt = QuizAttempt.objects.create(
            user=request.user,
            quiz=quiz,
            end_time=timezone.now() + timedelta(minutes=quiz.duration_minutes)
        )
        
        return Response(QuizAttemptSerializer(attempt).data)

    @action(detail=True, methods=['post'])
    def submit_answer(self, request, pk=None):
        quiz_attempt = QuizAttempt.objects.get(pk=pk)
        
        if quiz_attempt.is_completed:
            return Response({
                'error': 'This quiz attempt is already completed'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        question_id = request.data.get('question_id')
        selected_choice_id = request.data.get('selected_choice_id')
        text_answer = request.data.get('text_answer')
        
        question = Question.objects.get(pk=question_id)
        
        # Auto-grade MCQ and True/False questions
        is_correct = None
        points_earned = 0
        
        if question.question_type in ['MCQ', 'TF']:
            selected_choice = Choice.objects.get(pk=selected_choice_id)
            is_correct = selected_choice.is_correct
            points_earned = question.points if is_correct else 0
        
        answer = Answer.objects.create(
            quiz_attempt=quiz_attempt,
            question=question,
            selected_choice_id=selected_choice_id,
            text_answer=text_answer,
            is_correct=is_correct,
            points_earned=points_earned
        )
        
        return Response(AnswerSerializer(answer).data)

    @action(detail=True, methods=['post'])
    def submit_attempt(self, request, pk=None):
        quiz_attempt = QuizAttempt.objects.get(pk=pk)
        
        if quiz_attempt.is_completed:
            return Response({
                'error': 'This quiz attempt is already completed'
            }, status=status.HTTP_400_BAD_REQUEST)
        
        # Calculate total score
        total_score = sum(answer.points_earned for answer in quiz_attempt.answers.all())
        quiz_attempt.score = total_score
        quiz_attempt.is_completed = True
        quiz_attempt.save()
        
        # Generate certificate if passing score is achieved
        if total_score >= quiz_attempt.quiz.passing_score:
            self.generate_certificate(quiz_attempt)
        
        return Response(QuizAttemptSerializer(quiz_attempt).data)

    def generate_certificate(self, quiz_attempt):
        # Generate QR code
        qr = qrcode.QRCode(version=1, box_size=10, border=5)
        qr.add_data(f"Certificate ID: {quiz_attempt.attempt_id}")
        qr.make(fit=True)
        qr_image = qr.make_image(fill_color="black", back_color="white")
        
        # Save QR code
        buffer = BytesIO()
        qr_image.save(buffer, format='PNG')
        qr_file = File(buffer, name=f'qr_{quiz_attempt.attempt_id}.png')
        
        # Generate PDF certificate
        buffer = BytesIO()
        p = canvas.Canvas(buffer, pagesize=letter)
        p.setFont("Helvetica-Bold", 24)
        p.drawString(100, 700, "Certificate of Completion")
        p.setFont("Helvetica", 16)
        p.drawString(100, 650, f"Student: {quiz_attempt.user.get_full_name()}")
        p.drawString(100, 600, f"Course: {quiz_attempt.quiz.title}")
        p.drawString(100, 550, f"Score: {quiz_attempt.score}")
        p.drawString(100, 500, f"Date: {timezone.now().strftime('%Y-%m-%d')}")
        p.save()
        
        # Create certificate record
        certificate = Certificate.objects.create(
            user=quiz_attempt.user,
            quiz=quiz_attempt.quiz,
            score=quiz_attempt.score,
            qr_code=qr_file,
            pdf_file=File(buffer, name=f'certificate_{quiz_attempt.attempt_id}.pdf')
        )
        
        return certificate

class CertificateViewSet(viewsets.ModelViewSet):
    serializer_class = CertificateSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        # Users can only see their own certificates
        return Certificate.objects.filter(user=self.request.user)

    @action(detail=True, methods=['get'])
    def download_pdf(self, request, pk=None):
        certificate = self.get_object()
        if certificate.pdf_file:
            response = FileResponse(certificate.pdf_file, as_attachment=True)
            response['Content-Disposition'] = f'attachment; filename="certificate_{certificate.certificate_id}.pdf"'
            return response
        return Response({'error': 'PDF file not found'}, status=status.HTTP_404_NOT_FOUND)

    @action(detail=True, methods=['get'])
    def verify(self, request, pk=None):
        certificate = self.get_object()
        return Response({
            'certificate_id': certificate.certificate_id,
            'user': certificate.user.get_full_name(),
            'quiz': certificate.quiz.title,
            'score': certificate.score,
            'issue_date': certificate.issue_date,
            'is_valid': True
        }) 