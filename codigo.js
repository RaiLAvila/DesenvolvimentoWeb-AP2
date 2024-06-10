import { hex_sha256 } from "./sha256-min.mjs"

if (localStorage.getItem('authorized')){
    document.body.innerHTML = `
    <header style="background-color: rgb(0, 97, 60); height: 100px">
    <h1>Botafogo AP2</h1>
    <button id="logout">Logout</button>
    </header>
    <h1>aloooooo</h1>
    `  
     document.getElementById('logout').onclick = () =>{
        localStorage.removeItem('authorized');
        window.location.href= 'index.html';
     }
} 
else{

    document.body.innerHTML = `
    <h1>Login</h1>
    <label style= "color: white">
    Senha:
    <input type ="password" id="senha">
    </label>
    <button id="btn_login">Entrar</button>
    <h5 style= "color: white"> a senha é 456 </h5>`
    
}
    document.getElementById('btn_login').onclick = () => {
        const password = document.getElementById('senha').value;
    
    // Calcular hash SHA-256 da senha
    const hash = hex_sha256(password); // Supondo que você tenha uma função sha256 disponível

    // Comparar o hash com o hash esperado
    const expectedHash = 'b3a8e0e1f9ab1bfe3a36f231f676f78bb30a519d2b21e6c530c0eee8ebb4a5d0'; // Substitua pelo hash SHA-256 correto da senha
    if (hash === expectedHash) {
        localStorage.setItem('authorized', 'true');
        window.location.href = 'index.html'; // Redirecionar para a página de detalhes
    } else {
        alert('Senha incorreta');
    }
};
