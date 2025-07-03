from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import (
    CourseViewSet,
    VideoMaterialUploadViewSet,
    PDFMaterialUploadViewSet,
    PresentationMaterialUploadViewSet,
    NoteMaterialUploadViewSet,
)




router = DefaultRouter()
router.register(r'', CourseViewSet, basename='course_class')
router.register(r'upload_videos', VideoMaterialUploadViewSet, basename='upload_videos')
router.register(r'upload_pdfs', PDFMaterialUploadViewSet, basename='upload_pdfs')
router.register(r'upload_presentations', PresentationMaterialUploadViewSet, basename='upload_presentations')
router.register(r'upload_notes', NoteMaterialUploadViewSet, basename='upload_notes')

urlpatterns = [
    path('', include(router.urls)),
]