const feed_cards = document.querySelector('#feed_cards');

const API_URL = 'http://127.0.0.1:5000/postagem'

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const postagens = await response.json();

    let cards_teste = []
    postagens.forEach(postagem => {
        if (postagem.usuario == sessionStorage.getItem("usuario")) {
            cards_teste.push(postagem.foto);
        }
    });
    console.log(cards_teste)
    show_cards(cards_teste);
})

function show_cards(cards) {
    feed_cards.innerHTML = ''
    cards.forEach(card => {
        feed_cards.innerHTML += `<a class="feed_card" href="desenvolvimento.html">
    <div class="feed_card">
        <img src="${card}" alt="">
    </div>
</a>`
    });
}
