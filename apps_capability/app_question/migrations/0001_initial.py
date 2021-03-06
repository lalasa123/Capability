# -*- coding: utf-8 -*-
# Generated by Django 1.11 on 2019-03-25 06:25
from __future__ import unicode_literals

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='app_question',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('description', models.CharField(max_length=5000)),
                ('image', models.ImageField(blank=True, null=True, upload_to='images')),
                ('status', models.SmallIntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Questions',
            },
        ),
        migrations.CreateModel(
            name='question_choices',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=60, null=True)),
                ('status', models.SmallIntegerField(default=0)),
                ('question_id', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, related_name='Question_choices', to='app_question.app_question')),
            ],
            options={
                'verbose_name_plural': 'Question-Choice',
            },
        ),
        migrations.CreateModel(
            name='question_complexity',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('acronym', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.SmallIntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Complexity',
            },
        ),
        migrations.CreateModel(
            name='question_topic',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('acronym', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.SmallIntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Topic',
            },
        ),
        migrations.CreateModel(
            name='question_type',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('name', models.CharField(blank=True, max_length=100, null=True)),
                ('acronym', models.CharField(blank=True, max_length=100, null=True)),
                ('status', models.SmallIntegerField(default=0)),
            ],
            options={
                'verbose_name_plural': 'Type',
            },
        ),
        migrations.AddField(
            model_name='app_question',
            name='questioncomplexity',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questioncomplex', to='app_question.question_complexity'),
        ),
        migrations.AddField(
            model_name='app_question',
            name='questiontopic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questiontopic', to='app_question.question_topic'),
        ),
        migrations.AddField(
            model_name='app_question',
            name='questiontype',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='questiontype', to='app_question.question_type'),
        ),
        migrations.AlterUniqueTogether(
            name='app_question',
            unique_together=set([('questiontype', 'questioncomplexity', 'questiontopic')]),
        ),
    ]
