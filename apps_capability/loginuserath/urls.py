from django.conf.urls import url, include
from .views import signin

urlpatterns = [
    url(r'^userlogin/',signin, name="userlogin"),
    # url(r'^userlogout/',logout, name="userlogout")
]