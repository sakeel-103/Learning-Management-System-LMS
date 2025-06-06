# Generated by Django 5.2.1 on 2025-05-28 06:40

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('course_class', '0001_initial'),
    ]

    operations = [
        migrations.RenameField(
            model_name='course',
            old_name='category',
            new_name='Category',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='description',
            new_name='Course_Description',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='duration',
            new_name='Duration',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='instructor',
            new_name='Istructor',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='level',
            new_name='Level',
        ),
        migrations.RenameField(
            model_name='course',
            old_name='title',
            new_name='Title',
        ),
        migrations.RemoveField(
            model_name='course',
            name='prerequisites',
        ),
    ]
