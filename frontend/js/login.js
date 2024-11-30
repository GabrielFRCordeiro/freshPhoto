const t_field_login = document.querySelector('#t_field_login');
const t_field_senha = document.querySelector('#t_field_senha');
const form_login = document.querySelector("#form_login");
const text_validacao = document.querySelector('#text_validacao');

const API_URL = 'http://127.0.0.1:5000/usuario/login';

form_login.addEventListener('submit', async (e) => {
    e.preventDefault();

    const response = await fetch(API_URL);
    const users = await response.json();

    users.forEach(user => {
        user_exist = (t_field_login.value === user.usuario || t_field_login.value === user.email) && t_field_senha.value === user.senha;
        if (!t_field_login.value) {
            text_validacao.innerText = 'Preencha o campo de usuario';
		    text_validacao.style.display = 'block';
        } else if (!t_field_senha.value) {
            text_validacao.innerText = 'Preencha o campo de senha';
		    text_validacao.style.display = 'block';
        } else if (!user_exist) {
            text_validacao.innerText = 'Usuário ou senha incorretos';
		    text_validacao.style.display = 'block';
        } else {
            sessionStorage.setItem('usuario', user.usuario);
            window.location.href = 'perfil.html';
        }
    });
})
