document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('authorized')) {
        window.location.href = 'index.html';
        return;
    }

    const filter = document.getElementById('gender-filter');
    const container = document.getElementById('athletes-container');

    filter.addEventListener('change', fetchAthletes);

    function fetchAthletes() {
        const gender = filter.value;
        let url;

        switch (gender) {
            case 'masculino':
                url = 'https://botafogo-atletas.mange.li/2024-1/masculino';
                break;
            case 'feminino':
                url = 'https://botafogo-atletas.mange.li/2024-1/feminino';
                break;
            default:
                url = 'https://botafogo-atletas.mange.li/2024-1/all';
        }

        fetch(url)
            .then(response => response.json())
            .then(data => {
                container.innerHTML = '';
                data.forEach(athlete => {
                    const card = document.createElement('div');
                    card.classList.add('athlete-card');
                    card.innerHTML = `<h2>${athlete.name}</h2>`;
                    card.addEventListener('click', () => {
                        window.location.href = `details.html?id=${athlete.id}`;
                    });
                    container.appendChild(card);
                });
            })
            .catch(error => {
                console.error('Erro ao obter os dados:', error);
                container.innerHTML = 'Erro ao carregar a lista de atletas.';
            });
    }

    fetchAthletes();
});

// details.js
document.addEventListener('DOMContentLoaded', function() {
    if (!localStorage.getItem('authorized')) {
        window.location.href = 'index.html';
        return;
    }

    const urlParams = new URLSearchParams(window.location.search);
    const athleteId = urlParams.get('id');
    const container = document.getElementById('athlete-details-container');

    if (!athleteId) {
        container.innerHTML = 'ID do atleta não fornecido.';
        return;
    }

    fetch(`https://botafogo-atletas.mange.li/2024-1/${athleteId}`)
        .then(response => response.json())
        .then(data => {
            container.innerHTML = `
                <h2>${data.name}</h2>
                <p>Detalhes do atleta aqui...</p>
            `;
        })
        .catch(error => {
            console.error('Erro ao obter os dados:', error);
            container.innerHTML = 'Erro ao carregar os detalhes do atleta.';
        });
});
