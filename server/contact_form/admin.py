from django.contrib import admin
from .models import ContactMessage  # Changed from ContactSubmission to ContactMessage

@admin.register(ContactMessage)
class ContactMessageAdmin(admin.ModelAdmin):
    list_display = ('first_name', 'last_name', 'email', 'country', 'created_at')
    list_filter = ('country', 'created_at')
    search_fields = ('first_name', 'last_name', 'email', 'message')
    date_hierarchy = 'created_at'