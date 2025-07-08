from rest_framework import serializers
from .models import Progress

class ProgressSerializer(serializers.ModelSerializer):
    student_email = serializers.EmailField(source='student.email', read_only=True)
    course_title = serializers.CharField(source='course.title', read_only=True)

    class Meta:
        model = Progress
        fields = ['id', 'student', 'student_email', 'course', 'course_title', 'percentage_completed', 'updated_at']
        read_only_fields = ['updated_at']
