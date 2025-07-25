# Generated by Django 5.2.1 on 2025-07-05 17:34

import django.db.models.deletion
import uuid
from django.conf import settings
from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('course_class', '0008_notematerial_pdfmaterial_presentationmaterial_and_more'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Question',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('question_text', models.TextField()),
                ('question_type', models.CharField(choices=[('mcq', 'Multiple Choice'), ('true_false', 'True/False'), ('fill_blank', 'Fill in the Blank'), ('essay', 'Essay')], default='mcq', max_length=20)),
                ('points', models.IntegerField(default=1)),
                ('order', models.IntegerField(default=0)),
                ('is_required', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
            ],
            options={
                'ordering': ['order', 'created_at'],
            },
        ),
        migrations.CreateModel(
            name='Assignment',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('assignment_type', models.CharField(choices=[('individual', 'Individual'), ('group', 'Group'), ('peer_review', 'Peer Review')], default='individual', max_length=20)),
                ('due_date', models.DateTimeField()),
                ('max_points', models.IntegerField(default=100)),
                ('instructions', models.TextField(blank=True)),
                ('rubric', models.JSONField(blank=True, default=dict)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignments', to='course_class.course')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='AssignmentSubmission',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('submission_file', models.FileField(blank=True, upload_to='assignments/')),
                ('submission_text', models.TextField(blank=True)),
                ('submitted_at', models.DateTimeField(auto_now_add=True)),
                ('graded_at', models.DateTimeField(blank=True, null=True)),
                ('score', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('feedback', models.TextField(blank=True)),
                ('status', models.CharField(choices=[('submitted', 'Submitted'), ('graded', 'Graded'), ('late', 'Late'), ('missing', 'Missing')], default='submitted', max_length=20)),
                ('is_late', models.BooleanField(default=False)),
                ('assignment', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='submissions', to='assessment.assignment')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='assignment_submissions', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-submitted_at'],
                'unique_together': {('user', 'assignment')},
            },
        ),
        migrations.CreateModel(
            name='Exam',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('exam_type', models.CharField(choices=[('midterm', 'Midterm'), ('final', 'Final'), ('practice', 'Practice'), ('certification', 'Certification')], default='practice', max_length=20)),
                ('time_limit', models.IntegerField(default=60, help_text='Time limit in minutes')),
                ('passing_score', models.IntegerField(default=70, help_text='Minimum score to pass (percentage)')),
                ('start_date', models.DateTimeField()),
                ('end_date', models.DateTimeField()),
                ('is_proctored', models.BooleanField(default=False)),
                ('allow_retakes', models.BooleanField(default=False)),
                ('max_attempts', models.IntegerField(default=1)),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exams', to='course_class.course')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.CreateModel(
            name='ExamAttempt',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('score', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('is_passed', models.BooleanField(default=False)),
                ('time_taken', models.IntegerField(blank=True, help_text='Time taken in seconds', null=True)),
                ('attempt_number', models.IntegerField(default=1)),
                ('exam', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attempts', to='assessment.exam')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='exam_attempts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-started_at'],
                'unique_together': {('user', 'exam', 'attempt_number')},
            },
        ),
        migrations.CreateModel(
            name='Choice',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('choice_text', models.CharField(max_length=500)),
                ('is_correct', models.BooleanField(default=False)),
                ('order', models.IntegerField(default=0)),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='choices', to='assessment.question')),
            ],
            options={
                'ordering': ['order'],
            },
        ),
        migrations.CreateModel(
            name='Quiz',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('quiz_type', models.CharField(choices=[('mcq', 'Multiple Choice'), ('true_false', 'True/False'), ('fill_blank', 'Fill in the Blank'), ('essay', 'Essay')], default='mcq', max_length=20)),
                ('time_limit', models.IntegerField(default=30, help_text='Time limit in minutes')),
                ('passing_score', models.IntegerField(default=70, help_text='Minimum score to pass (percentage)')),
                ('is_active', models.BooleanField(default=True)),
                ('created_at', models.DateTimeField(auto_now_add=True)),
                ('updated_at', models.DateTimeField(auto_now=True)),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quizzes', to='course_class.course')),
            ],
            options={
                'ordering': ['-created_at'],
            },
        ),
        migrations.AddField(
            model_name='question',
            name='quiz',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='questions', to='assessment.quiz'),
        ),
        migrations.CreateModel(
            name='QuizAttempt',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('started_at', models.DateTimeField(auto_now_add=True)),
                ('completed_at', models.DateTimeField(blank=True, null=True)),
                ('score', models.DecimalField(blank=True, decimal_places=2, max_digits=5, null=True)),
                ('is_passed', models.BooleanField(default=False)),
                ('time_taken', models.IntegerField(blank=True, help_text='Time taken in seconds', null=True)),
                ('quiz', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='attempts', to='assessment.quiz')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='quiz_attempts', to=settings.AUTH_USER_MODEL)),
            ],
            options={
                'ordering': ['-started_at'],
                'unique_together': {('user', 'quiz')},
            },
        ),
        migrations.CreateModel(
            name='Certificate',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('certificate_type', models.CharField(choices=[('course_completion', 'Course Completion'), ('quiz_certification', 'Quiz Certification'), ('exam_certification', 'Exam Certification'), ('assignment_certification', 'Assignment Certification')], default='course_completion', max_length=30)),
                ('title', models.CharField(max_length=200)),
                ('description', models.TextField()),
                ('issued_date', models.DateTimeField(auto_now_add=True)),
                ('expiry_date', models.DateTimeField(blank=True, null=True)),
                ('certificate_number', models.CharField(max_length=50, unique=True)),
                ('qr_code', models.ImageField(blank=True, upload_to='certificates/qr_codes/')),
                ('pdf_file', models.FileField(blank=True, upload_to='certificates/pdfs/')),
                ('is_valid', models.BooleanField(default=True)),
                ('assignment_submission', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='assessment.assignmentsubmission')),
                ('course', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certificates', to='course_class.course')),
                ('user', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='certificates', to=settings.AUTH_USER_MODEL)),
                ('exam_attempt', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='assessment.examattempt')),
                ('quiz_attempt', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='assessment.quizattempt')),
            ],
            options={
                'ordering': ['-issued_date'],
            },
        ),
        migrations.CreateModel(
            name='QuizResponse',
            fields=[
                ('id', models.UUIDField(default=uuid.uuid4, editable=False, primary_key=True, serialize=False)),
                ('text_response', models.TextField(blank=True)),
                ('is_correct', models.BooleanField(null=True)),
                ('points_earned', models.DecimalField(decimal_places=2, default=0, max_digits=5)),
                ('answered_at', models.DateTimeField(auto_now_add=True)),
                ('attempt', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='responses', to='assessment.quizattempt')),
                ('question', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='assessment.question')),
                ('selected_choices', models.ManyToManyField(blank=True, to='assessment.choice')),
            ],
        ),
    ]
