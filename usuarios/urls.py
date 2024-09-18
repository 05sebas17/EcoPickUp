from django.urls import path
from . import views
from django.contrib.auth import views as auth_views

urlpatterns = [
    path('registro/', views.registro, name='registro'),
    path('programar-recogida/', views.programar_recogida, name='programar_recogida'),
    path('login/', auth_views.LoginView.as_view(template_name='usuarios/login.html'), name='login'),
    path('logout/', auth_views.LogoutView.as_view(), name='logout'),
]


urlpatterns = [
    path('registro/', views.registro, name='registro'),
    path('programar-recogida/', views.programar_recogida, name='programar_recogida'),
]

