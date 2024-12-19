const modal_postar = document.querySelector("#modal_postar");
const btn_postar = document.querySelector("#btn_postar");
const btn_modal = document.querySelector("#btn_modal");
const modal_config = document.querySelector("#modal_config");
const btn_menu_desktop = document.querySelector("#btn_menu_desktop");
const btn_menu_mobile = document.querySelector("#btn_menu_mobile");

if (modal_postar) {
  btn_postar.onclick = () => {
    modal_postar.style.display = "flex";
  }
  
  btn_modal.onclick = () => {
    modal_postar.style.display = "none";
  }
  
  window.onclick = e => {
    if ((e.target == modal_postar) || (e.target == form_publicar)) {
      modal_postar.style.display = "none";
    }
  }
}

if (modal_config) {  
  btn_menu_desktop.onclick = () => {
    modal_config.style.display = "block";
  }
  
  btn_menu_mobile.onclick = () => {
    modal_config.style.display = "block";
    btn_menu_desktop.classList.replace('d-none', 'd-inline-block');
    btn_menu_mobile.classList.replace('d-inline-block', 'd-none');
  }
  
  window.onclick = e => {
    if (e.target == modal_config) {
      modal_config.style.display = "none";
      btn_menu_desktop.classList.replace('d-inline-block', 'd-none');
      btn_menu_mobile.classList.replace('d-none', 'd-inline-block');
    }
  } 
}
