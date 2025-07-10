from django.contrib import admin
from django.urls import path
from users.views import CustomTokenObtainPairView,CustomTokenRefreshView,RegisterView


urlpatterns=[
    
    path('token/',CustomTokenObtainPairView.as_view(),name='token_obtain_pair'),
    path('token/refresh/',CustomTokenRefreshView.as_view(),name='token_refresh'),
    path('register/',RegisterView.as_view(),name='register')



]

