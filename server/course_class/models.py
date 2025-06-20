from django.db import models


class Course(models.Model):
    title = models.CharField(max_length=255)
    category = models.CharField(max_length=100)
    level = models.CharField(max_length=100)
    duration = models.CharField(max_length=50)
    instructor = models.CharField(max_length=100)
    course_description = models.TextField()

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
class VideoMaterial(models.Model):
    course = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='course_materials/videos/', validators=[validate_material_file])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        ext = os.path.splitext(self.file.name)[1].lower()
        file_size = self.file.size
        allowed_types = ['.mp4', '.mov']
        max_size = 2 * 1024 * 1024 * 1024  # 2GB
        if ext not in allowed_types:
            raise ValidationError({'file': f"Invalid file type for video. Allowed: {', '.join(allowed_types)}"})
        if file_size > max_size:
            raise ValidationError({'file': f"File too large for video. Max size: {max_size // (1024*1024*1024)}GB"})

    def __str__(self):
        return f"{self.name} (Video)"

class PDFMaterial(models.Model):
    course = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='course_materials/pdfs/', validators=[validate_material_file])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        ext = os.path.splitext(self.file.name)[1].lower()
        file_size = self.file.size
        allowed_types = ['.pdf']
        max_size = 50 * 1024 * 1024  # 50MB
        if ext not in allowed_types:
            raise ValidationError({'file': f"Invalid file type for PDF. Allowed: {', '.join(allowed_types)}"})
        if file_size > max_size:
            raise ValidationError({'file': f"File too large for PDF. Max size: {max_size // (1024*1024)}MB"})

    def __str__(self):
        return f"{self.name} (PDF)"

class PresentationMaterial(models.Model):
    course = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='course_materials/presentations/', validators=[validate_material_file])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        ext = os.path.splitext(self.file.name)[1].lower()
        file_size = self.file.size
        allowed_types = ['.ppt', '.pptx']
        max_size = 50 * 1024 * 1024  # 50MB
        if ext not in allowed_types:
            raise ValidationError({'file': f"Invalid file type for presentation. Allowed: {', '.join(allowed_types)}"})
        if file_size > max_size:
            raise ValidationError({'file': f"File too large for presentation. Max size: {max_size // (1024*1024)}MB"})

    def __str__(self):
        return f"{self.name} (Presentation)"

class NoteMaterial(models.Model):
    course = models.CharField(max_length=255)
    name = models.CharField(max_length=255)
    file = models.FileField(upload_to='course_materials/notes/', validators=[validate_material_file])
    uploaded_at = models.DateTimeField(auto_now_add=True)

    def clean(self):
        ext = os.path.splitext(self.file.name)[1].lower()
        file_size = self.file.size
        allowed_types = ['.doc', '.docx', '.txt']
        max_size = 20 * 1024 * 1024  # 20MB
        if ext not in allowed_types:
            raise ValidationError({'file': f"Invalid file type for note. Allowed: {', '.join(allowed_types)}"})
        if file_size > max_size:
            raise ValidationError({'file': f"File too large for note. Max size: {max_size // (1024*1024)}MB"})

    def __str__(self):
        return f"{self.name} (Note)"
