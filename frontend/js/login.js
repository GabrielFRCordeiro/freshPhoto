const t_field_login = document.querySelector('#t_field_login');
const t_field_senha = document.querySelector('#t_field_senha');
const form_login = document.querySelector("#form_login");
const text_validacao = document.querySelector('#text_validacao');

const validUser = 'nome.com';
const validEmail = 'usuario@example.com';
const validPassword = '123456';

function entrarSistema(e){
	e.preventDefault();

	if ((t_field_login.value === validEmail && t_field_senha.value === validPassword) || (t_field_login.value === validUser && t_field_senha.value === validPassword)) {
		localStorage.setItem('isLoggedIn', 'true');
		window.location.href = 'perfil.html';
	} else if (t_field_login.value === '') {
		text_validacao.innerText = 'Preencha o campo de usuario';
		text_validacao.style.display = 'block';
		console.log(t_field_login.value);
	} else if (t_field_senha.value === '') {
		text_validacao.innerText = 'Preencha o campo de senha';
		text_validacao.style.display = 'block';
		console.log(t_field_senha.value);
	} else {
		text_validacao.innerText = 'Usuário ou senha incorretos';
		text_validacao.style.display = 'block';
	}
}

form_login.addEventListener("submit", entrarSistema);
 
if (localStorage.getItem('isLoggedIn')) {
    window.location.href = 'perfil.html';
}
