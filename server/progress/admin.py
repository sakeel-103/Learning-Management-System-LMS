from django.contrib import admin
from .models import Progress

class ProgressAdmin(admin.ModelAdmin):
    list_display = ('student', 'course', 'percentage_completed', 'updated_at')
    list_filter = ('course',)
    search_fields = ('student__email', 'course__title')

admin.site.register(Progress, ProgressAdmin)
