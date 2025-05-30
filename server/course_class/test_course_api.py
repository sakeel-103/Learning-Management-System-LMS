
import os
from rest_framework.test import APITestCase, APIClient
from rest_framework import status
from django.urls import reverse
from .models import Course


class CourseAPITests(APITestCase):

    @classmethod
    def setUpClass(cls):
        super().setUpClass()
        # Use empty string for in-memory Django test client
        cls.api_host = ""
        cls.client = APIClient()

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
        self.assertIn('Test Course', str(response.data))

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
        self.assertEqual(response.data['title'], data['title'])

    def test_retrieve_course(self):
        response = self.client.get(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], self.course.title)

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
        self.assertEqual(response.data['title'], data['title'])
        self.assertEqual(response.data['level'], data['level'])

    def test_delete_course(self):
        response = self.client.delete(self.detail_url)
        self.assertEqual(response.status_code, status.HTTP_204_NO_CONTENT)

    def test_create_course_missing_fields(self):
        # Should fail with 400 if required fields are missing
        data = {"title": "Incomplete Course"}
        response = self.client.post(self.list_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST)

    def test_partial_update_course(self):
        # PATCH request to update only one field
        patch_url = self.detail_url
        data = {"title": "Partially Updated"}
        response = self.client.patch(patch_url, data, format='json')
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        self.assertEqual(response.data['title'], "Partially Updated")

    def test_list_courses_filter(self):
        # Create another course with a different category
        Course.objects.create(
            title="Another Course",
            category="Science",
            level="Intermediate",
            duration="1 Month",
            instructor="Jane Doe",
            description="Another test course."
        )
        # If you add filtering to your API, you can test it here. Example:
        # response = self.client.get(self.list_url + '?category=Science')
        # self.assertEqual(response.status_code, status.HTTP_200_OK)
        # self.assertIn('Another Course', str(response.data))
        # For now, just check both courses are present
        response = self.client.get(self.list_url)
        self.assertEqual(response.status_code, status.HTTP_200_OK)
        titles = [c['title'] for c in response.data]
        self.assertIn('Test Course', titles)
        self.assertIn('Another Course', titles)
