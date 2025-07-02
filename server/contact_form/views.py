from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import ContactMessage
from .serializers import ContactMessageSerializer

class ContactMessageView(APIView):  # This is the correct class name
    def post(self, request, format=None):
        serializer = ContactMessageSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                'status': 'success',
                'message': 'Your message has been submitted successfully!',
                'data': serializer.data
            }, status=status.HTTP_201_CREATED)
        return Response({
            'status': 'error',
            'message': 'Please correct the errors below.',
            'errors': serializer.errors
        }, status=status.HTTP_400_BAD_REQUEST)