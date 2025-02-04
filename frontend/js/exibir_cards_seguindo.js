const feed_cards=document.querySelector("#feed_cards"),API_URL=`http://127.0.0.1:5000/seguindo/obterFotosSeguidos/${JSON.parse(sessionStorage.getItem("usuario"))}`,API_URL_SEM_SEGUIR="http://127.0.0.1:5000/seguindo",API_URL_RECEITA="http://127.0.0.1:5000/postagem/receita";async function show_cards(e){if(e.length>0){feed_cards.innerHTML="",e.forEach((a=>{2==e.length&&a==e[1]?feed_cards.innerHTML+=`<div class="feed_card feed_card_2 d-flex flex-column align-items-center" data-usuario="${a.usuario_id}">\n                    <div>\n                        <a href="./outro-perfil.html" class="post_user d-flex align-items-center">\n                            <img src="data:image/png;base64,${a.usuario_base64}" alt="perfil de ${a.usuario}">\n                            <p class="ps-3">@${a.usuario}</p>\n                        </a>\n                        <div class="d-flex align-items-center align-self-center my-2 post_receita">\n                            <img src="data:image/png;base64,${a.postagem_base64}" alt="postagem de ${a.usuario}" class="lazy">\n                        </div>\n                        <div class="post_info d-flex justify-content-between align-items-center mb-5">\n                            <p class="p-2">${a.categoria}</p>\n                            <button class="btn_receita" data-postagem="${a.postagem_id}">\n                                <img src="../assets/icon_receita.png" alt="botao para ver receita">\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                `:feed_cards.innerHTML+=`<div class="feed_card d-flex flex-column align-items-center" data-usuario="${a.usuario_id}">\n                    <div>\n                        <a href="./outro-perfil.html" class="post_user d-flex align-items-center">\n                            <img src="data:image/png;base64,${a.usuario_base64}" alt="perfil de ${a.usuario}">\n                            <p class="ps-3">@${a.usuario}</p>\n                        </a>\n                        <div class="d-flex align-items-center align-self-center my-2 post_receita">\n                            <img src="data:image/png;base64,${a.postagem_base64}" alt="postagem de ${a.usuario}" class="lazy">\n                        </div>\n                        <div class="post_info d-flex justify-content-between align-items-center mb-5">\n                            <p class="p-2">${a.categoria}</p>\n                            <button class="btn_receita" data-postagem="${a.postagem_id}">\n                                <img src="../assets/icon_receita.png" alt="botao para ver receita">\n                            </button>\n                        </div>\n                    </div>\n                </div>\n                `}));navegar_perfil(document.querySelectorAll(".feed_card"))}else{const e=await fetch(API_URL_SEM_SEGUIR);show_main_users(await e.json());navegar_perfil(document.querySelectorAll(".post_user"))}}function show_main_users(e){let a='\n        <div class="feed_card container d-flex flex-column align-items-start">\n            <h2 class="fs-5 text-center align-self-center">Você ainda não segue ninguém, então aqui estão algumas sugestões para você:</h2>\n    ';e.forEach((e=>{a+=`\n            <a href="./outro-perfil.html" class="post_user mt-5 d-flex align-items-center" data-usuario="${e.usuario_id}">\n                <img src="data:image/png;base64,${e.usuario_base64}" alt="perfil de ${e.usuario}">\n                <p class="ps-3">@${e.usuario}</p>\n            </a>\n        `})),a+="\n        </div>\n        ",feed_cards.innerHTML=a,feed_cards.classList+=" pb-0"}function navegar_perfil(e){e.forEach((e=>{e.addEventListener("click",(a=>{e.dataset.usuario==sessionStorage.getItem("usuario")&&a.target==e.firstChild?(a.preventDefault(),window.location.href="perfil.html"):sessionStorage.setItem("usuario-clicado",e.dataset.usuario)}))}))}window.addEventListener("load",(async e=>{e.preventDefault();const a=await fetch(API_URL);show_cards(await a.json());const s=document.querySelectorAll(".btn_receita"),t=document.querySelector("#modal_receita"),n=document.querySelector("#texto_receita");s.forEach((e=>{e.addEventListener("click",(async a=>{const s=await fetch(`${API_URL_RECEITA}/${e.dataset.postagem}`);let t=(await s.json())[0].receita;t||(t="Esta postagem não possui uma receita."),n.innerText=t}))})),t&&(s.forEach((e=>{e.onclick=()=>{t.style.display="flex"}})),btn_modal_receita.onclick=()=>{t.style.display="none"})}));