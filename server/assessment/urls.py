from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views

router = DefaultRouter()
router.register(r'quizzes', views.QuizViewSet)
router.register(r'assignments', views.AssignmentViewSet)
router.register(r'exams', views.ExamViewSet)
router.register(r'certificates', views.CertificateViewSet, basename='certificate')
router.register(r'questions', views.QuestionViewSet)
router.register(r'choices', views.ChoiceViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('timer/', views.TimerView.as_view(), name='timer'),
    path('auto-grade/', views.AutoGradeView.as_view(), name='auto-grade'),
] 