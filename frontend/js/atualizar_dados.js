const btn_senha = document.querySelector("#btn_senha");
const btn_email = document.querySelector("#btn_email");

const API_URL = 'http://127.0.0.1:5000/usuario/senha';

btn_senha.addEventListener('click', async (e)=> {
    e.preventDefault();
    
    const nova_senha = document.querySelector("#t_field_senha").value;
    const id = JSON.parse(sessionStorage.getItem('usuario')).id;

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova_senha)
    });
})

btn_email.addEventListener('click', async (e)=> {
    e.preventDefault();
    
    const novo_email = document.querySelector("#t_field_email").value;
    const id = JSON.parse(sessionStorage.getItem('usuario')).id;

    await fetch(`${API_URL}/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(novo_email)
    });
})

const usuario = sessionStorage.getItem('usuario');
const btn_excluir = document.querySelector('#btn_excluir');

const API_URL_DELETE = `http://127.0.0.1:5000/usuario/${usuario}`;

btn_excluir.addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch(API_URL_DELETE, {
        method: 'DELETE',
        body: usuario,
    })

    sessionStorage.removeItem('usuario')
    window.location.href = 'cadastrar.html';
})
