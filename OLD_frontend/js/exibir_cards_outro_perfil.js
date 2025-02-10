const feed_cards = document.querySelector('#feed_cards');

const API_URL = `http://127.0.0.1:5000/usuario/retornarPostsUsuario/${JSON.parse(sessionStorage.getItem('usuario-clicado'))}`;
const API_URL_RECEITA = 'http://127.0.0.1:5000/postagem/receita';

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const postagens = await response.json();
    show_cards(postagens);
    const post_receita = document.querySelectorAll(".btn_receita");
    const modal_receita = document.querySelector("#modal_receita");
    const texto_receita = document.querySelector('#texto_receita');
    post_receita.forEach(post => {
        post.addEventListener('click', async (e) => {
            const receita_response = await fetch(`${API_URL_RECEITA}/${post.dataset.postagem}`)
            const receita_lista = await receita_response.json();
            let receita = receita_lista[0].receita
            if (!receita) {
                receita = 'Esta postagem não possui uma receita.'
            }
            texto_receita.innerText = receita
        })
    });
    if (modal_receita) {
        post_receita.forEach(post => {
          post.onclick = () => {
            modal_receita.style.display = "flex";
          }
        });
      
        btn_modal_receita.onclick = () => {
          modal_receita.style.display = "none";
        }
    }
})

function show_cards(cards) {
    feed_cards.innerHTML = ''
    cards.forEach(card => {
        if (cards.length == 2 && card == cards[1]) {   
            feed_cards.innerHTML += `<div class="feed_card feed_card_2 d-flex flex-column align-items-center">
                    <div>
                        <div class="d-flex align-items-center align-self-center my-2 post_receita">
                            <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem de ${card.usuario}" class="lazy">
                        </div>
                        <div class="post_info d-flex justify-content-between align-items-center mb-5">
                            <p class="p-2">${card.categoria}</p>
                            <button class="btn_receita" data-postagem="${card.postagem_id}">
                                <img src="../assets/icon_receita.png" alt="botao para ver receita">
                            </button>
                        </div>
                    </div>
                </div>
        `
        } else {
            feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center">
                    <div>
                        <div class="d-flex align-items-center align-self-center my-2 post_receita">
                            <img src="data:image/png;base64,${card.postagem_base64}" alt="postagem de ${card.usuario}" class="lazy">
                        </div>
                        <div class="post_info d-flex justify-content-between align-items-center mb-5">
                            <p class="p-2">${card.categoria}</p>
                            <button class="btn_receita" data-postagem="${card.postagem_id}">
                                <img src="../assets/icon_receita.png" alt="botao para ver receita">
                            </button>
                        </div>
                    </div>
                </div>
        `
    }
    });
}
