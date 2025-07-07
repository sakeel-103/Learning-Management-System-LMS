from rest_framework import serializers

class TempCourseStatsSerializer(serializers.Serializer):
    course_id = serializers.IntegerField()
    course_title = serializers.CharField()
    total_students = serializers.IntegerField()
    average_progress = serializers.FloatField()