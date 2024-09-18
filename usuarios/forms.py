from django import forms
from django.contrib.auth.forms import UserCreationForm
from django.contrib.auth.models import User

class RegistroForm(UserCreationForm):
    email = forms.EmailField(required=True)

    class Meta:
        model = User
        fields = ['username', 'email', 'password1', 'password2']

class RecogidaForm(forms.ModelForm):
    class Meta:
        model = Recogida
        fields = ['fecha_recogida', 'tipo_residuo']
