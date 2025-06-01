from rest_framework import serializers
from .models import Course, CourseMaterial


class CourseMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaterial
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    materials = CourseMaterialSerializer(many=True, read_only=True)

    class Meta:
        model = Course
        fields = '__all__'