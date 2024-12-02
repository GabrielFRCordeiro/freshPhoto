const btn_sair = document.querySelector('#btn_sair');

btn_sair.addEventListener('click', e => {
	if (sessionStorage.getItem('usuario')) {
        sessionStorage.removeItem('usuario')
		sessionStorage.removeItem('id_usuario')
		window.location.href = 'login.html';
	} else {
		alert('Usuario ou senha incorretos')
	}
});
