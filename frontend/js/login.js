document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe normalmente

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;
    const authToken = 'abc123';  // Supón que este token es recibido del servidor después del login
    localStorage.setItem('authToken', authToken);
    window.location.href = '/frontend/dashboard.html';


    try {
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',  // Usamos POST para enviar las credenciales
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })  // Datos enviados al servidor
        });

        const data = await response.json();  // Obtenemos la respuesta del servidor

        if (data.status === 'Success') {
            window.location.href = "/frontend/dashboard.html";  // Redirigir al dashboard
        } else {
            alert('Error en el inicio de sesión: Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
