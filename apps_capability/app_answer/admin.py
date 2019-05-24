# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.contrib import admin
from .models import question_answer

# Register your models here.

class question_answerAdmin(admin.ModelAdmin):
    list_display = ('user_questionname', 'user_choicename', 'user_status')
    def user_status(self,obj):
        st = obj.status
        if st == 0:
            return 'Active'
        if st == 1:
            return 'Inactive'
    def user_questionname(self,obj):
        return obj.questionname
    def user_choicename(self,obj):
        return obj.choicename

    user_status.short_description = 'Status'
    user_questionname.short_description = 'Question'
    user_choicename.short_description = 'Answer'
admin.site.register(question_answer, question_answerAdmin)
