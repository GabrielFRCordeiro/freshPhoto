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
            const user_img_padrao = localStorage.getItem(`${user.usuario} img`)
            if (user_img_padrao) {
                const user_img_especifica = document.createElement('svg');
                user_img_especifica.innerHTML = `<svg class="user_img pe-4 pe-lg-3" viewBox="0 0 45 44" fill="none" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
    <rect x="0.844727" y="0.0361328" width="43.4778" height="43.4778" fill="url(#pattern0_484_471)"/>
    <defs>
    <pattern id="pattern0_484_471" patternContentUnits="objectBoundingBox" width="1" height="1">
    <use xlink:href="#image0_484_471" transform="scale(0.0208333)"/>
    </pattern>
    <image id="image0_484_471" width="48" height="48" xlink:href="${localStorage.getItem(`${user.usuario} img`)}"/>
    </defs>
    </svg>`
                user_img.parentNode.replaceChild(user_img_especifica, user_img)
            }
        }
    });
})
