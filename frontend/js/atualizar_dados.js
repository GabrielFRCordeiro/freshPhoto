const t_field_senha = document.querySelector("#t_field_senha");
const btn_senha = document.querySelector("#btn_senha");
const modal_dados = document.querySelector("#modal_dados");
const btn_modal_dados = document.querySelector("#btn_modal_dados");
const texto_dados = document.querySelector("#texto_dados");
const API_URL_SENHA = `http://127.0.0.1:5000/usuario/AtualizarSenha/${JSON.parse(sessionStorage.getItem('usuario'))}`;
const API_URL_DELETE = `http://127.0.0.1:5000/usuario/ApagarContaUsuario/${JSON.parse(sessionStorage.getItem('usuario'))}`;

btn_senha.addEventListener('click', async (e)=> {
    e.preventDefault();
    
    const nova_senha = document.querySelector("#t_field_senha").value;
    await fetch(API_URL_SENHA, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({'password':nova_senha})
    });
    texto_dados.innerText = 'Senha atualizada com sucesso!'
    modal_dados.style.display = "flex";
})

btn_excluir.addEventListener('click', async (e) => {
    e.preventDefault();

    await fetch(API_URL_DELETE, {
        method: 'DELETE',
        mode: 'cors'
    })

    sessionStorage.removeItem('usuario')
    window.location.href = 'cadastrar.html';
})

btn_modal_dados.onclick = () => {
    modal_dados.style.display = "none";
}

window.onclick = e => {
    if (e.target == modal_dados) {
        modal_dados.style.display = "none";
    }
}
