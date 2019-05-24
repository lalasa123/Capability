from rest_framework import viewsets
from .models import question_answer
from .serializers import Answer_questionSerializer

class AnswerquestionViewSet(viewsets.ModelViewSet):
    queryset = question_answer.objects.all()
    serializer_class = Answer_questionSerializer