from django.urls import path, include
from rest_framework.routers import DefaultRouter
from . import views
from .views import check_certificate_eligibility
from .views import view_assignment_submissions
from .views import student_upload_assignment


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
     path('certification/check-eligibility/', check_certificate_eligibility, name='check_certificate_eligibility'),
   
    path('quizzes/attempts/<uuid:attempt_id>/', views.get_quiz_attempt, name='get_quiz_attempt'),
  
]

urlpatterns += [
    path('assignments/view_assignment_submissions/', view_assignment_submissions, name='view_assignment_submissions'),
] 

urlpatterns += [
    path('assignments/<uuid:assignment_id>/student_upload/', student_upload_assignment, name='student_upload_assignment'),
] 