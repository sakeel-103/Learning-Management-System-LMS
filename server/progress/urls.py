from rest_framework.routers import DefaultRouter
from .views import ProgressViewSet

router = DefaultRouter()
router.register(r'', ProgressViewSet, basename='progress')

urlpatterns = router.urls
