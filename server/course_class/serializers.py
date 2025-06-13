from rest_framework import serializers
from .models import Course, VideoMaterial, PDFMaterial, PresentationMaterial, NoteMaterial



# Separate serializers for each material type
class VideoMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = VideoMaterial
        fields = '__all__'

class PDFMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PDFMaterial
        fields = '__all__'

class PresentationMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = PresentationMaterial
        fields = '__all__'

class NoteMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = NoteMaterial
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Course
        fields = '__all__'