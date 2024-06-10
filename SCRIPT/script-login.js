document.getElementById('login-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const password = document.getElementById('password').value;
    const hash = sha256(password);
    const expectedHash = 'SENHA_HASH'; // A senha hash deve ser definida aqui
    if (hash === expectedHash) {
        localStorage.setItem('authorized', 'true');
        window.location.href = 'main.html';
    } else {
        alert('Senha incorreta');
    }
});

function sha256(message) {
}
