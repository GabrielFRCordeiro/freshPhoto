const feed_cards=document.querySelector("#feed_cards"),API_URL=`http://127.0.0.1:5000/usuario/retornarPostsUsuario/${JSON.parse(sessionStorage.getItem("usuario-clicado"))}`,API_URL_RECEITA="http://127.0.0.1:5000/postagem/receita";function show_cards(e){feed_cards.innerHTML="",e.forEach((a=>{2==e.length&&a==e[1]?feed_cards.innerHTML+=`<div class="feed_card feed_card_2 d-flex flex-column align-items-center">\n                    <div>\n                        <div class="d-flex align-items-center align-self-center my-2 post_receita">\n                            <img src="data:image/png;base64,${a.postagem_base64}" alt="postagem de ${a.usuario}" class="lazy">\n                        </div>\n                        <div class="post_info d-flex justify-content-between align-items-center mb-5">\n                            <p class="p-2">${a.categoria}</p>\n                            <button class="btn_receita" data-postagem="${a.postagem_id}">\n                                <img src="../assets/icon_receita.png" alt="botao para ver receita">\n                            </button>\n                        </div>\n                    </div>\n                </div>\n        `:feed_cards.innerHTML+=`<div class="feed_card d-flex flex-column align-items-center">\n                    <div>\n                        <div class="d-flex align-items-center align-self-center my-2 post_receita">\n                            <img src="data:image/png;base64,${a.postagem_base64}" alt="postagem de ${a.usuario}" class="lazy">\n                        </div>\n                        <div class="post_info d-flex justify-content-between align-items-center mb-5">\n                            <p class="p-2">${a.categoria}</p>\n                            <button class="btn_receita" data-postagem="${a.postagem_id}">\n                                <img src="../assets/icon_receita.png" alt="botao para ver receita">\n                            </button>\n                        </div>\n                    </div>\n                </div>\n        `}))}window.addEventListener("load",(async e=>{e.preventDefault();const a=await fetch(API_URL);show_cards(await a.json());const t=document.querySelectorAll(".btn_receita"),n=document.querySelector("#modal_receita"),s=document.querySelector("#texto_receita");t.forEach((e=>{e.addEventListener("click",(async a=>{const t=await fetch(`${API_URL_RECEITA}/${e.dataset.postagem}`);let n=(await t.json())[0].receita;n||(n="Esta postagem não possui uma receita."),s.innerText=n}))})),n&&(t.forEach((e=>{e.onclick=()=>{n.style.display="flex"}})),btn_modal_receita.onclick=()=>{n.style.display="none"})}));