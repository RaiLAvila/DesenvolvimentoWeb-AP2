window.addEventListener('DOMContentLoaded', () => {
    // Obter o ID do atleta da URL
    const urlParams = new URLSearchParams(window.location.search);
    const atletaId = urlParams.get('id');

    // Fazer a chamada para obter os detalhes do atleta
    fetch(`https://botafogo-atletas.mange.li/2024-1/${atletaId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Erro ao obter detalhes do atleta');
            }
            return response.json();
        })
        .then(data => {
            const detalhesContainer = document.getElementById('atleta-detalhes');
            // Exibir os detalhes do atleta no container
            detalhesContainer.innerHTML = `
                <h2>${data.nome}</h2>
                <p>Idade: ${data.idade}</p>
                <p>Posição: ${data.posicao}</p>
                <p>Clube: ${data.clube}</p>
            `;
        })
        .catch(error => {
            console.error('Erro:', error);
            const detalhesContainer = document.getElementById('atleta-detalhes');
            detalhesContainer.innerHTML = '<p>Erro ao carregar detalhes do atleta</p>';
        });
});
