# adminpanel/views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAdminUser
from accounts.models import User
from progress.models import Progress, TempCourse
from .serializers import TempCourseStatsSerializer
from django.db.models import Avg

class AdminDashboardOverview(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        total_students = User.objects.filter(user_type='Student').count()
        total_instructors = User.objects.filter(user_type='Instructor').count()
        total_courses = TempCourse.objects.count()
        avg_progress = Progress.objects.aggregate(avg=Avg('percentage_completed'))['avg'] or 0.0

        return Response({
            'total_students': total_students,
            'total_instructors': total_instructors,
            'total_courses': total_courses,
            'average_course_progress': round(avg_progress, 2)
        })


class AdminCourseWiseProgress(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        course_data = []

        for course in TempCourse.objects.all():
            progresses = Progress.objects.filter(course=course)
            total_students = progresses.count()
            avg_progress = progresses.aggregate(avg=Avg('percentage_completed'))['avg'] or 0.0

            course_data.append({
                'course_id': course.id,
                'course_title': course.title,
                'total_students': total_students,
                'average_progress': round(avg_progress, 2)
            })

        serializer = TempCourseStatsSerializer(course_data, many=True)
        return Response(serializer.data)
