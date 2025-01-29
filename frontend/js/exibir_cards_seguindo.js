const feed_cards = document.querySelector('#feed_cards');

const API_URL = 'http://127.0.0.1:5000/seguidores';

window.addEventListener('load', async (e) => {
    e.preventDefault();

    usuario = JSON.parse(sessionStorage.getItem('usuario'));
    // console.log(`${API_URL}/${usuario.id}`)
    const response = await fetch(`${API_URL}/${usuario}`);
    const postagens = await response.json();
    console.log(postagens)

    // let cards_teste = []
    // postagens.forEach(postagem => {
    //     if (postagem.usuario == sessionStorage.getItem("usuario")) {
    //         cards_teste.push(postagem.foto);
    //     }
    // });
    // console.log(cards_teste)
    show_cards(postagens);
})

function show_cards(cards) {
    feed_cards.innerHTML = ''
    cards.forEach(card => {
        feed_cards.innerHTML += `<div class="feed_card d-flex justify-content-center" role="button">
                <div class="d-flex align-items-center post_receita">
                    <img data-src="${card.postagem_foto}" alt="" class="lazy">
                </div>
            </div>`
    });
}
