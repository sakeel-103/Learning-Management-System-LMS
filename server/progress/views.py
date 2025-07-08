from rest_framework import viewsets, permissions
from .models import Progress
from .serializers import ProgressSerializer
from accounts.models import User

class IsStudentOrAdmin(permissions.BasePermission):
    def has_permission(self, request, view):
        return request.user and request.user.is_authenticated

    def has_object_permission(self, request, view, obj):
        if request.user.user_type == User.STUDENT:
            return obj.student == request.user
        return True

class ProgressViewSet(viewsets.ModelViewSet):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer
    permission_classes = [IsStudentOrAdmin]

    def get_queryset(self):
        user = self.request.user
        if user.user_type == User.STUDENT:
            return Progress.objects.filter(student=user)
        return Progress.objects.all()

    def perform_create(self, serializer):
        serializer.save()

    def perform_update(self, serializer):
        serializer.save()
