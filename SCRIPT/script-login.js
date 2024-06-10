document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const hash = sha256(password);
    const expectedHash = '202cb962ac59075b964b07152d234b70';
    if (hash === expectedHash) {
        localStorage.setItem('authorized', 'true');
        window.location.href = 'main.html';
    } else {
        alert('Senha incorreta');
    }
});

function sha256(message) {
}
