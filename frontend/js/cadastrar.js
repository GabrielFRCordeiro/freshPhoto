const t_field_senha = document.querySelector('#t_field_senha');
const t_field_nome = document.querySelector('#t_field_nome');
const t_field_usuario = document.querySelector('#t_field_usuario');
const t_field_email = document.querySelector('#t_field_email');
const input_termos = document.querySelector('#input_termos');
const form_cadastrar = document.querySelector("#form_cadastrar");
const text_validacao = document.querySelector('#text_validacao');

// const validName = 'Nome Completo';
// const validUser = 'nome.com';
// const validEmail = 'usuario@example.com';
// const validPassword = '123456';

// function cadastrarSistema(e) {
// 	e.preventDefault();

// 	user_exist = t_field_usuario.value === validUser && t_field_email.value === validEmail;
// 	if (!user_exist && t_field_nome.value && t_field_senha && input_termos) {
//         localStorage.setItem('isLoggedIn', 'true');
// 		window.location.href = 'perfil.html';
//     } else {
//         console.log('texto de validacao');
//     }
// }

// form_cadastrar.addEventListener("submit", cadastrarSistema);
 
// if (localStorage.getItem('isLoggedIn')) {
//     window.location.href = 'perfil.html';
// }

// pega endereço da api (app.py)
const API_URL = 'http://127.0.0.1:5000/users';

// ve se user existe
async function user_dont_exist(usuario, email) {
    const response = await fetch(API_URL);
    const users = await response.json();

    users.forEach(user => {
        user_exist = usuario === user.usuario && email === user.email;
        if (!user_exist && t_field_nome.value && t_field_senha && input_termos) {
            return true;
        } else {
            return false;
        }
    });
}
 
// add novo usuario
form_cadastrar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const new_user = {
        nome: t_field_nome.value,
        usuario: t_field_usuario.value,
        senha: t_field_senha.value,
        email: t_field_email.value
    };

    if (user_dont_exist(new_user)) {
        await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_user)
        });

        localStorage.setItem('isLoggedIn', 'true');
        window.location.href = 'perfil.html';
    } else {
        alert('usuario já existe');
    };
});
