document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe normalmente

    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/register', {
            method: 'POST',  // Usamos POST para enviar los datos de registro
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })  // Enviamos el JSON con los datos
        });

        const data = await response.json();

        if (data.status === 'User Registered') {
            alert('Usuario registrado con éxito');
            window.location.href = "/frontend/login.html";  // Redirigir al login después del registro
        } else {
            alert('Error en el registro');
        }
    } catch (error) {
        console.error('Error:', error);
    }
});
