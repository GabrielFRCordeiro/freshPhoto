const t_field_login = document.querySelector('#t_field_login');
const t_field_senha = document.querySelector('#t_field_senha');
const form_login=document.querySelector("#form_login");

const validEmail = 'usuario@example.com';
const validPassword = '123456';

function entrarSistema(e){
	if (t_field_login.value === validEmail && t_field_senha.value === validPassword) {
		localStorage.setItem('isLoggedIn', 'true');
		windows.location.href = 'perfil.html';
	} else {
		alert('Usuario ou senha incorretos')
	}
}

form_login.addEventListener("submit", entrarSistema);
 
if (localStorage.getItem('isLoggedIn')) {
    window.location.href = 'perfil.html';
}
