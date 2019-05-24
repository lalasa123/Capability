# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models

# Create your models here.
from app_question.models import app_question, question_choices
# Create your models here.
class AnswerDataModel(models.Model):
    class Meta:
        app_label='Answer'
        abstract = True
class question_answer(AnswerDataModel):
    questionname = models.ForeignKey(app_question, on_delete=models.CASCADE, null=True, blank=True, related_name="questionname")
    choicename = models.ForeignKey(question_choices,on_delete=models.CASCADE, null=True, blank=True, related_name="choicename")
    status = models.SmallIntegerField(default=0)

    def __str__( self,):
        return str(self.choicename.name)
    class Meta:
        verbose_name_plural = "Question-Asnswer"