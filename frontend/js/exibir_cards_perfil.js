const feed_cards = document.querySelector('#feed_cards');

const API_URL = `http://127.0.0.1:5000/usuario/retornarPostsUsuario/${JSON.parse(sessionStorage.getItem('usuario'))}`;

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const postagens = await response.json();
    show_cards(postagens);
})

function show_cards(cards) {
    feed_cards.innerHTML = ''
    cards.forEach(card => {
        if (cards.length == 2 && card == cards[1]) {   
            feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center" style="transform: translateY(0);">
                    <div>
                        <div class="d-flex align-items-center align-self-center my-2 post_receita">
                            <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem do usuario" class="lazy">
                        </div>
                        <div class="post_info d-flex justify-content-between align-items-center mb-5">
                            <p class="p-2">${card.categoria}</p>
                            <button>
                                <img src="../assets/icon_receita.svg" alt="botao para ver receita">
                            </button>
                        </div>
                    </div>
                </div>
        `
        } else {
            feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center">
                    <div>
                        <div class="d-flex align-items-center align-self-center my-2 post_receita">
                            <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem do usuario" class="lazy">
                        </div>
                        <div class="post_info d-flex justify-content-between align-items-center mb-5">
                            <p class="p-2">${card.categoria}</p>
                            <button>
                                <img src="../assets/icon_receita.svg" alt="botao para ver receita">
                            </button>
                        </div>
                    </div>
                </div>
        `
    }
    });
}
