from rest_framework import generics, status, permissions
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAdminUser
from rest_framework_simplejwt.views import TokenObtainPairView
from .serializers import PublicRegistrationSerializer, AdminRegistrationSerializer, OTPRequestSerializer, OTPVerifySerializer, PasswordResetVerifySerializer, CustomeTokenObtainPairSerializer, AdminTokenObtainPairSerializer, InstructorSerializer, InstructorAccessSerializer
from django.core.mail import send_mail
from django.conf import settings
from .models import OTP, User

class PublicRegistrationView(generics.CreateAPIView):
    serializer_class = PublicRegistrationSerializer
    permission_classes = [AllowAny]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Registration successful!', 'user': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )

class AdminRegistrationView(generics.CreateAPIView):
    serializer_class = AdminRegistrationSerializer
    permission_classes = [IsAdminUser]

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(
            {'message': 'Admin registration successful!', 'user': serializer.data},
            status=status.HTTP_201_CREATED,
            headers=headers
        )
        
class OTPRequestView(generics.GenericAPIView):
    serializer_class = OTPRequestSerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        try:
            user = User.objects.get(email=email)
        except User.DoesNotExist:
            return Response(
                {"error": "User with this email does not exist"},
                status=status.HTTP_404_NOT_FOUND
            )

        otp = OTP.create_otp(user)
        
        # Send email with OTP
        send_mail(
            'Your Verification OTP',
            f'Your OTP is: {otp.code}\nThis code will expire in 1 minute.',
            settings.DEFAULT_FROM_EMAIL,
            [user.email],
            fail_silently=False,
        )

        return Response(
            {"message": "OTP sent to your email"},
            status=status.HTTP_200_OK
        )

class OTPVerifyView(generics.GenericAPIView):
    serializer_class = OTPVerifySerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp_code = serializer.validated_data['otp']

        try:
            user = User.objects.get(email=email)
            otp = OTP.objects.get(user=user, code=otp_code)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except OTP.DoesNotExist:
            return Response(
                {"error": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not otp.is_valid():
            otp.delete()
            return Response(
                {"error": "OTP has expired"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Mark user as verified
        user.is_verified = True
        user.save()
        
        # Delete the used OTP
        otp.delete()

        return Response(
            {"message": "Email verified successfully"},
            status=status.HTTP_200_OK
        )
        
class PasswordResetVerifyView(generics.GenericAPIView):
    serializer_class = PasswordResetVerifySerializer

    def post(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        
        email = serializer.validated_data['email']
        otp_code = serializer.validated_data['otp']
        new_password = serializer.validated_data['new_password']

        try:
            user = User.objects.get(email=email)
            otp = OTP.objects.get(user=user, code=otp_code)
        except User.DoesNotExist:
            return Response(
                {"error": "User not found"},
                status=status.HTTP_404_NOT_FOUND
            )
        except OTP.DoesNotExist:
            return Response(
                {"error": "Invalid OTP"},
                status=status.HTTP_400_BAD_REQUEST
            )

        if not otp.is_valid():
            otp.delete()
            return Response(
                {"error": "OTP has expired or already used"},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Update password
        user.set_password(new_password)
        user.save()
        
        # Mark OTP as used
        otp.is_used = True
        otp.save()

        return Response(
            {"message": "Password reset successfully"},
            status=status.HTTP_200_OK
        )

class CustomeTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomeTokenObtainPairSerializer
    
class AdminTokenObtainPairView(TokenObtainPairView):
    serializer_class = AdminTokenObtainPairSerializer
    
class InstructorListView(generics.ListAPIView):
    serializer_class = InstructorSerializer
    permission_classes = [permissions.IsAdminUser]

    def get_queryset(self):
        return User.objects.filter(user_type=User.INSTRUCTOR)

    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()
        serializer = self.get_serializer(queryset, many=True)
        return Response({
            'status': 'success',
            'instructors': serializer.data,
            'count': queryset.count()
        })
        
class AlterInstructorAccessView(generics.GenericAPIView):
    permission_classes = [permissions.IsAdminUser]
    serializer_class = InstructorAccessSerializer
    
    def patch(self, request, pk):
        try:
            instructor = User.objects.get(pk=pk, user_type=User.INSTRUCTOR)
        except User.DoesNotExist:
            return Response(
                {'detail': 'Instructor not found.'},
                status=status.HTTP_404_NOT_FOUND
            )
            
        serializer = self.get_serializer(instructor, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        
        return Response({
            'status': 'success',
            'message': 'Instructor access updated successfully',
        })