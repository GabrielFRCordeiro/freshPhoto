var modal_postar = document.querySelector("#modal_postar");
var btn_postar = document.querySelector("#btn_postar");

btn_postar.onclick = () => {
  modal_postar.style.display = "block";
}

window.onclick = e => {
  if (e.target == modal_postar) {
    modal_postar.style.display = "none";
  }
}
