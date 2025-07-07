from django.urls import path
from .views import AdminDashboardOverview, AdminCourseWiseProgress

urlpatterns = [
    path('overview/', AdminDashboardOverview.as_view(), name='admin-dashboard-overview'),
    path('course-progress/', AdminCourseWiseProgress.as_view(), name='admin-course-progress'),
]