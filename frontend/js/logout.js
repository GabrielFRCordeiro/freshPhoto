const btn_sair = document.querySelector('#btn_sair');

btn_sair.addEventListener('click', e => {
	if (sessionStorage.getItem('usuario')) {
        sessionStorage.removeItem('usuario')
		window.location.href = 'login.html';
	}
});
