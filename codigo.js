import { hex_sha256 } from "./sha256-min.mjs"

if (localStorage.getItem('authorized')){
    document.body.innerHTML = `
    <header style="background-color: rgb(0, 97, 60); 
    padding: 0.5em 1em; position: relative; display: flex;
    flex-direction: row;"><h1 style="color: white; margin: 
    0px; flex-grow: 1;">Elenco Botafogo 2024</h1><button id="logout"
    style="background-color: rgb(0, 97, 60); border: none; color: white;
    text-align: center; text-decoration: none; padding: 0.5em 1em;
    cursor: pointer;">Logout</button></header>    <h1>Filtros</h1>
    </header>
    
    <div id="barra-escolhas" style="display: flex; flex-direction: 
    row; justify-content: center; gap: 1em; margin: 2em 0px;"><button id"masculino"
    style="background-color: rgb(0, 97, 60); border: none;
    color: white; text-align: center; text-decoration: none; padding: 
    0.4em 1em; cursor: pointer; font-size: 1.5em; max-width: 6em;">
    Masculino</button><button id="feminino" style="background-color:
    rgb(0, 97, 60); border: none; color: white; text-align: center;
    text-decoration: none; padding: 0.5em 1em; cursor: pointer; 
    font-size: 1.3em; max-width: 6em;">Feminino</button><button 
    id="todos" style="background-color: rgb(0, 97, 60); border: none; color:
    white; text-align: center; text-decoration: none; padding: 0.5em 
    1em; cursor: pointer; font-size: 1.3em; max-width: 6em;">Elenco
    Completo</button></div>
    ` 
    document.getElementById('masculino').onclick = () =>{
        localStorage.removeItem('authorized');
        window.location.href= 'detalhes.html';
     } 
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
