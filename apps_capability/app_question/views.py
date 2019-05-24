# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.shortcuts import render

# Create your views here.
from django.http import HttpResponse
from django.shortcuts import get_object_or_404
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import question_topic, question_type, question_choices, question_complexity, app_question
from rest_framework import viewsets, generics, permissions, status
from .serializers import Question_topicSerializer,  Question_typeSerializer, Question_complexSerializer, Add_questionSerializer, Choice_questionSerializer ,Add_questionSerializertwo, Add_questionSerializerquery, Add_qa,Qu_topic, Qu_type, Qu_complex
from rest_framework.decorators import api_view, action
from django.views.decorators.csrf import csrf_exempt
from app_answer.models import question_answer
import json
from itertools import izip
# -------------------Question_Type Api------------------------------------------------------
# creating view function for post and get method through serializers
@csrf_exempt
@api_view(['GET','POST'])
def question_typeList(request):
    if request.method == 'GET':
        # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
        queryset = question_type.objects.all() #query for getting all set of data
        serializer_class = Question_typeSerializer(queryset, many=True) #passing data to serializer to convert it to json
        return Response(serializer_class.data)
        
    elif request.method == 'POST':
        # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
        serializer = Question_typeSerializer(data=request.data) #getting json data and passing to serializer
        if serializer.is_valid():
            serializer.save()                                  # saving it to database
            return Response(serializer.data,status.HTTP_201_CREATED) #success response 
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #failure response

# creating function for update get and delete for this required perticular id object
@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def question_typeUpdate(request,pk):
    try:
        questiontyp = question_type.objects.get(id=pk) #getting the obj of perticular id
    
        if request.method == 'GET':
            # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
            serializer=Question_typeSerializer(questiontyp) # passing query for the serializer
            return Response(serializer.data) #gives the json formate of the query
        elif request.method == 'PUT':
            # permission_classes = (permissions.IsAuthenticatedOrReadOnly,)
            serializer=Question_typeSerializer(questiontyp, data=request.data) #passing query and data to serializer to covrt json to dict
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data) # success response
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST) #failure response
        # elif request.method == 'DELETE':
        #     questiontyp.delete()
        #     return Response(status=status.HTTP_204_NO_CONTENT)
    except question_type.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


# -------------------------------Question TopicList Api-----------------------------------------------------
@csrf_exempt
@api_view(['GET','POST'])
def question_topicList(request):
    if request.method == 'GET':
        queryset = question_topic.objects.all()
        serializer_class = Question_topicSerializer(queryset, many=True)
        return Response(serializer_class.data)
    elif request.method == 'POST':
        serializer = Question_topicSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def question_topicUpdate(request,pk):
    try:
        questiontyp = question_topic.objects.get(id=pk)
    
        if request.method == 'GET':
            serializer=Question_topicSerializer(questiontyp)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer=Question_topicSerializer(questiontyp, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # elif request.method == 'DELETE':
        #     questiontyp.delete()
        #     return Response(status=status.HTTP_204_NO_CONTENT)
    except question_topic.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)


