from rest_framework import generics, permissions, status
from rest_framework.response import Response
from rest_framework_simplejwt.views import TokenObtainPairView
from django.contrib.auth.tokens import default_token_generator
from django.core.mail import send_mail
from django.utils.http import urlsafe_base64_encode
from django.utils.encoding import force_bytes
from django.urls import reverse
from django.conf import settings

from .models import User, PasswordResetOTP
from .serializers import (UserSerializer, 
                          RegisterSerializer, 
                          CustomTokenObtainPairSerializer, 
                          ChangePasswordSerializer, 
                          RequestPasswordResetOTPSerializer,
                          VerifyOTPSerializer,
                          SetNewPasswordSerializer)

class UserListView(generics.ListAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAdminUser]

class UserDetailView(generics.RetrieveUpdateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

class RegisterView(generics.CreateAPIView):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer
    permission_classes = [permissions.AllowAny]

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class ChangePasswordView(generics.UpdateAPIView):
    serializer_class = ChangePasswordSerializer
    permission_classes = [permissions.IsAuthenticated]

    def update(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        user = request.user
        if not user.check_password(serializer.data.get('old_password')):
            return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
        
        user.set_password(serializer.data.get('new_password'))
        user.save()
        
        return Response({"message": "Password updated successfully."}, status=status.HTTP_200_OK)
          
class RequestPasswordResetOTPView(generics.GenericAPIView):
    serializer_class = RequestPasswordResetOTPSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        user = User.objects.filter(email=email).first()
        
        if user:
            # Invalidate existing otp's
            PasswordResetOTP.objects.filter(user=user).update(is_used=True)
            
            # create new otp
            otp_obj = PasswordResetOTP.objects.create(user=user)
            
            # send email with otp
            try:
                send_mail(
                    'Password Reset OTP',
                    f'Your OTP for password reseet is: {otp_obj.otp}\nThis OTP is valid for 1 minute.',
                    settings.DEFAULT_FROM_EMAIL,
                    [email],
                    fail_silently=False,
                )
            except Exception as e:
                return Response({'error': f'Failed to send email: {str(e)}'}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
            
        return Response({'message': 'If this email exists, an OTP has been sent.'}, status=status.HTTP_200_OK)
    
class VerifyOTPView(generics.GenericAPIView):
    serializer_class = VerifyOTPSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        
        user = User.objects.filter(email=email).first()
        if not user:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        otp_obj = PasswordResetOTP.objects.filter(
            user=user,
            otp=otp,
            is_used=False
        ).first()
        
        if not otp_obj or not otp_obj.is_valid():
            return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        
        return Response({'message': 'OTP verified successfully.'}, status=status.HTTP_200_OK)
    
class SetNewPasswordView(generics.GenericAPIView):
    serializer_class = SetNewPasswordSerializer
    permission_classes = [permissions.AllowAny]
    
    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']
        
        user = User.objects.filter(email=email).first()
        
        if not user:
            return Response({'error': 'User not found.'}, status=status.HTTP_404_NOT_FOUND)
        
        otp_obj = PasswordResetOTP.objects.filter(
            user=user,
            otp=otp,
            is_used=False
        ).first()
        
        if not otp_obj or not otp_obj.is_valid():
            return Response({'error': 'Invalid or expired OTP.'}, status=status.HTTP_400_BAD_REQUEST)
        
        # update password
        user.set_password(new_password)
        user.save()
        
        # mark otp used
        otp_obj.is_user = True
        otp_obj.save()
        
        return Response({'message': 'Password updated successfully.'}, status=status.HTTP_200_OK)
    
            