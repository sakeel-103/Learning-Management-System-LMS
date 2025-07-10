from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    instructor = models.CharField(max_length=100)
    course_description = models.TextField()
    prerequisites = models.JSONField(default=list, blank=True, null=True)

    def __str__(self):
        return self.title


from django.core.exceptions import ValidationError

def validate_material_file(value):
    import os
    ext = os.path.splitext(value.name)[1].lower()
    file_size = value.size
    # File type and size validation
    allowed_types = {
        'pdf': ['.pdf'],
        'video': ['.mp4', '.mov'],
        'presentation': ['.ppt', '.pptx'],
        'note': ['.doc', '.docx', '.txt'],
    }
    max_sizes = {
        'pdf': 50 * 1024 * 1024,  # 50MB
        'video': 2 * 1024 * 1024 * 1024,  # 2GB
        'presentation': 50 * 1024 * 1024,  # 50MB
        'note': 20 * 1024 * 1024,  # 20MB
        'other': 50 * 1024 * 1024,  # 50MB
    }
    # Find material_type from instance if possible
    material_type = getattr(value.instance, 'material_type', 'other') if hasattr(value, 'instance') else 'other'
    # Fallback: guess by extension
    for mtype, exts in allowed_types.items():
        if ext in exts:
            material_type = mtype
            break
    # Validate extension
    if material_type in allowed_types and ext not in allowed_types[material_type]:
        raise ValidationError(f"Invalid file type for {material_type}. Allowed: {', '.join(allowed_types[material_type])}")
    # Validate size
    if file_size > max_sizes.get(material_type, 50 * 1024 * 1024):
        raise ValidationError(f"File too large for {material_type}. Max size: {max_sizes[material_type] // (1024*1024)}MB")



# Separate models for each material type

# Unified CourseMaterial model for all types
class CourseMaterial(models.Model):
    MATERIAL_TYPE_CHOICES = [
        ('video', 'Video'),
        ('pdf', 'PDF'),
        ('presentation', 'Presentation'),
        ('note', 'Note'),
    ]
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='materials')
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='course_materials/', validators=[validate_material_file])
    material_type = models.CharField(max_length=20, choices=MATERIAL_TYPE_CHOICES)
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.name} ({self.material_type})"
