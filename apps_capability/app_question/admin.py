# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import question_topic, question_complexity, question_type, question_choices, app_question
# Register your models here.

class qution_topicAdmin(admin.ModelAdmin):
    list_display = ('name', 'acronym', 'user_status')
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'

    user_status.short_description = 'Status'
admin.site.register(question_topic, qution_topicAdmin)

class question_typeAdmin(admin.ModelAdmin):
    list_display = ('name', 'acronym', 'user_status')
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'

    user_status.short_description = 'Status'
admin.site.register(question_type, question_typeAdmin)

class question_complexityAdmin(admin.ModelAdmin):
    list_display = ('name', 'acronym', 'user_status')
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'

    user_status.short_description = 'Status'
admin.site.register(question_complexity, question_complexityAdmin)


class add_questionAdmin(admin.ModelAdmin):
    list_display = ('user_description','user_questiontopic','user_questioncomplexity','user_questiontype', 'user_status')
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'
    def user_description(self,obj):
        return obj.description
    def user_questiontopic(self,obj):
        return obj.questiontopic
    def user_questioncomplexity(self,obj):
        return obj.questioncomplexity
    def user_questiontype(self,obj):
        return obj.questiontype

    user_status.short_description = 'Status'
    user_description.short_description = 'Question'
    user_questiontopic.short_description = 'Topic'
    user_questioncomplexity.short_description = 'Complexity'
    user_questiontype.short_description = 'Type'
admin.site.register(app_question, add_questionAdmin)

class question_choicesAdmin(admin.ModelAdmin):
    list_display = ('name', 'user_question_id', 'user_status')
    def user_question_id(self,obj):
        return obj.question_id
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'

    user_status.short_description = 'Status'
    user_question_id.short_description = 'Question'
admin.site.register(question_choices, question_choicesAdmin)
