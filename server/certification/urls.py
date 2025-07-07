from django.urls import path
from .views import (
    check_eligibility,
    verify_email,
    download_certificate,
    CertificateDownloadView
)

urlpatterns = [
    path('check-eligibility/', check_eligibility, name='check-eligibility'),
    path('verify-email/', verify_email, name='verify-email'),
    path('download/', download_certificate, name='download-certificate'),
    path('pdf-download/', CertificateDownloadView.as_view(), name='pdf-download'),
]