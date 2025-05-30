from rest_framework.test import APITestCase
from rest_framework import status
from django.urls import reverse
from .models import Course

class CourseAPITests(APITestCase):
    def setUp(self):
        self.course = Course.objects.create(
            title="Test Course",
            category="Programming",
            level="Beginner",
            duration="3 Months",
            instructor="John Doe",
            description="A test course."
        )
        self.list_url = reverse('course-list')
        self.detail_url = reverse('course-detail', args=[self.course.id])

    def test_list_courses(self):
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_create_course(self):
        data = {
            "title": "New Course",
            "category": "Math",
            "level": "Intermediate",
            "duration": "2 Months",
            "instructor": "Jane Smith",
            "description": "A new course."
        }
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_201_CREATED)

    def test_retrieve_course(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_update_course(self):
        data = {
            "title": "Updated Course",
            "category": "Programming",
            "level": "Advanced",
            "duration": "4 Months",
            "instructor": "John Doe",
            "description": "Updated description."
        }
        response = self.client.put(self.detail_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)

    def test_delete_course(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)
