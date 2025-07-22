from rest_framework import serializers
from .models import VideoProgress
from course_class.models import CourseMaterial
from course_class.serializers import CourseMaterialSerializer


class VideoProgressSerializer(serializers.ModelSerializer):
    progress_percent = serializers.SerializerMethodField()

    class Meta:
        model = VideoProgress
        fields = ['id', 'student', 'video', 'watched_seconds', 'video_duration', 'progress_percent']
        read_only_fields = ['student']

    def get_progress_percent(self, obj):
        if obj.video_duration <= 0:
            return 0
        return round((obj.watched_seconds / obj.video_duration) * 100, 2)


class CourseMaterialWithProgressSerializer(CourseMaterialSerializer):
    progress_percent = serializers.SerializerMethodField()

    class Meta:
        model = CourseMaterial
        fields = [
            'id', 'course', 'name', 'file', 'material_type',
            'uploaded_at', 'file_url', 'progress_percent'
        ]

    def get_progress_percent(self, obj):
        user = self.context['request'].user
        if not user.is_authenticated or str(user.user_type) != '1':
            return 0
        try:
            progress = VideoProgress.objects.get(student=user, video=obj)
            if progress.video_duration <= 0:
                return 0
            return round((progress.watched_seconds / progress.video_duration) * 100, 2)
        except VideoProgress.DoesNotExist:
            return 0
