from django.shortcuts import render
from rest_framework import viewsets

from .models import Course, VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial
from .serializers import CourseSerializer, VideoMaterialSerializer, PDFMaterialSerializer, PresentationMaterialSerializer, NoteMaterialSerializer


class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer



# Separate ViewSets for uploading each material type
from rest_framework.parsers import MultiPartParser, FormParser

class VideoMaterialUploadViewSet(viewsets.ModelViewSet):
    queryset = VideoMaterial.objects.all()
    serializer_class = VideoMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)

class PDFMaterialUploadViewSet(viewsets.ModelViewSet):
    queryset = PDFMaterial.objects.all()
    serializer_class = PDFMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)

class PresentationMaterialUploadViewSet(viewsets.ModelViewSet):
    queryset = PresentationMaterial.objects.all()
    serializer_class = PresentationMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)

class NoteMaterialUploadViewSet(viewsets.ModelViewSet):
    queryset = NoteMaterial.objects.all()
    serializer_class = NoteMaterialSerializer
    parser_classes = (MultiPartParser, FormParser)