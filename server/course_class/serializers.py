from rest_framework import serializers
from .models import Course, CourseMaterial


# Unified serializer for all course materials
class CourseMaterialSerializer(serializers.ModelSerializer):
    class Meta:
        model = CourseMaterial
        fields = '__all__'

class CourseSerializer(serializers.ModelSerializer):
    # Computed fields for frontend compatibility
    stats = serializers.SerializerMethodField()
    rating = serializers.SerializerMethodField()
    materialsCount = serializers.SerializerMethodField()
    schedule = serializers.SerializerMethodField()
    
    class Meta:
        model = Course
        fields = '__all__'
    
    def get_stats(self, obj):
        """Return default stats for the course"""
        return "Beginner Friendly"
    
    def get_rating(self, obj):
        """Return default rating for the course"""
        return "4.5"
    
    def get_materialsCount(self, obj):
        """Return count of materials by type"""
        materials = obj.materials.all()
        return {
            'videos': materials.filter(material_type='video').count(),
            'pdfs': materials.filter(material_type='pdf').count(),
            'presentations': materials.filter(material_type='presentation').count(),
            'notes': materials.filter(material_type='note').count(),
        }
    
    def get_schedule(self, obj):
        """Return schedule information if available"""
        # Check if course has schedule-related fields
        if hasattr(obj, 'schedule_type') and obj.schedule_type:
            return {
                'type': obj.schedule_type,
                'startDate': obj.start_date if hasattr(obj, 'start_date') else None,
                'endDate': obj.end_date if hasattr(obj, 'end_date') else None,
                'sessions': obj.sessions if hasattr(obj, 'sessions') else None,
                'duration': obj.duration,
            }
        # Default to self-paced if no schedule info
        return {
            'type': 'Self-paced',
            'duration': obj.duration,
        }