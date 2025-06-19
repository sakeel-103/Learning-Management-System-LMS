from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Course, CourseMaterial
from .serializers import CourseSerializer, CourseMaterialSerializer
from rest_framework.parsers import MultiPartParser, FormParser

class CourseViewSet(viewsets.ModelViewSet):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer
    parser_classes = (MultiPartParser, FormParser)

    @action(detail=True, methods=['post'])
    def upload_materials(self, request, pk=None):
        course = self.get_object()
        file = request.FILES.get('file')
        file_type = request.data.get('type')
        
        if not file or not file_type:
            return Response({'error': 'File and type are required'}, status=status.HTTP_400_BAD_REQUEST)
        
        material = CourseMaterial.objects.create(
            course=course,
            file=file,
            file_type=file_type
        )
        
        return Response({
            'id': material.id,
            'file': material.file.url,
            'file_type': material.file_type,
            'uploaded_at': material.uploaded_at
        }, status=status.HTTP_201_CREATED)

    @action(detail=True, methods=['get'])
    def materials(self, request, pk=None):
        course = self.get_object()
        materials = course.materials.all()
        serializer = CourseMaterialSerializer(materials, many=True)
        return Response(serializer.data)