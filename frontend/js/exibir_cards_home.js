const feed_cards = document.querySelector('#feed_cards');

const API_URL = 'http://127.0.0.1:5000/home';

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const postagens = await response.json();
    show_cards(postagens);
    const cards = document.querySelectorAll('.feed_card');
    navegar_perfil(cards);    
})

function show_cards(cards) {
    feed_cards.innerHTML = ''
    cards.forEach(card => {
        if (cards.length == 2 && card == cards[1]) {   
            feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center" style="transform: translateY(0);" data-usuario="${card.usuario_id}">
                <div>
                    <a href="./outro-perfil.html" class="post_user d-flex align-items-center">
                        <img src="data:image/png;base64,${card.usuario_base64}" alt="perfil do usuario">
                        <p class="ps-3">@${card.usuario}</p>
                    </a>
                    <div class="d-flex align-items-center align-self-center my-2 post_receita">
                        <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem do usuario" class="lazy">
                    </div>
                    <div class="post_info d-flex justify-content-between align-items-center mb-5">
                        <p class="p-2">${card.categoria}</p>
                        <button class="btn_receita">
                            <img src="../assets/icon_receita.svg" alt="botao para ver receita">
                        </button>
                    </div>
                </div>
            </div>
            `
        } else {
            feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center" data-usuario="${card.usuario_id}">
                <div>
                    <a href="./outro-perfil.html" class="post_user d-flex align-items-center">
                        <img src="data:image/png;base64,${card.usuario_base64}" alt="perfil do usuario">
                        <p class="ps-3">@${card.usuario}</p>
                    </a>
                    <div class="d-flex align-items-center align-self-center my-2 post_receita">
                        <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem do usuario" class="lazy">
                    </div>
                    <div class="post_info d-flex justify-content-between align-items-center mb-5">
                        <p class="p-2">${card.categoria}</p>
                        <button class="btn_receita">
                            <img src="../assets/icon_receita.svg" alt="botao para ver receita">
                        </button>
                    </div>
                </div>
            </div>
            `
        }
    });
}

function navegar_perfil(cards) {
    cards.forEach(card => {
        card.addEventListener('click', e => {
            if ((card.dataset.usuario == sessionStorage.getItem('usuario') && e.target == card.firstChild)) {
                e.preventDefault();
                window.location.href = 'perfil.html';
            } else {
                sessionStorage.setItem('usuario-clicado', card.dataset.usuario);
            }
        })
    });
}
