from django.shortcuts import render, redirect
from django.contrib.auth import login
from .forms import RegistroForm



def registro(request):
    if request.method == 'POST':
        form = RegistroForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request, user)
            return redirect('home')
    else:
        form = RegistroForm()
    return render(request, 'usuarios/registro.html', {'form': form})

def programar_recogida(request):
    if request.method == 'POST':
        form = RecogidaForm(request.POST)
        if form.is_valid():
            recogida = form.save(commit=False)
            recogida.usuario = request.user
            recogida.save()
            return redirect('home')
    else:
        form = RecogidaForm()
    return render(request, 'usuarios/programar_recogida.html', {'form': form})
