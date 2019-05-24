from rest_framework import serializers
from .models import question_answer

class Answer_questionSerializer(serializers.HyperlinkedModelSerializer):
    # questionname_name = serializers.ReadOnlyField(source='questionname.description', read_only=True)
    # choicename_name = serializers.ReadOnlyField(source='choicename.name', read_only=True)
    class Meta:
        model = question_answer
        fields = ('id', 'questionname_name','choicename_name','status')