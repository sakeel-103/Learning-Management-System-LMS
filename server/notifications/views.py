from rest_framework import viewsets, permissions
from rest_framework.response import Response
from .models import Notification
from .serializers import NotificationSerializer

class NotificationViewSet(viewsets.ViewSet):
    permission_classes = [permissions.IsAuthenticated]

    def list(self, request):
        notifications = Notification.objects.filter(recipient=request.user).order_by('-created_at')
        serializer = NotificationSerializer(notifications, many=True)
        return Response({"notifications": serializer.data})

    def partial_update(self, request, pk=None):
        try:
            notif = Notification.objects.get(id=pk, recipient=request.user)
            notif.is_read = True
            notif.save()
            return Response({"status": "marked as read"})
        except Notification.DoesNotExist:
            return Response({"error": "Notification not found"}, status=404)
