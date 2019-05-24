from django.conf.urls import url, include
from rest_framework import routers
from rest_framework.urlpatterns import format_suffix_patterns
# from .views import *
from app_question import views

# Routers provide an easy way of automatically determining the URL conf.
router = routers.DefaultRouter()
router.register(r'top',views.qu_top)
router.register(r'typ',views.qu_typ)
router.register(r'comp',views.qu_comp)
router.register(r'addqadata',views.add_questiondata)
router.register(r'addchoiceqa',views.add_choiceqa)

urlpatterns = [
    url(r'^', include(router.urls)),
    url(r'^type/',views.question_typeList, name='type-list'),
    url(r'^typeid/(?P<pk>[0-9]+)/',views.question_typeUpdate, name='type-update'),
    url(r'^topic/',views.question_topicList, name='topic-list'),
    url(r'^topicid/(?P<pk>[0-9]+)/',views.question_topicUpdate, name='topic-update'),
    url(r'^complexity/',views.question_complexList, name='complex-list'),
    url(r'^complexityid/(?P<pk>[0-9]+)/',views.question_complexUpdate, name='complex-update'),
    url(r'^getquestion/',views.add_questionList, name='getquestion-list'),
    # url(r'^addquestionid/(?P<pk>[0-9]+)/',views.add_questionUpdate, name='addquestion-update'),
    url(r'^addquestionchoiceans/',views.add_qac, name='addchoices'),
    url(r'^editquestionchoiceans/(?P<quesid>[0-9]+)/',views.getquestion_choice_ans),
    url(r'^updatequestionchoiceans/(?P<quesid>[0-9]+)/',views.update_question_choiceans),
    url(r'^topicdetails/(?P<topname>[\w\-]+)/',views.tiletopicdata)
]