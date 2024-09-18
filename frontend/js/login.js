document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault();  // Evita que el formulario se envíe normalmente

    const username = document.getElementById('loginUsername').value;
    const password = document.getElementById('loginPassword').value;

    try {
        const response = await fetch('http://127.0.0.1:8000/login', {
            method: 'POST',  
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })  // Envia datos al servidor
        });

        const data = await response.json();

        if (data.status === 'Success') {
            const authToken = data.token || 'abc123';  
            localStorage.setItem('authToken', authToken);  
            window.location.href = "/frontend/dashboard.html";  
        } else {
            alert('Error en el inicio de sesión: Usuario o contraseña incorrectos');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('Hubo un problema al iniciar sesión. Intenta nuevamente.');
    }
});