# ------------------------Question Complexity Api-------------------------------------------------------
@csrf_exempt
@api_view(['POST','GET'])
def question_complexList(request):
    if request.method == 'GET':
        queryset = question_complexity.objects.all()
        serializer_class = Question_complexSerializer(queryset, many=True)
        return Response(serializer_class.data)

    elif request.method == 'POST':
        serializer = Question_complexSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def question_complexUpdate(request,pk):
    try:
        questiontyp = question_complexity.objects.get(id=pk)
    
        if request.method == 'GET':
            serializer=Question_complexSerializer(questiontyp)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer=Question_complexSerializer(questiontyp, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # elif request.method == 'DELETE':
        #     questiontyp.delete()
        #     return Response(status=status.HTTP_204_NO_CONTENT)
    except question_complexity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# -----------------------Adding Question Api-------------------------------------------------------
@csrf_exempt
@api_view(['GET','POST'])
def add_questionList(request):
    if request.method == 'GET':
        queryset = app_question.objects.all()
        serializer = Add_questionSerializer(queryset,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer = Add_questionSerializerquery(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data,status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

@csrf_exempt
@api_view(['POST'])
def add_qac(request):
    if request.method == 'POST':
        data = request.data
        # print data
        # print data['description']
        # print data['choices'],len(data['choices'])
        try:
            topicobj = question_topic.objects.get(name__iexact=data['questiontopic'])
            typobj = question_type.objects.get(acronym__iexact=data['questiontype'])
            compobj = question_complexity.objects.get(acronym__iexact=data['questioncomplexity'])
            # print compobj.id
            if data['image'] != None:
                addquestion = app_question.objects.create(description=data['description'],questiontype=typobj,questioncomplexity=compobj,questiontopic=topicobj,image=data['image'])
            else:
                addquestion = app_question.objects.create(description=data['description'],questiontype=typobj,questioncomplexity=compobj,questiontopic=topicobj)
            # print addquestion
            addquestion.save()
            if data['choices']:
                for i in range(0,len(data['choices'])):
                    # print data['choices'][i]['name']
                    choiceobj = question_choices.objects.create(name=data['choices'][i]['name'],question_id=addquestion)
                    choiceobj.save()
                    # print "after saving choice",choiceobj
                try:
                    choicobjects = question_choices.objects.filter(question_id=addquestion)
                    # print choicobjects
                    for i in range(0, len(data['answer'])):
                        print data['answer'][i]['name']
                        ans = data['answer'][i]['name']
                        for choiobj in choicobjects:
                            # print "filtered choice",choiobj
                            if choiobj.name == ans:
                                try:
                                    get_choiceobj = question_choices.objects.get(id=choiobj.id)
                                    addans = question_answer.objects.create(questionname=addquestion, choicename=get_choiceobj)
                                    addans.save()
                                    # print addans
                                    return Response(status=status.HTTP_201_CREATED)
                                except question_choices.DoesNotExist:
                                    return Response(status=status.HTTP_404_NOT_FOUND)
                except question_choices.DoesNotExist:
                    return Response(status=status.HTTP_404_NOT_FOUND)


            else:
                return Response( status=status.HTTP_201_CREATED)

        except question_topic.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_type.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_complexity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
@csrf_exempt
@api_view(['GET'])
def getquestion_choice_ans(request,quesid):
    if request.method == 'GET':
        try:
            quesinfo = app_question.objects.get(id=quesid)
            ques_choices = question_choices.objects.filter(question_id=quesinfo)
            ques_ans = question_answer.objects.filter(questionname=quesinfo)
            resp_dict = {}
            resp_dict['description'] = quesinfo.description
            resp_dict['questiontype'] = quesinfo.questiontype.name
            resp_dict['questioncomplexity'] = quesinfo.questioncomplexity.name
            resp_dict['questiontopic'] = quesinfo.questiontopic.name
            try:
                resp_dict['image'] = quesinfo.image.url
            except:
                resp_dict['image'] = None
            resp_dict['status'] = quesinfo.status
            choices = []
            for i in ques_choices:
                newdict = {}
                newdict['name']=i.name
                choices.append(newdict)
            resp_dict['choice']=choices
            answers = []
            for i in ques_ans:
                ans_dict ={}
                ans_dict['name'] = i.choicename.name
                answers.append(ans_dict)
            resp_dict['answer'] = answers
            data = json.dumps(resp_dict,indent=2, sort_keys=True)
            data2 = json.loads(data)
            # print data
            return Response(data2,status=status.HTTP_200_OK)

        except app_question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_choices.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_answer.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
@csrf_exempt
@api_view(['PUT'])
def update_question_choiceans(request,quesid):
    if request.method == 'PUT':
        data = request.data
        # print data
        # print data['questiontopic'], data['questiontype'], data['questioncomplexity']
        try:
            quesinfo = app_question.objects.get(id=quesid)
            # print quesinfo
            topicobj = question_topic.objects.get(name__iexact=data['questiontopic'])
            # print topicobj
            typobj = question_type.objects.get(name__iexact=data['questiontype'])
            # print typobj
            compobj = question_complexity.objects.get(acronym__iexact=data['questioncomplexity'])
            # print compobj
            ques_choices = question_choices.objects.filter(question_id=quesinfo)
            # print ques_choices
            ques_ans = question_answer.objects.filter(questionname=quesinfo)
            # print ques_ans
            quesinfo.description = data['description']
            quesinfo.questiontopic = topicobj
            quesinfo.questiontype = typobj
            quesinfo.questioncomplexity = compobj
            quesinfo.status = data['status']
            if quesinfo.image != None or 'null':
                quesinfo.image = data['image']
            # print quesinfo

            for i in range(0,len(ques_choices)):
                if i == 0:
                    chid = ques_choices[i].id
                    try:
                        choiceobj = question_choices.objects.get(id=chid)
                        choiceobj.name = data['choice'][0]['name']
                        choiceobj.save()
                        # print choiceobj
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 1:
                    chid = ques_choices[i].id
                    try:
                        choiceobj = question_choices.objects.get(id=chid)
                        choiceobj.name = data['choice'][1]['name']
                        choiceobj.save()
                        # print choiceobj
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 2:
                    chid = ques_choices[i].id
                    try:
                        choiceobj = question_choices.objects.get(id=chid)
                        choiceobj.name = data['choice'][2]['name']
                        choiceobj.save()
                        # print choiceobj
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 3:
                    chid = ques_choices[i].id
                    try:
                        choiceobj = question_choices.objects.get(id=chid)
                        choiceobj.name = data['choice'][3]['name']
                        choiceobj.save()
                        # print choiceobj
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)

            for i in range(0, len(ques_ans)):
                if i == 0:
                    ansid = ques_ans[i].id
                    try:
                        ansobj = question_answer.objects.get(id=ansid)
                        choiceobj = question_choices.objects.get(name__iexact=data['answer'][0]['name'])
                        ansobj.choicename = choiceobj
                        ansobj.save()
                        # print ansobj
                    except question_answer.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 1:
                    ansid = ques_ans[i].id
                    try:
                        ansobj = question_answer.objects.get(id=ansid)
                        choiceobj = question_choices.objects.get(name__iexact=data['answer'][1]['name'])
                        ansobj.choicename = choiceobj
                        ansobj.save()
                        # print ansobj
                    except question_answer.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 2:
                    ansid = ques_ans[i].id
                    try:
                        ansobj = question_answer.objects.get(id=ansid)
                        choiceobj = question_choices.objects.get(name__iexact=data['answer'][2]['name'])
                        ansobj.choicename = choiceobj
                        ansobj.save()
                        # print ansobj
                    except question_answer.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                elif i == 3:
                    ansid = ques_ans[i].id
                    try:
                        ansobj = question_answer.objects.get(id=ansid)
                        choiceobj = question_choices.objects.get(name__iexact=data['answer'][3]['name'])
                        ansobj.choicename = choiceobj
                        ansobj.save()
                        # print ansobj
                    except question_answer.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
                    except question_choices.DoesNotExist:
                        return Response(status=status.HTTP_404_NOT_FOUND)
            return Response(status=status.HTTP_205_RESET_CONTENT)
        except app_question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_topic.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_type.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_complexity.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except question_choices.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)

    else:
        return Response(status=status.HTTP_400_BAD_REQUEST)
# class Add_questiondataView(viewsets.ModelViewSet):
#     serializer_class = Add_questionSerializertwo
#     queryset = app_question.objects.all()
#     lookup_field = 'id'

@csrf_exempt
@api_view(['GET'])
def tiletopicdata(request,topname):
    if request.method == 'GET':
        try:
            topinstance = question_topic.objects.get(name__iexact=topname)
            ques_topdetail = app_question.objects.filter(questiontopic=topinstance)
            totalques_top = ques_topdetail.count()
            # print ques_topdetail,totalques_top
            details = {}
            topiclist = []
            totalques = []
            totaldict = {}
            totaldict['total'] = totalques_top
            totalques.append(totaldict)
            details['totalques'] = totalques
            for topobj in ques_topdetail:
                topnewdict = {}
                topnewdict['id'] = topobj.id
                topnewdict['description'] = topobj.description
                topnewdict['questiontype_name'] = topobj.questiontype.name
                topnewdict['questioncomplexity_name'] = topobj.questioncomplexity.name
                topnewdict['questiontopic_name'] = topobj.questiontopic.name
                try:
                    topnewdict['image'] = quesinfo.image.url
                except:
                    topnewdict['image'] = None
                topnewdict['status'] = topobj.status
                topiclist.append(topnewdict)
            # print topiclist
            details['topiclistques'] = topiclist
            data = json.dumps(details, indent=2, sort_keys=True)
            data2 = json.loads(data)
            # print data2
            return Response(data2,status=status.HTTP_200_OK)
        except question_topic.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
        except app_question.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
#     @action(detail=True, methods=['GET'])
#     def question_choice(self,request,id=None):
#         question_id = self.get_object()
#         question_choice = question_choices.objects.filter(question_id=question_id)
#         serializer = Choice_questionSerializer(question_choice,many=True,context={'request': request})
#         return Response(serializer.data, status=status.HTTP_200_OK)
    # @action(details=True,method=['POST'])
    # def question_choice(self,request,id=None):

# @api_view(['GET','POST'])
# def add_questiondata(request):
#     queryset = app_question.objects.all()
#     lookup_field = 'id'
#     if request.method == 'GET':
        
#         # querysetchoice = question_choices.all()
#         serializer = Add_qa(queryset,many=True)
#         # serializerchoice = Choice_questionSerializer(querysetchoice,many=True)
#         return Response(serializer.data)
#     elif request.method == 'POST':
#         serializer = Add_qa(data=request.data)
#         if serializer.is_valid():
#             serializer.save()
#             return Response(serializer.data,status=status.HTTP_201_CREATED)
#         return Response(serializer.errors, status=status.HTTP_404_NOT_FOUND)

class qu_top(viewsets.ModelViewSet):
    queryset = question_topic.objects.all()
    serializer_class = Qu_topic

class qu_typ(viewsets.ModelViewSet):
    queryset = question_type.objects.all()
    serializer_class = Qu_type

class qu_comp(viewsets.ModelViewSet):
    queryset = question_complexity.objects.all()
    serializer_class = Qu_complex

class add_questiondata(viewsets.ModelViewSet):
    queryset = app_question.objects.all()
    serializer_class = Add_qa

class add_choiceqa(viewsets.ModelViewSet):
    queryset=question_choices.objects.all()
    serializer_class = Choice_questionSerializer
    
@csrf_exempt
@api_view(['GET','PUT','DELETE'])
def add_questionUpdate(request,pk):

    try:
        addquestions = app_question.objects.get(id=pk)
    
        if request.method == 'GET':
            serializer=Add_questionSerializer(addquestions)
            return Response(serializer.data)
        elif request.method == 'PUT':
            serializer=Add_questionSerializer(addquestions, data=request.data)
            if serializer.is_valid():
                serializer.save()
                return Response(serializer.data)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
        # elif request.method == 'DELETE':
        #     addquestions.delete()
        #     return Response(status=status.HTTP_204_NO_CONTENT)
    except question_complexity.DoesNotExist:
        return Response(status=status.HTTP_404_NOT_FOUND)

# ---------------------------------Getting question type---------------------------------
# @api_view(['GET','POST'])
# def getchoice_id(request):
#     if request.method == 'POST':


# -----------------------------------Adding choices------------------------------------------
@csrf_exempt
@api_view(['GET','POST'])
def add_choices(request):
    if request.method == 'GET':
        queryset = question_choices.objects.all()
        serializer = Choice_questionSerializer(queryset,many=True)
        return Response(serializer.data)
    elif request.method == 'POST':
        serializer_choice = Choice_questionSerializer(data=request.data)
        if serializer_choice.is_valid() :
            serializer_choice.save()
            return Response(serializer_choice.data,status.HTTP_201_CREATED)
        return Response(serializer_choice.errors, status=status.HTTP_400_BAD_REQUEST)