var modal_postar = document.querySelector("#modal_postar");
var btn_postar = document.querySelector("#btn_postar");
var btn_modal = document.querySelector("#btn_modal");

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
