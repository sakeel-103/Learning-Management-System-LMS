from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from django.core.exceptions import ObjectDoesNotExist
from django.http import HttpResponseRedirect, FileResponse
from .models import Certificate
from accounts.models import User
import uuid
import os
from django.conf import settings

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def check_eligibility(request):
    try:
        user = request.user
        if not hasattr(user, 'has_completed_course') or not user.has_completed_course:
            return Response({'eligible': False, 'message': 'Course not completed yet'}, status=403)

        cert, created = Certificate.objects.get_or_create(
            user=user,
            defaults={
                'course_name': 'Trackademy Course',
                'verification_code': str(uuid.uuid4())
            }
        )
        
        # Generate local download URL
        cert.download_url = f'/api/certification/pdf-download/?code={cert.verification_code}'
        cert.save()
        
        return Response({
            'eligible': True,
            'user_name': user.get_full_name(),
            'download_url': cert.download_url,
            'verification_code': cert.verification_code
        })
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['POST'])
def verify_email(request):
    email = request.data.get('email')
    if not email:
        return Response({'success': False, 'message': 'Email is required'}, status=400)
    
    try:
        user = User.objects.get(email=email)
        if not hasattr(user, 'has_completed_course') or not user.has_completed_course:
            return Response({'success': False, 'message': 'Course not completed with this email'}, status=403)

        cert, created = Certificate.objects.get_or_create(
            user=user,
            defaults={
                'course_name': 'Trackademy Course',
                'verification_code': str(uuid.uuid4())
            }
        )
        
        # Generate local download URL
        cert.download_url = f'/api/certification/pdf-download/?code={cert.verification_code}'
        cert.save()
        
        return Response({
            'success': True,
            'user_name': user.get_full_name(),
            'download_url': cert.download_url,
            'verification_code': cert.verification_code
        })
    except User.DoesNotExist:
        return Response({'success': False, 'message': 'Email not registered'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def download_certificate(request):
    try:
        user = request.user
        cert = Certificate.objects.get(user=user, is_active=True)
        if cert.download_url:
            return HttpResponseRedirect(cert.download_url)
        return Response({'error': 'No download URL available'}, status=404)
    except Certificate.DoesNotExist:
        return Response({'error': 'No active certificate found'}, status=404)
    except Exception as e:
        return Response({'error': str(e)}, status=500)

class CertificateDownloadView(APIView):
    def get(self, request):
        verification_code = request.query_params.get('code')
        if not verification_code:
            return Response({'error': 'Verification code is required'}, status=400)
        
        try:
            cert = Certificate.objects.get(verification_code=verification_code, is_active=True)
            certificate_path = os.path.join(settings.MEDIA_ROOT, 'certificates', 'template.pdf')
            
            try:
                response = FileResponse(open(certificate_path, 'rb'), content_type='application/pdf')
                filename = f"Trackademy_Certificate_{cert.user.get_full_name()}.pdf"
                response['Content-Disposition'] = f'attachment; filename="{filename}"'
                return response
            except FileNotFoundError:
                return Response({'error': 'Certificate template not found'}, status=404)
        except Certificate.DoesNotExist:
            return Response({'error': 'Invalid verification code'}, status=404)
        except Exception as e:
            return Response({'error': str(e)}, status=500)