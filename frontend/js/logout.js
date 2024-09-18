document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault(); // Evita que el enlace recargue la página

    // Elimina el token de autenticación o cualquier dato relevante
    localStorage.removeItem('authToken');  // O sessionStorage.removeItem('authToken')

    // Redirigir al login después de cerrar sesión
    window.location.href = '/frontend/login.html';
});
