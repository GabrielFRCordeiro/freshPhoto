const modal_postar = document.querySelector("#modal_postar");
const modal_form = document.querySelector("#form_publicar");
const btn_postar = document.querySelector("#btn_postar");
const btn_modal = document.querySelector("#btn_modal");
const btn_modal_receita = document.querySelector("#btn_modal_receita");
const modal_config = document.querySelector("#modal_config");
const btn_menu_desktop = document.querySelector("#btn_menu_desktop");
const btn_menu_mobile = document.querySelector("#btn_menu_mobile");
const modal_receita = document.querySelector("#modal_receita");
const post_receita = document.querySelectorAll(".post_receita");
const sessao = sessionStorage.getItem('usuario');
const modal_entrar = document.querySelector('#modal_entrar');

if (modal_postar) {
  btn_postar.onclick = () => {
    modal_postar.style.display = "flex";
  }
  
  btn_modal.onclick = () => {
    modal_postar.style.display = "none";
  }
}

if (modal_config && sessao) {  
  btn_menu_desktop.onclick = () => {
    modal_config.style.display = "block";
    btn_menu_desktop.style.position = "fixed";
  }
  
  btn_menu_mobile.onclick = () => {
    modal_config.style.display = "block";
    btn_menu_desktop.classList.replace('d-none', 'd-inline-block');
    btn_menu_mobile.classList.replace('d-inline-block', 'd-none');
    btn_menu_desktop.style.position = "fixed";
  }
} else {
  btn_menu_mobile.onclick = () => {
    modal_entrar.classList.replace('d-none', 'd-inline-block');
    modal_entrar.style.position = 'fixed'
    modal_entrar.style.width = '100%'
    modal_entrar.style.height = '100%'
    btn_menu_desktop.classList.replace('d-none', 'd-inline-block');
    btn_menu_mobile.classList.replace('d-inline-block', 'd-none');
  }
}

if (modal_receita) {
  post_receita.forEach(post => {
    post.onclick = () => {
      modal_receita.style.display = "flex";
    }
  });

  btn_modal_receita.onclick = () => {
    modal_receita.style.display = "none";
  }
}

window.onclick = e => {
  switch (e.target) {
    case modal_receita:
      modal_receita.style.display = "none";
      break;

    case modal_entrar:
      modal_entrar.classList.replace('d-inline-block', 'd-none');
      btn_menu_desktop.classList.replace('d-inline-block', 'd-none');
      btn_menu_mobile.classList.replace('d-none', 'd-inline-block');
      break;

    case modal_postar:
      modal_postar.style.display = "none";
      break;

    case modal_config:
      modal_config.style.display = "none";
      btn_menu_desktop.classList.replace('d-inline-block', 'd-none');
      btn_menu_mobile.classList.replace('d-none', 'd-inline-block');
      btn_menu_desktop.style.position = "absolute";
      break;
  
    default:
      break;
  }
}
