const btn_menu = document.querySelector("#btn_menu_desktop");
const sem_sessao = document.querySelector("#modal_entrar");
const btn_login = document.querySelector("#btn_login");
const btn_cadastrar = document.querySelector("#btn_cadastrar");
const sessao_validada = sessionStorage.getItem('usuario');

if (sessao_validada) {
    btn_menu_desktop.classList.add('d-lg-inline-block');
} else {
    sem_sessao.classList.add('d-lg-inline-block');
    modal_entrar.style.position = 'absolute'
    modal_entrar.style.width = '16rem'
    modal_entrar.style.height = '100%'
}
