const input_img = document.querySelector('#publicacao_img');
const input_categoria = document.querySelector("#input_categoria");
const t_field_legenda = document.querySelector('#t_field_legenda');
const t_field_receita = document.querySelector('#t_field_receita');
const btn_publicar = document.querySelector('#btn_publicar');
const form_publicar = document.querySelector("#form_publicar");

const API_URL_POSTAGEM = 'http://127.0.0.1:5000/postagem';

form_publicar.addEventListener('submit', async (e) => {
    e.preventDefault();

    // const receita = {texto: t_field_receita.value}

    // await fetch(API_URL_RECEITA, {
    //     method: 'POST',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(receita)
    // });

    // const response_users = await fetch(API_URL_USUARIO);
    // const users = await response_users.json();

    // let id_usuario = '';

    // users.forEach(user => {
    //     if (user.usuario === sessionStorage.getItem('usuario')) {
    //         id_usuario = user.id;
    //     }
    // });

    // const response_categorias = await fetch(API_URL_CATEGORIA);
    // const categorias = await response_categorias.json();

    // let id_categoria = '';

    // categorias.forEach(categoria => {
    //     if (categoria.nome === input_categoria.value) {
    //         id_categoria = categoria.id;
    //     }
    // });

    // const response_receitas = await fetch(API_URL_RECEITA);
    // const receitas = await response_receitas.json();

    // let id_receita = '';

    // receitas.forEach(receita => {
    //     if (receita.texto === t_field_receita.value) {
    //         id_receita = receita.id;
    //     }
    // });

    const formData = new FormData();
    formData.append('usuario', JSON.parse(sessionStorage.getItem('usuario')));
    formData.append('categoria', input_categoria.value);
    formData.append('img', input_img.files[0]);
    formData.append('receita', t_field_receita.value);

    if (!input_img.files.length) {
        console.error('Por favor, selecione uma imagem.');
        return; // Impede o envio se não houver arquivo
    }

    if (!input_categoria.value) {
        console.error('Por favor, selecione uma categoria.');
        return; // Impede o envio se algum ID estiver vazio
    }

    btn_publicar.disabled = true;
    btn_publicar.innerText = 'Publicando...';

    await fetch(API_URL_POSTAGEM, {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
    .catch(error => console.error('Erro:', error));

    window.location.reload();
});
