from django.urls import path
from .views import PublicRegistrationView, AdminRegistrationView, OTPRequestView, OTPVerifyView, PasswordResetVerifyView, CustomeTokenObtainPairView, AdminTokenObtainPairView, InstructorListView, AlterInstructorAccessView

urlpatterns = [
    path('register/', PublicRegistrationView.as_view(), name='public-registration'),
    path('register/admin/', AdminRegistrationView.as_view(), name='admin-registration'), # python manage.py createsuperuser
    path('otp/request/', OTPRequestView.as_view(), name='otp-request'),
    path('otp/verify/', OTPVerifyView.as_view(), name='otp-verify'),
    path('password-reset/verify/', PasswordResetVerifyView.as_view(), name='password-reset-verify'),
    path('login/', CustomeTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('admin/login/', AdminTokenObtainPairView.as_view(), name='admin_login'),
    path('admin/instructors/', InstructorListView.as_view(), name='instructor-list'),
    path('admin/instructor/<int:pk>/access/', AlterInstructorAccessView.as_view(), name='alter-instructor-access'),
]