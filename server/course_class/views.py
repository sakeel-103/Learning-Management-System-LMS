from django.shortcuts import render
from rest_framework import viewsets

from .models import Course, CourseMaterial
from .serializers import CourseSerializer, CourseMaterialSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer


# ViewSet for CourseMaterial (file upload)
from rest_framework.parsers import MultiPartParser, FormParser

class CourseMaterialViewSet(viewsets.ModelViewSet):
    queryset = CourseMaterial.objects.all()
    serializer_class = CourseMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)