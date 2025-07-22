from django.urls import path
from .views import UpdateVideoProgressView

urlpatterns = [
    path('update/', UpdateVideoProgressView.as_view(), name='update-video-progress'),
]
