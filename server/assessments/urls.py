from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import QuizViewSet, CertificateViewSet

router = DefaultRouter()
router.register(r'quizzes', QuizViewSet)
router.register(r'certificates', CertificateViewSet, basename='certificate')

urlpatterns = [
    path('', include(router.urls)),
] 