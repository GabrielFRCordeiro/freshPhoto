const user_nome = document.querySelector('#user_nome');
const user_usuario = document.querySelector('#user_usuario');
const user_img = document.querySelector("#user_img");

const API_URL_PERFIL = `http://127.0.0.1:5000/usuario/perfil/${JSON.parse(sessionStorage.getItem('usuario-clicado'))}`;

// sessionStorage.removeItem('usuario-clicado');

window.addEventListener('load', async (e) => {
    e.preventDefault();
    
    const response = await fetch(API_URL_PERFIL);
    const user = await response.json();
    user_nome.innerHTML = `${user[0].nome}`
    user_usuario.innerHTML = `@${user[0].usuario}`
    const imgData = `data:image/png;base64,${user[0].foto_base64}`
    user_img.src = imgData
})
