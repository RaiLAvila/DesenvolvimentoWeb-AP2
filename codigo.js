import { hex_sha256 } from "./sha256-min.mjs"

if (localStorage.getItem('authorized')){
    document.body.innerHTML = `
<header style="background-color: rgb(0, 97, 60); 
    padding: 0.9em 1em; position: relative; display: flex;
    flex-direction: row;"><h1 style="color: white; margin: 
    0px; flex-grow: 1;">Elenco Botafogo 2024</h1><button id="logout"
    style="background-color: rgb(0, 97, 60); border: none; color: white;
    text-align: center; text-decoration: none; padding: 0.9em 1em;
    cursor: pointer;">Logout</button></header>    
</header>

<img src="https://www.netflu.com.br/wp-content/uploads/2020/07/nelson-mufarrej-e-mario-bittencourt-850x500-1.jpeg" alt="Taça Gerson e Didi width: "50%"> 
<img src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgh5aj3hFaAO1d6VsJOh9BAsBu4FR8tKWbFNznCi7AXmqrG8wQJCHf82FEWC3vbOLBEWtR6jsVU2meDC3h3YJdKUIw4GuCB04BuVkQ5gK9-TANtLoBO4iG8zn24LoFItf4ojry-s6WEiio/s1600/Cumprimento-Botafogo-Fluminense.jpg" alt="Fluminense e Botafogo"width: "50%">

<h1>Filtros</h1>

    ` 
    document.getElementById('logout').onclick = () =>{
        localStorage.removeItem('authorized');
        window.location.href= 'index.html';
     }
     
     let dados;
     
     const divPesquisa = document.createElement('div');
     divPesquisa.style.textAlign = 'center';
     divPesquisa.style.padding = '5px';
     divPesquisa.style.cssText=`
    text-align: center;
    margin: 0px auto 2em;
    padding: 5px;
     `;

     
     
     const container = document.createElement("div")
     const divBotao = document.createElement("div")
     const botaoTodos = document.createElement("button")
     const botaoFem = document.createElement("button")
     const botaoMas = document.createElement("button")
     divBotao.style.display = "flex";
     divBotao.style.flex = "colunm"
     divBotao.style.gap = "10px"
     divBotao.style.justifyContent = "center"
     botaoTodos.classList.add("button");
     botaoTodos.innerHTML = "Todos";
     botaoTodos.style.display = "flex";
     botaoTodos.style.justifyContent = "center";
     botaoTodos.style.gap = "1.5em";
     botaoTodos.style.margin = "2.4em 0px";

     botaoFem.classList.add("button");
     botaoFem.innerHTML = "Feminino";
     botaoFem.style.display = "flex";
     botaoFem.style.justifyContent = "center";
     botaoFem.style.gap = "1.5em";
     botaoFem.style.margin = "2.4em 0px";

     botaoMas.classList.add("button");
     botaoMas.innerHTML = "Masculino";
     botaoMas.style.display = "flex";
     botaoMas.style.justifyContent = "center";
     botaoMas.style.gap = "1.5em";
     botaoMas.style.margin = "2.4em 0px";

     const inputPesquisa = document.createElement('input');
     inputPesquisa.type = 'search';
     inputPesquisa.placeholder = "Busque o jogador"
     inputPesquisa.style.cssText = `
     text-align: center;
     line-height: 3em;
     max-width: 80%;
     width: 30em;
     `;

     divBotao.appendChild(botaoMas)
     divBotao.appendChild(botaoFem)
     divBotao.appendChild(botaoTodos)
     divPesquisa.appendChild(divBotao)
     divPesquisa.appendChild(inputPesquisa);

     document.body.appendChild(divPesquisa);
     
     const conteudo = document.createElement('div');
     conteudo.style.display = 'flex';
     conteudo.style.flexWrap = 'wrap';
     conteudo.style.justifyContent = 'center';
     conteudo.style.alignItems = 'center';
     conteudo.style.gap = '10px';
     conteudo.innerHTML = 'Loading...';
     
     document.body.appendChild(conteudo);
     
     const montaCard = (entrada) => {
         const card = document.createElement('div');
         card.style.display = 'grid';
         card.style.gridTemplateColumns = '1fr 2fr';
         card.style.backgroundColor = "rgb(0, 97, 60)";
         card.style.gridTemplateAreas = `
         "a1 a2"
         "a1 a3"
         "a4 a4"
         "a5 a5"
         "a6 a6"
         `;
         card.style.height = '25rem';
         card.style.border = 'solid';
         card.style.padding = '.2rem';
         
         const imgContainer = document.createElement('div');
         imgContainer.style.gridArea = 'a1';
         imgContainer.style.display = 'flex';
         imgContainer.style.alignItems = 'center';
         imgContainer.style.justifyContent = 'center';
         
         const imagem = document.createElement('img');
         imagem.src = entrada.imagem;
         imagem.alt = `Foto de ${entrada.nome}`;
         imagem.style.width = '200px';
         imagem.style.height = '100%';
         imagem.style.objectFit = 'cover';
        
         const posicao = document.createElement('p');
         posicao.innerHTML = entrada.posicao;
         posicao.style.cssText = `
         grid-area: a2;
         display: flex;
         text-transform: uppercase;
         margin: 10px;
         `;    
         posicao.style.gridArea = 'a2';
         posicao.style.display = 'flex';
         posicao.style.fontWeight = 'bold';
         
         posicao.style.textTransform=  'uppercase';
         
         const nome = document.createElement('p');
         nome.innerHTML = entrada.nome;
         nome.className = 'nome';
         nome.style.top = '0';
         nome.style.left = '0';
         nome.style.margin = '10px';
         nome.style.gridArea = 'a3';
         nome.style.display = 'flex';
         nome.style.gap = "5px"
         nome.style.fontWeight = 'bold';

         const descricao = document.createElement('p');
         /*descricao.innerHTML = entrada.detalhes;*/
         descricao.style.gridArea = 'a4';
         
        const detalhesContainer = document.createElement('div');
        detalhesContainer.style.position = 'fixed';
        detalhesContainer.style.top = '0';
        detalhesContainer.style.left = '0';
        detalhesContainer.style.width = '100%';
        detalhesContainer.style.height = '100%';
        detalhesContainer.style.backgroundColor = 'rgba(0, 0, 0, 0.8)';
        detalhesContainer.style.display = 'none';
        detalhesContainer.style.justifyContent = 'center';
        detalhesContainer.style.alignItems = 'center';
        detalhesContainer.style.zIndex = '9999'; 

        const imagemAmpliada = document.createElement('img');
        imagemAmpliada.style.width = '400px'; 
        imagemAmpliada.style.height = 'auto'; 
        imagemAmpliada.style.objectFit = 'contain'; 

        const detalhesAmpliados = document.createElement('div');
        detalhesAmpliados.style.color = '#fffff'; 
        detalhesAmpliados.style.marginTop = '10px'; 
        detalhesAmpliados.style.textAlign = 'center'; 

        const nascimento = document.createElement('p');
        nascimento.innerHTML = entrada.nascimento;
        nascimento.style.gridArea = 'a5';
        nascimento.style.top = '0';
        nascimento.style.left = '0';
        nascimento.style.margin = '10px';
        nascimento.style.display = 'flex';
        nascimento.style.gap = "5px"
        nascimento.style.fontWeight = 'bold';

        const detalhesButton = document.createElement('button');
        detalhesButton.innerHTML = 'Detalhes';
        detalhesButton.style.gridArea = 'a6';
        detalhesButton.style.backgroundColor = "rgb(fffffff)";
        detalhesButton.style.fontWeight = 'bold';
        detalhesButton.style.textAlign = "center";
        detalhesButton.style.cursor =  "pointer";
        detalhesButton.style.border = 'none';
        detalhesButton.style.padding = '1px 2px';
        detalhesButton.style.width = "8.5rem";
        detalhesButton.style.borderRadius = '5px';
        detalhesButton.style.fontSize = "1.5em";
        detalhesButton.style.border = "none";
        detalhesButton.style.transition = "transform 0.3s";

        detalhesButton.classList.add('detalhes-button');
        detalhesButton.addEventListener('click', (event) => {
        if (event.target === detalhesContainer) {
        detalhesContainer.style.display = 'none';
    }

        
        // Mostrar os detalhes ampliados
        detalhesContainer.style.display = 'flex';

        imagemAmpliada.scr = imagem;
        detalhesAmpliados.innerHTML = `
        <h2>${nome}</h2>
        <p>Posição: ${posicao}</p>
        <p>Nascimento: ${nascimento}</p>
        <p>Descrição: ${descricao}</p>
        `;

        detalhesContainer.appendChild(imagemAmpliada);
        detalhesContainer.appendChild(detalhesAmpliados);
        document.body.appendChild(detalhesContainer);


    });
        
        card.appendChild(imgContainer);
        imgContainer.appendChild(imagem);
        card.appendChild(posicao);
        card.appendChild(nome);
        card.appendChild(descricao);
        card.appendChild(nascimento);
        card.appendChild(detalhesButton);
         
         return card;
        }
        
        inputPesquisa.onkeyup = (ev) => {
            console.log(ev.target.value);
            
            if (ev.target.value.length > 3){
                
                const filtrado = dados.filter(
                    (elemento) => {
                        const estaNoNome = elemento.nome.toLowerCase().includes(ev.target.value.toLowerCase())
                        const estaNaPosicao = elemento.posicao.toLowerCase().includes(ev.target.value.toLowerCase())
                        return estaNoNome || estaNaPosicao
                    }
                    )
                    
                    conteudo.innerHTML = '';
                    
                    filtrado.forEach(
                        (atleta) => (
                            conteudo.appendChild(montaCard(atleta))
                            )
                            )
    }
}

const pegaDados = async(caminho) => {
    const resposta = await fetch(caminho);
    const dados = await resposta.json();
    return dados;
}

pegaDados("https://botafogo-atletas.mange.li/2024-1/all").then(
    (entrada) => {
        dados = entrada;
        conteudo.innerHTML = '';
        dados.forEach(
            (atleta) => {
                conteudo.appendChild(montaCard(atleta))
            }
            )
        });
        
        console.log('sincrono');
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
}

