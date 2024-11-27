const t_field_login = document.querySelector('#t_field_login');
const t_field_senha = document.querySelector('#t_field_senha');
const form_login = document.querySelector("#form_login");
const text_validacao = document.querySelector('#text_validacao');

// const validUser = 'nome.com';
// const validEmail = 'usuario@example.com';
// const validPassword = '123456';

// function entrarSistema(e){
// 	e.preventDefault();

// 	if ((t_field_login.value === validEmail && t_field_senha.value === validPassword) || (t_field_login.value === validUser && t_field_senha.value === validPassword)) {
// 		localStorage.setItem('isLoggedIn', 'true');
// 		window.location.href = 'perfil.html';
// 	} else if (t_field_login.value === '') {
// 		text_validacao.innerText = 'Preencha o campo de usuario';
// 		text_validacao.style.display = 'block';
// 		console.log(t_field_login.value);
// 	} else if (t_field_senha.value === '') {
// 		text_validacao.innerText = 'Preencha o campo de senha';
// 		text_validacao.style.display = 'block';
// 		console.log(t_field_senha.value);
// 	} else {
// 		text_validacao.innerText = 'Usuário ou senha incorretos';
// 		text_validacao.style.display = 'block';
// 	}
// }

// form_login.addEventListener("submit", entrarSistema);
 
// if (localStorage.getItem('isLoggedIn')) {
//     window.location.href = 'perfil.html';
// }

const API_URL = 'http://127.0.0.1:5000/usuario';

async function entrar_sistema(login, senha) {
    const response = await fetch(API_URL);
    const users = await response.json();

    users.forEach(user => {
        user_exist = (login === user.usuario || login === user.email) && senha === user.senha;
        if (user_exist) {
            localStorage.setItem('isLoggedIn', 'true');
        	window.location.href = 'perfil.html';
        } else {
            alert('erro');
        }
    });
}
