from django.shortcuts import render
from rest_framework import viewsets
from .models import Progress
from .serializers import ProgressSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

class ProgressViewSet(viewsets.ModelViewSet):
    serializer_class = ProgressSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        if user.role == 'Student':
            return Progress.objects.filter(student=user)
        elif user.role == 'Admin':
            return Progress.objects.all()
        else:  # Instructor
            return Progress.objects.none()

    def perform_create(self, serializer):
        serializer.save(student=self.request.user)

    @action(detail=False, methods=['get'], url_path='my-dashboard')
    def my_dashboard(self, request):
        user = request.user
        if user.role != "Student":
            return Response({"error": "Only students can view dashboard"}, status=403)
        progresses = Progress.objects.filter(student=user)
        total_courses = progresses.count()
        total_percentage = sum(p.percentage_completed for p in progresses)
        avg_progress = total_percentage / total_courses if total_courses else 0
        return Response({
            "total_courses": total_courses,
            "average_progress": round(avg_progress, 2)
        })
