const usuario = sessionStorage.getItem('usuario');
const btn_excluir = document.querySelector('#btn_excluir');

const API_URL = `http://127.0.0.1:5000/usuario/${usuario}`;

btn_excluir.addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch(API_URL, {
        method: 'DELETE',
        body: usuario,
    })

    sessionStorage.removeItem('usuario')
    window.location.href = 'cadastrar.html';
})
