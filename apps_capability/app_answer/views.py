# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from django.views.decorators.csrf import csrf_exempt
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import viewsets, generics, permissions, status
from rest_framework.decorators import api_view
from .models import app_question, question_answer
from .serializers import Answer_questionSerializer

# @csrf_exempt
# @api_view(['GET','POST'])
# def add_questionanswer(request):
#     if request.method == 'GET':
#         queryset = app_question.objects.all()
#         serializer = Answer_questionSerializer(queryset,many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = Answer_questionSerializer(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)
class add_qaans(viewsets.ModelViewSet):
    queryset = question_answer.objects.all()
    serializer_class = Answer_questionSerializer     