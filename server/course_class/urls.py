from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    CourseMaterialViewSet,
)






router = DefaultRouter()
router.register(r'materials', CourseMaterialViewSet, basename='course_materials')
router.register(r'', CourseViewSet, basename='course_class')

urlpatterns = [
    path('', include(router.urls)),
]