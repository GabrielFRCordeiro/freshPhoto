const feed_cards = document.querySelector('#feed_cards');

cards_teste = [
    '../assets/imgs/img_teste_1.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_2.png',
    '../assets/imgs/img_teste_3.png'
]

function show_cards() {
    feed_cards.innerHTML = ''
    cards_teste.forEach(card => {
        feed_cards.innerHTML += `<a href="desenvolvimento.html">
    <div class="feed_card">
        <img src="${card}" alt="">
    </div>
</a>`
    });
}

show_cards();
