const btn_seguir = document.querySelector("#btn_seguir");

const API_URL_VALIDAR_SEGUIR = `http://127.0.0.1:5000/seguindo/${JSON.parse(sessionStorage.getItem('usuario'))}`;
const API_URL_SEGUIR = 'http://127.0.0.1:5000/seguindo';

window.addEventListener('load', async e => {
    const response = await fetch(API_URL_VALIDAR_SEGUIR);
    const users = await response.json();
    users.forEach(user => {
        if (user['seguido_id'] == JSON.parse(sessionStorage.getItem('usuario-clicado'))) {
            btn_seguir.innerText = 'Deixar de seguir'
            sessionStorage.setItem('seguindo', true)
            return
        }
    });
});

btn_seguir.addEventListener('click', async e => {
    const vinculo_seguir = {
        seguido_id: JSON.parse(sessionStorage.getItem('usuario-clicado')),
        seguidos_id: JSON.parse(sessionStorage.getItem('usuario'))
    }
    if (sessionStorage.getItem('seguindo')) {
        await fetch(API_URL_SEGUIR, {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vinculo_seguir)
        })
        btn_seguir.innerText = 'seguir'
        sessionStorage.removeItem('seguindo')
    } else {
        await fetch(API_URL_SEGUIR, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(vinculo_seguir)
        })
        btn_seguir.innerText = 'deixar de seguir'
        sessionStorage.setItem('seguindo', true)
    }
});

window.addEventListener('beforeunload', e => {
    sessionStorage.removeItem('seguindo')
})
