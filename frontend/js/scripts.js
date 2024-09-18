import { registerUser, loginUser } from './apiService.js';

// Mostrar y Ocultar Secciones
document.getElementById('showRegister').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.hero-section').style.display = 'none';
    document.getElementById('registerSection').style.display = 'block';
});

document.getElementById('showLogin').addEventListener('click', function(event) {
    event.preventDefault();
    document.querySelector('.hero-section').style.display = 'none';
    document.getElementById('loginSection').style.display = 'block';
});

// Registro
document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const data = await registerUser(username, password);
        if (data.status === 'User Registered') {
            alert('Usuario registrado con éxito');
            document.getElementById('registerSection').style.display = 'none';
            document.getElementById('loginSection').style.display = 'block';
        } else {
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});

// Inicio de sesión
document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();
    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const data = await loginUser(username, password);
        if (data.status === 'Success') {
            // Redirigir automáticamente a la página de programación de recogida o dashboard
            window.location.href = "/frontend/dashboard.html";  // Cambia esta URL a la página que desees
        } else {
            alert('Error en el inicio de sesión');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
