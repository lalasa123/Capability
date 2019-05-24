# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models
class QuestionDataModel(models.Model):
    class Meta:
        app_label='Question'
        abstract = True


# Create your models here.
class question_topic(QuestionDataModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    acronym = models.CharField(max_length=100, null=True, blank=True)
    status = models.SmallIntegerField(default=0)


    def __str__(self):
        return str(self.name)
    class Meta:
        verbose_name_plural = "Topic"


class question_complexity(QuestionDataModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    acronym = models.CharField(max_length=100, null=True, blank=True)
    status = models.SmallIntegerField(default=0)

    def __str__(self):
        return str(self.name)
    
    class Meta:
        verbose_name_plural = "Complexity"

class question_type(QuestionDataModel):
    name = models.CharField(max_length=100, null=True, blank=True)
    acronym = models.CharField(max_length=100, null=True, blank=True)
    status = models.SmallIntegerField(default=0)

    def __str__(self):
        return str(self.name)
    class Meta:
        verbose_name_plural = "Type"

class app_question(QuestionDataModel):
    description = models.CharField(max_length=5000)
    questiontype = models.ForeignKey(question_type, on_delete=models.CASCADE, null=True, blank=True, related_name="questiontype")
    questioncomplexity = models.ForeignKey(question_complexity, on_delete=models.CASCADE, null=True, blank=True, related_name="questioncomplex")
    questiontopic = models.ForeignKey(question_topic, on_delete=models.CASCADE, null=True, blank=True, related_name="questiontopic")
    image = models.ImageField(upload_to="images",  null=True, blank=True)
    status = models.SmallIntegerField(default=0)
    def __str__( self,):
        return str(self.description)
    class Meta:
        verbose_name_plural = "Questions"
        unique_together = ("questiontype", "questioncomplexity","questiontopic")
    # def __unicode__(self):
    #     return str(self.questiontype.acronym,self.questioncomplexity.acronym,self.questiontopic.acronym)
    
    # @property
    # def question_choices(self):
    #     return self.question_choices_set.all()


class question_choices(QuestionDataModel):
    name = models.CharField(max_length=60, null=True, blank=True)
    question_id = models.ForeignKey(app_question, related_name='Question_choices', on_delete=models.CASCADE)
    status = models.SmallIntegerField(default=0)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name_plural = "Question-Choice"