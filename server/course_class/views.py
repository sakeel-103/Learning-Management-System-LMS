from django.shortcuts import render
from rest_framework import viewsets

from .models import Course, CourseMaterial
from .serializers import CourseSerializer, CourseMaterialSerializer



class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

    def create(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can create courses.'}, status=403)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can update courses.'}, status=403)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can delete courses.'}, status=403)
        return super().destroy(request, *args, **kwargs)



# Unified ViewSet for all course materials
from rest_framework.parsers import MultiPartParser, FormParser

class CourseMaterialViewSet(viewsets.ModelViewSet):
    queryset = CourseMaterial.objects.all()
    serializer_class = CourseMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)

    def create(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can upload materials.'}, status=403)
        return super().create(request, *args, **kwargs)

    def update(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can edit materials.'}, status=403)
        return super().update(request, *args, **kwargs)

    def destroy(self, request, *args, **kwargs):
        user_type = getattr(request.user, 'user_type', None)
        if user_type not in ['2', 2, 'Instructor']:
            from rest_framework.response import Response
            return Response({'detail': 'Only instructors can delete materials.'}, status=403)
        return super().destroy(request, *args, **kwargs)