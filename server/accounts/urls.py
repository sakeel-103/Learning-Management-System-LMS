from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (UserListView, 
                    UserDetailView, 
                    RegisterView,
                   CustomTokenObtainPairView, 
                   ChangePasswordView,
                   RequestPasswordResetOTPView,
                   VerifyOTPView,
                   SetNewPasswordView)

urlpatterns = [
    path('users/', UserListView.as_view(), name='user-list'),
    path('users/me/', UserDetailView.as_view(), name='user-detail'),
    path('register/', RegisterView.as_view(), name='register'),
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('change-password/', ChangePasswordView.as_view(), name='change-password'),
    path('generate-otp/', RequestPasswordResetOTPView.as_view(), name='generate-otp'),
    path('verify-otp/', VerifyOTPView.as_view(), name='verify-otp'),
    path('reset-password/', SetNewPasswordView.as_view(), name='reset-password')
]