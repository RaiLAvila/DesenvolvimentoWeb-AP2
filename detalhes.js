async function fetchData(url) {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Erro ao buscar dados da API');
    }
    return await response.json();
}

async function createCard(data) {
    const nome = data.name;
    const posicao = data.position;
    const imagemUrl = data.image_url;

    const card = document.createElement('div');
    card.classList.add('card');

    const nomeElement = document.createElement('p');
    nomeElement.textContent = `Nome: ${nome}`;

    const posicaoElement = document.createElement('p');
    posicaoElement.textContent = `Posição: ${posicao}`;

    const imagemElement = document.createElement('img');
    imagemElement.src = imagemUrl;
    imagemElement.alt = 'Imagem do jogador';

    card.appendChild(nomeElement);
    card.appendChild(posicaoElement);
    card.appendChild(imagemElement);

    return card;
}

async function main() {
    const url = "https://botafogo-atletas.mange.li/2024-1/all"

    const container = document.getElementsByClassName('imagelayout'); // ID do container onde os cards serão adicionados

    try {
        const data = await fetchData(url);
        const card = await createCard(data);
        container.appendChild(card);
    } catch (error) {
        console.error(error);
    }
}

main();
