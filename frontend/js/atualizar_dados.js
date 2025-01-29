const btn_senha = document.querySelector("#btn_senha");
const btn_email = document.querySelector("#btn_email");
const API_URL_SENHA = `http://127.0.0.1:5000/usuario/senha/${JSON.parse(sessionStorage.getItem('usuario'))}`;
const API_URL_DELETE = `http://127.0.0.1:5000/usuario/${JSON.parse(sessionStorage.getItem('usuario'))}`;

btn_senha.addEventListener('click', async (e)=> {
    e.preventDefault();
    
    const nova_senha = document.querySelector("#t_field_senha").value;
    await fetch(API_URL_SENHA, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(nova_senha)
    });
})

btn_excluir.addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch(API_URL_DELETE, {
        method: 'DELETE',
        body: usuario,
    })

    sessionStorage.removeItem('usuario')
    window.location.href = 'cadastrar.html';
})
