from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import CourseViewSet, CourseMaterialViewSet


router = DefaultRouter()
router.register(r'create', CourseViewSet)
router.register(r'upload_materials', CourseMaterialViewSet)

urlpatterns = [
    path('', include(router.urls)),
]