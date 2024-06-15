function atletaIdUrl() {
    const params = new URLSearchParams(window.location.search);
    return parseInt(params.get("id"), 10);
}

async function dadosJogadores(id) {
    try {
        const response = await fetch(`https://botafogo-atletas.mange.li/2024-1/${id}`);
        if (response.ok) {
            return await response.json();
        } else {
            console.error("Erro ao buscar o Jogador:", response.statusText);
            return null;
        }
    } catch (error) {
        console.error("Erro ao buscar o Jogador:", error);
        return null;
    }
}

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
    posicao.style.textTransform = 'uppercase';
    
    const nome = document.createElement('p');
    nome.innerHTML = entrada.nome;
    nome.className = 'nome';
    nome.style.top = '0';
    nome.style.left = '0';
    nome.style.margin = '10px';
    nome.style.gridArea = 'a3';
    nome.style.display = 'flex';
    nome.style.gap = "5px";
    nome.style.fontWeight = 'bold';
    
    const descricao = document.createElement('p');
    descricao.innerHTML = entrada.detalhes;
    descricao.style.gridArea = 'a4';
    
    const nascimento = document.createElement('p');
    nascimento.innerHTML = entrada.nascimento;
    nascimento.style.gridArea = 'a5';
    nascimento.style.top = '0';
    nascimento.style.left = '0';
    nascimento.style.margin = '10px';
    nascimento.style.display = 'flex';
    nascimento.style.gap = "5px";
    nascimento.style.fontWeight = 'bold';
    
    const voltar = document.createElement('button');
    voltar.innerHTML = 'Voltar';
    voltar.style.gridArea = 'a6';
    voltar.style.backgroundColor = "rgb(255, 255, 255)";
    voltar.style.fontWeight = 'bold';
    voltar.style.textAlign = "center";
    voltar.style.cursor = "pointer";
    voltar.style.border = 'none';
    voltar.style.padding = '1px 2px';
    voltar.style.width = "8.5rem";
    voltar.style.borderRadius = '5px';
    voltar.style.fontSize = "1.5em";
    voltar.style.transition = "transform 0.3s";
    
    voltar.classList.add('voltar');
    voltar.onclick = () => {
        window.location.href = `index.html`;
    };
    
    card.appendChild(imgContainer);
    imgContainer.appendChild(imagem);
    card.appendChild(posicao);
    card.appendChild(nome);
    card.appendChild(descricao);
    card.appendChild(nascimento);
    card.appendChild(voltar);
    
    return card;
}
if (localStorage.getItem('authorized')){

    
    (async () => {
    const atletaId = atletaIdUrl();
    const atleta = await dadosJogadores(atletaId);
    if (atleta) {
        const card = montaCard(atleta);
        conteudo.innerHTML = ''; 
        conteudo.appendChild(card);
    } else {
        conteudo.innerHTML = 'Erro ao carregar os dados do jogador.';
    }
})();
}
else {
    window.location.href = "index.html";
}
