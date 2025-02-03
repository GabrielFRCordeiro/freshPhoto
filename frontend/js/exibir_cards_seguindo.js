const feed_cards = document.querySelector('#feed_cards');

const API_URL = `http://127.0.0.1:5000/seguindo/obterFotosSeguidos/${JSON.parse(sessionStorage.getItem('usuario'))}`;
const API_URL_SEM_SEGUIR = 'http://127.0.0.1:5000/seguindo';
const API_URL_RECEITA = 'http://127.0.0.1:5000/postagem/receita';

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const postagens = await response.json();
    let perfis;
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

async function show_cards(cards) {
    if (cards.length > 0) {
        feed_cards.innerHTML = ''
        cards.forEach(card => {
            if (cards.length == 2 && card == cards[1]) {   
                feed_cards.innerHTML += `<div class="feed_card feed_card_2 d-flex flex-column align-items-center" data-usuario="${card.usuario_id}">
                    <div>
                        <a href="./outro-perfil.html" class="post_user d-flex align-items-center">
                            <img src="data:image/png;base64,${card.usuario_base64}" alt="perfil de ${card.usuario}">
                            <p class="ps-3">@${card.usuario}</p>
                        </a>
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
                feed_cards.innerHTML += `<div class="feed_card d-flex flex-column align-items-center" data-usuario="${card.usuario_id}">
                    <div>
                        <a href="./outro-perfil.html" class="post_user d-flex align-items-center">
                            <img src="data:image/png;base64,${card.usuario_base64}" alt="perfil de ${card.usuario}">
                            <p class="ps-3">@${card.usuario}</p>
                        </a>
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
        const perfis = document.querySelectorAll('.feed_card');
        navegar_perfil(perfis);
    } else {
        const response = await fetch(API_URL_SEM_SEGUIR);
        const usuarios = await response.json();
        show_main_users(usuarios);
        const perfis = document.querySelectorAll('.post_user');
        navegar_perfil(perfis);
    }
}

function show_main_users(cards) {
    let html_cards = `
        <div class="feed_card container d-flex flex-column align-items-start">
            <h2 class="fs-5 text-center align-self-center">Você ainda não segue ninguém, então aqui estão algumas sugestões para você:</h2>
    `
    cards.forEach(card => {
        html_cards += `
            <a href="./outro-perfil.html" class="post_user mt-5 d-flex align-items-center" data-usuario="${card.usuario_id}">
                <img src="data:image/png;base64,${card.usuario_base64}" alt="perfil de ${card.usuario}">
                <p class="ps-3">@${card.usuario}</p>
            </a>
        `
        })
        html_cards += `
        </div>
        `
    feed_cards.innerHTML = html_cards
    feed_cards.classList += ' pb-0'
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
