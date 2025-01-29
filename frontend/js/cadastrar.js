const user_img = document.querySelector('#user_img');
const t_field_nome = document.querySelector('#t_field_nome');
const t_field_usuario = document.querySelector('#t_field_usuario');
const t_field_senha = document.querySelector('#t_field_senha');
const t_field_email = document.querySelector('#t_field_email');
const input_termos = document.querySelector('#input_termos');
const form_cadastrar = document.querySelector("#form_cadastrar");
const text_validacao = document.querySelector('#text_validacao');

const API_URL = 'http://127.0.0.1:5000/usuario/cadastrar';
const API_URL_CURRENT_USER = 'http://127.0.0.1:5000/usuario/user';

async function verifica_existencia(usuario, email) {
    const response = await fetch(API_URL);
    const users = await response.json();

    const usuario_existe = users.some(user => usuario === user.usuario || email === user.email);
    
    return usuario_existe;
};

async function valida_formulario(usuario, novo_usuario) {
    if (!t_field_nome.value || !t_field_usuario.value || !t_field_senha.value || !t_field_email.value) {
        text_validacao.innerText = 'Por favor, preencha todos os campos';
		text_validacao.style.display = 'block';
    } else if (!input_termos.checked) {
        text_validacao.innerText = 'Aceite os Termos de Uso para continuar';
		text_validacao.style.display = 'block';
    } else if (usuario) {
        text_validacao.innerText = 'Este usuário já existe';
		text_validacao.style.display = 'block';
    } else {
        const formData = new FormData();
        formData.append('nome', novo_usuario.nome);
        formData.append('usuario', novo_usuario.usuario);
        formData.append('senha', novo_usuario.senha);
        formData.append('email', novo_usuario.email);
        formData.append('img', novo_usuario.img);

        await fetch(API_URL, {
            method: 'POST',
            body: formData,
            mode: 'cors'
        })
        .catch(error => console.error('Erro:', error));;

        // sessionStorage.setItem('usuario', novo_usuario.usuario);
        // await storeSession(user.usuario)
        const response = await fetch(`${API_URL_CURRENT_USER}/${novo_usuario.usuario}`);
        const user = await response.json();

        sessionStorage.setItem('usuario', JSON.stringify(user[0].id));
        window.location.href = 'perfil.html';
    };
};

form_cadastrar.addEventListener('submit', async (e) => {
    e.preventDefault();
    const new_user = {
        nome: t_field_nome.value,
        usuario: t_field_usuario.value,
        senha: t_field_senha.value,
        email: t_field_email.value,
        img: user_img.files[0]
    };

    const usuario_existe = await verifica_existencia(new_user.usuario, new_user.email);

    valida_formulario(usuario_existe, new_user);
});
