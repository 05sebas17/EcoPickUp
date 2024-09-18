document.getElementById('logoutButton').addEventListener('click', function(event) {
    event.preventDefault();

    localStorage.removeItem('authToken'); 

    window.location.href = '/frontend/login.html';
});
