from rest_framework import serializers
from .models import Subscriber
from django.core.validators import validate_email
from django.core.exceptions import ValidationError

class SubscriberSerializer(serializers.ModelSerializer):
    class Meta:
        model = Subscriber
        fields = ['email']
    
    def validate_email(self, value):
        value = value.strip().lower()
        try:
            validate_email(value)
        except ValidationError:
            raise serializers.ValidationError("Please enter a valid email address")
        return value