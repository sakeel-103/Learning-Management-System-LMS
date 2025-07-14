from django.shortcuts import render
from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework import status
from rest_framework.parsers import MultiPartParser, FormParser
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.authentication import JWTAuthentication
from typing import Any

from .models import Course, CourseMaterial
from .serializers import CourseSerializer, CourseMaterialSerializer
from accounts.models import User


def is_instructor(user) -> bool:
    """Check if user is an instructor with access"""
    return (
        hasattr(user, 'user_type') and 
        str(user.user_type) == str(User.INSTRUCTOR) and
        hasattr(user, 'has_access') and 
        user.has_access
    )


class CourseViewSet(viewsets.ModelViewSet):
    # Django models automatically have an 'objects' manager
    queryset = Course.objects.all()  # type: ignore
    serializer_class = CourseSerializer
    authentication_classes = [JWTAuthentication]
    
    def get_permissions(self):
        """Allow public access for listing and retrieving, require auth for create/update/delete"""
        if self.action in ['list', 'retrieve']:
            permission_classes = [AllowAny]
        else:
            permission_classes = [IsAuthenticated]
        return [permission() for permission in permission_classes]

    def create(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can create courses.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can update courses.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can delete courses.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)


class CourseMaterialViewSet(viewsets.ModelViewSet):
    # Django models automatically have an 'objects' manager
    queryset = CourseMaterial.objects.all()  # type: ignore
    serializer_class = CourseMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def create(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can upload materials.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can edit materials.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs) -> Response:
        if not is_instructor(request.user):
            return Response(
                {'detail': 'Only instructors can delete materials.'}, 
                status=status.HTTP_403_FORBIDDEN
            )
        return super().destroy(request, *args, **kwargs)