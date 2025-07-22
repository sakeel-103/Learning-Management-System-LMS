from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import status
from .models import VideoProgress
from course_class.models import CourseMaterial
from .serializers import VideoProgressSerializer

class UpdateVideoProgressView(APIView):
    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def post(self, request):
        user = request.user
        video_id = request.data.get("video")

        try:
            watched_seconds = float(request.data.get("watched_seconds", 0) or 0)
            video_duration = float(request.data.get("video_duration", 0) or 0)
        except (ValueError, TypeError):
            return Response({'detail': 'Invalid watched_seconds or video_duration'}, status=400)

        if not video_id:
            return Response({'detail': 'Video ID is required.'}, status=400)

        try:
            video = CourseMaterial.objects.get(id=video_id)
        except CourseMaterial.DoesNotExist:
            return Response({'detail': 'Video not found.'}, status=404)

        progress, _ = VideoProgress.objects.get_or_create(student=user, video=video)

        if watched_seconds > progress.watched_seconds:
            progress.watched_seconds = watched_seconds

        if video_duration > 0:
            progress.video_duration = video_duration

        progress.save()

        serializer = VideoProgressSerializer(progress)
        return Response(serializer.data, status=status.HTTP_200_OK)
