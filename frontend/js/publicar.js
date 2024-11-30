const input_img = document.querySelector('#input_img');
const input_categoria = document.querySelector("#input_categoria");
const t_field_legenda = document.querySelector('#t_field_legenda');
const t_field_receita = document.querySelector('#t_field_receita');
const btn_publicar = document.querySelector('#btn_publicar');
const form_publicar = document.querySelector("#form_publicar");

const API_URL = 'http://127.0.0.1:5000/postagem';

form_publicar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const nova_publicacao = {
        imagem: input_img.value,
        categoria: input_categoria.value,
        legenda: t_field_legenda.value,
        receita: t_field_receita.value
    };

    await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova_publicacao)
    });
});
