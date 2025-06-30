from rest_framework import serializers
from .models import User
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.tokens import RefreshToken

class PublicRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'password', 'user_type']
        extra_kwargs = {
            'password': {'write_only': True},
            'user_type': {'required': True}
        }
        
    def create(self, validated_data):
        user_type = validated_data['user_type']
        
        if user_type == User.STUDENT:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                user_type=user_type,
                is_verified=False,
                is_admin=False  # Explicitly set for students
            )
        elif user_type == User.INSTRUCTOR:
            user = User.objects.create_user(
                email=validated_data['email'],
                password=validated_data['password'],
                user_type=user_type,
                has_access=False,
                is_admin=False  # Explicitly set for instructors
            )
        return user
    
class AdminRegistrationSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True, required=True)
    
    class Meta:
        model = User
        fields = ['email', 'password']
        extra_kwargs = {
            'password': {'write_only': True}
        }
        
    def create(self, validated_data):
        user = User.objects.create_superuser(
            email=validated_data['email'],
            password=validated_data['password']
        )
        return user
    
    def validate_email(self, value):
        if User.objects.filter(email=value).exists():
            raise serializers.ValidationError('This email is already registered.')
        return value
    
class OTPRequestSerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    
class OTPVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, required=True)
    
class PasswordResetVerifySerializer(serializers.Serializer):
    email = serializers.EmailField(required=True)
    otp = serializers.CharField(max_length=6, required=True)
    new_password = serializers.CharField(required=True, write_only=True)
    confirm_password = serializers.CharField(required=True, write_only=True)

    def validate(self, data):
        if data['new_password'] != data['confirm_password']:
            raise serializers.ValidationError("Passwords do not match")
        return data
    
class CustomeTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = user.get_user_type_display()
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        if not self.user.is_verified:
            raise serializers.ValidationError({
                'detail': 'Email not verified. Please verify your email first!'
            })
        
        if self.user.user_type == User.INSTRUCTOR and not self.user.has_access:
            raise serializers.ValidationError({
                'detail': "Your instructor account hasn't been approved yet."
            })
        
        refresh = self.get_token(self.user)
        
        data.update({
            'refresh': str(refresh),
            'access': str(refresh.access_token)
        })
        
        return data
       
class AdminTokenObtainPairSerializer(TokenObtainPairSerializer):
    @classmethod
    def get_token(cls, user):
        token = super().get_token(user)
        token['email'] = user.email
        token['role'] = 'Admin'
        return token

    def validate(self, attrs):
        data = super().validate(attrs)
        
        if not self.user.is_admin:
            raise serializers.ValidationError({
                'detail': 'Only admin users can access this endpoint',
            })
        
        if not self.user.is_verified:
            raise serializers.ValidationError({
                'detail': 'Admin account not verified',
            })

        refresh = self.get_token(self.user)
        
        data['refresh'] = str(refresh)
        data['access'] = str(refresh.access_token)
        
        return data
        
class InstructorSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'is_verified', 'has_access', 'date_joined']
        read_only_fields = fields
        
class InstructorAccessSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'email', 'has_access']
        read_only_fields = ['id', 'email']

    def update(self, instance, validated_data):
        instance.has_access = validated_data.get('has_access', instance.has_access)
        instance.save()
        return instance