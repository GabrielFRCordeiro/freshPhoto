const user_nome = document.querySelector('#user_nome');
const user_usuario = document.querySelector('#user_usuario');
const user_img = document.querySelector("#user_img");

const API_URL_PUBLICAR = 'http://127.0.0.1:5000/usuario/perfil';

window.addEventListener('load', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL_PUBLICAR);
    const users = await response.json();
    const usuarioNome = sessionStorage.getItem('usuario');
    const usuarioEncontrado = users.find((usuario) => {
        if (usuario.usuario == usuarioNome) {
            return usuarioNome
        }
    });

    await users.forEach(user => {
        if (usuarioEncontrado.usuario == user.usuario) {
            user_nome.innerHTML = `${user.nome}`;
            user_usuario.innerHTML = `${user.usuario}`;
            // user_img.parentElement.firstElementChild.innerHTML = `<img src="${user.foto}" >`
        }
    });
})
