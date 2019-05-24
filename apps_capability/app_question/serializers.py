from rest_framework import serializers
from .models import question_topic, question_type, question_complexity, app_question, question_choices



# Serializers define the API representation.



class Question_topicSerializer(serializers.ModelSerializer):
    class Meta:
        model = question_topic
        fields = ('id','name','acronym','status')

class Question_typeSerializer(serializers.ModelSerializer):
    class Meta:
        model = question_type
        fields = '__all__'


class Question_complexSerializer(serializers.ModelSerializer):
    class Meta:
        model = question_complexity
        fields = '__all__'


class Add_questionSerializer(serializers.HyperlinkedModelSerializer):
    questiontype_name = serializers.CharField(source='questiontype.name', read_only=True)
    questioncomplexity_name = serializers.CharField(source='questioncomplexity.name', read_only=True)
    questiontopic_name = serializers.CharField(source='questiontopic.name', read_only=True)

    class Meta:
        model = app_question
        fields = ('id','description','questiontype_name', 'questioncomplexity_name', 'questiontopic_name','image','status')
    

class Choice_questionSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = question_choices
        fields = ('id','url','name','question_id','status')


class Add_questionSerializertwo(serializers.ModelSerializer):
    
    choices = Choice_questionSerializer(many=True)
    class Meta:
        model = app_question
        fields = ('id','description','questiontype', 'questioncomplexity', 'questiontopic','image','status','choices')
    def create(self,validated_data):
        choices = validated_data.pop('choices')
        question = app_question.objects.create(**validated_data)
        for choice in choices:
            try:
                choices.objects.create(question_id=question, **choice)
            except Exception as identifier:
                print identifier
             
        return question
class Qu_topic(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = question_topic
        fields = ('id','url','name','acronym','status')
class Qu_type(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = question_type
        fields = ('id','url','name','acronym','status')
class Qu_complex(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = question_complexity
        fields = ('id','url','name','acronym','status')
class Add_qa(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = app_question
        fields = ('id','url','description','questiontype', 'questioncomplexity', 'questiontopic','image','status')
    
class Add_questionSerializerquery(serializers.Serializer):
    # decription = serializers.CharField(max_length=5000)
    # questiontype = serializers.CharField()
    # questioncomplexity = serializers.CharField()
    # questiontopic = serializers.CharField()
    # def create(self, validated_data):
    #     questiontype = validated_data.get('questiontype')
    #     questioncomplexity = validated_data.get('questioncomplexity')
    #     questiontopic = validated_data.get('questiontopic')
    #     decription = validated_data.get('decription')
    #     print questiontype,questioncomplexity,questiontopic,decription
    #     questiontyp = question_topic.objects.get(name__iexact=questiontype)
    #     questioncomp = question_topic.objects.get(name__iexact=questioncomplexity)
    #     questiontop = question_topic.objects.get(name__iexact=questiontopic)
    #     questioncre = app_question.objects.create(description=decription,questiontype=questiontyp,questioncomplexity=questioncomp,questiontopic=questiontop)
    #     questioncre.save()
    #     return questioncre
    questiontype = serializers.SlugRelatedField(read_only=False, slug_field='name',
                                                queryset=question_type.objects.all())
    questioncomplexity = serializers.SlugRelatedField(read_only=False, slug_field='name',
                                                      queryset=question_complexity.objects.all())
    questiontopic = serializers.SlugRelatedField(read_only=False, slug_field='name',
                                                 queryset=question_topic.objects.all())

    class Meta:
        model = app_question
        fields = ('id', 'description', 'questiontype', 'questioncomplexity', 'questiontopic', 'image', 'status')

    def create(self, validated_data):
        questiontype_data = validated_data.pop('questiontype')
        questioncomplexity_data = validated_data('questioncomplexity')
        questiontopic_data = validated_data('questiontopic')
        name_type = questiontype_data.pop('name')
        name_complex = questioncomplexity_data.pop('name')
        name_topic = questiontopic_data.pop('name')
        questiontype = question_type.objects.get(name=name_type)
        questioncomplexity = question_complexity.objects.get(name=name_complex)
        questiontopic = question_topic.objects.get(name=name_type)
        question = app_question.objects.create(questiontype=questiontype, questioncomplexity=questioncomplexity,
                                               questiontopic=questiontopic, **validated_data)
        return question


    

    ###############################################################################################################################
    # def create(self,validated_data):
    #     questiontype_name = validated_data.pop('questiontype')
    #     questioncomplexity = validated_data.pop('questioncomplexity')
    #     questiontopic = validated_data.pop('questiontopic')
    #     questiontype_instance = question_type.objects.get(id=questiontype)
    #     questioncomplexity_instance = question_type.objects.get(id=questioncomplexity)
    #     questiontopic_instance = question_type.objects.get(id=questiontopic)
    #     question = app_question.objects.create(**validated_data)
    #     return question
    # questiontype = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # questioncomplexity = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # questiontopic = serializers.PrimaryKeyRelatedField(many=True, read_only=True)
    # def create(self,validated_data):
    #     typename = validated_data.pop('questiontype')
    #     complexname = validated_data.pop('questioncomplexity')  
    #     topicname = validated_data.pop('questiontopic')
    #     typename_instance, created = question_type.objects.get(name=typename)
    #     complexname_instance, created = question_complexity.objects.get(name=complexname)
    #     topicname_instance, created = question_topic.objects.get(name=topicname)
    #     appquestion = app_question.objects.create(questiontype=typename_instance,questioncomplexity=complexname_instance,questiontopic=topicname_instance,**validated_data)
    #     # appquestion.questiontype.set(typename_instance)
    #     # appquestion.questioncomplexity.set(complexname_instance)
    #     # appquestion.questiontopic.set(topicname_instance)
    #     # appquestion.save()
    #     # try:
    #     #     appquestion.questiontype = question_type.objects.get(name=typename,)
    #     # except question_type.DoesNotExist:
    #     #     pass
    #     # try:
    #     #     appquestion.questioncomplexity = question_complexity.objects.get(name=complexname)
    #     # except question_complexity.DoesNotExist:
    #     #     pass
    #     # try:
    #     #     appquestion.questiontopic = question_topic.objects.get(name=topicname)
    #     # except question_topic.DoesNotExist:
    #     #     pass
    #     return appquestion

