const btn_menu = document.querySelector("#btn_menu_desktop");
const sem_sessao = document.querySelector("#modal_entrar");
const sem_sessao_nav = document.querySelector("#modal_entrar_nav");
const modal_config_nav = document.querySelector("#modal_config_nav");
const btn_login = document.querySelector("#btn_login");
const btn_cadastrar = document.querySelector("#btn_cadastrar");
const sessao_validada = sessionStorage.getItem('usuario');

if (sessao_validada) {
    btn_menu_desktop.classList.add('d-lg-inline-block');
    modal_config_nav.classList.add('d-lg-block');
} else {
    sem_sessao_nav.classList.add('d-lg-block');
    modal_entrar.style.position = 'absolute'
    modal_entrar.style.width = '16rem'
    modal_entrar.style.height = '100%'
}
