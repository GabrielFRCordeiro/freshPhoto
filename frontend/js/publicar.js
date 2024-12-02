const input_img = document.querySelector('#publicacao_img');
const input_categoria = document.querySelector("#input_categoria");
const t_field_legenda = document.querySelector('#t_field_legenda');
const t_field_receita = document.querySelector('#t_field_receita');
const btn_publicar = document.querySelector('#btn_publicar');
const form_publicar = document.querySelector("#form_publicar");

const API_URL_RECEITA = 'http://127.0.0.1:5000/receita';
const API_URL_USUARIO = 'http://127.0.0.1:5000/usuario';
const API_URL_POSTAGEM = 'http://127.0.0.1:5000/postagem';
const API_URL_CATEGORIA = 'http://127.0.0.1:5000/categoria';

form_publicar.addEventListener('submit', async (e) => {
    e.preventDefault();

    const receita = {texto: t_field_receita.value}

    await fetch(API_URL_RECEITA, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(receita)
    });

    const response_users = await fetch(API_URL_USUARIO);
    const users = await response_users.json();

    let id_usuario = '';

    users.forEach(user => {
        if (user.usuario === sessionStorage.getItem('usuario')) {
            id_usuario = user.id;
        }
    });

    const response_categorias = await fetch(API_URL_CATEGORIA);
    const categorias = await response_categorias.json();

    let id_categoria = '';

    categorias.forEach(categoria => {
        if (categoria.nome === input_categoria.value) {
            id_categoria = categoria.id;
        }
    });

    const response_receitas = await fetch(API_URL_RECEITA);
    const receitas = await response_receitas.json();

    let id_receita = '';

    receitas.forEach(receita => {
        if (receita.texto === t_field_receita.value) {
            id_receita = receita.id;
        }
    });

    const nova_publicacao = {
        imagem: input_img.value,
        categoria: input_categoria.value,
        legenda: t_field_legenda.value,
        receita: t_field_receita.value
    };

    const formData = new FormData();
    formData.append('id_usuario', id_usuario);
    formData.append('id_categoria', id_categoria);
    formData.append('foto', input_img.files[0]);
    formData.append('legenda', t_field_legenda.value);
    formData.append('id_receita', id_receita);

    if (!input_img.files.length) {
        console.error('Por favor, selecione uma imagem.');
        return; // Impede o envio se não houver arquivo
    }

    if (!id_usuario || !id_categoria || !id_receita) {
        console.error('ID de usuário, categoria ou receita não encontrados.');
        return; // Impede o envio se algum ID estiver vazio
    }

    await fetch(API_URL_POSTAGEM, {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
    .catch(error => console.error('Erro:', error));
});
