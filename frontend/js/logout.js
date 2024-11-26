const btn_sair = document.querySelector('#btn_sair');

btn_sair.addEventListener('click', e => {
	if (localStorage.getItem('isLoggedIn')) {
        localStorage.removeItem('isLoggedIn')
		window.location.href = '../index.html';
	} else {
		alert('Usuario ou senha incorretos')
	}
});
