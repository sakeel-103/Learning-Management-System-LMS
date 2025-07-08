from django.contrib import admin
from django.urls import path, include

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/accounts/', include('accounts.urls')),
    path('api/v1/assessment/', include('assessment.urls')),
    path('api/v1/certification/', include('certification.urls')),
    path('api/v1/contact_form/', include('contact_form.urls')),
    path('api/v1/course_class/', include('course_class.urls')),
    path('api/v1/dashboard/', include('dashboard.urls')),
    path('api/v1/notifications/', include('notifications.urls')),
    path('api/v1/progress/', include('progress.urls')),
    path('api/v1/subscription/', include('subscription.urls')),
]
