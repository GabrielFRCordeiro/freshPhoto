const btn_sair = document.querySelector('#btn_sair');
const btn_sair_modal = document.querySelector('#btn_sair_modal');

btn_sair.addEventListener('click', e => {
	if (sessionStorage.getItem('usuario')) {
        sessionStorage.removeItem('usuario')
		window.location.href = 'login.html';
	}
});

btn_sair_modal.addEventListener('click', e => {
	if (sessionStorage.getItem('usuario')) {
        sessionStorage.removeItem('usuario')
		window.location.href = 'login.html';
	}
});
