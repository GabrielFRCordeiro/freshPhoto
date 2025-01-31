const btn_seguir = document.querySelector("#btn_seguir");

const API_URL_VALIDAR_SEGUIR = `http://127.0.0.1:5000/seguindo/${JSON.parse(sessionStorage.getItem('usuario'))}`;
const API_URL_SEGUIR = 'http://127.0.0.1:5000/seguindo';

btn_seguir.addEventListener('click', async e => {
    const response = await fetch(API_URL_VALIDAR_SEGUIR);
    const seguido = await response.json();
    const vinculo_seguir = {
        seguido_id: JSON.parse(sessionStorage.getItem('usuario-clicado')),
        seguidos_id: JSON.parse(sessionStorage.getItem('usuario'))
    }
    await fetch(API_URL_SEGUIR, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(vinculo_seguir)
    })
    btn_seguir.innerText = 'Deixar de seguir'
})
