const user_img = document.querySelector('#user_img');
const t_field_nome = document.querySelector('#t_field_nome');
const t_field_usuario = document.querySelector('#t_field_usuario');
const t_field_senha = document.querySelector('#t_field_senha');
const t_field_email = document.querySelector('#t_field_email');
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

function validar_email(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    /* Explicando regex: 
    ^       => Início da string.
    [^\s@]+ => Um ou mais caracteres que não sejam espaços em branco (\s) ou @.
    @       => O caractere @ obrigatório em um e-mail.
    [^\s@]+ => Um ou mais caracteres que não sejam espaços em branco ou @ (parte antes do domínio).
    \.      => O caractere . obrigatório antes do domínio de nível superior (TLD).
    [^\s@]+ => Um ou mais caracteres que não sejam espaços em branco ou @ (domínio de nível superior).
    $       => Fim da string.
    */
    return regex.test(email);
}

function validar_senha(senha) {
    if (senha.length < 8) {
        return "A senha deve ter no mínimo 8 caracteres.";
    }
    if (!/[A-Z]/.test(senha)) {
        return "A senha deve conter uma letra maiúscula.";
    }
    if (!/[a-z]/.test(senha)) {
        return "A senha deve conter uma letra minúscula.";
    }
    if (!/\d/.test(senha)) {
        return "A senha deve conter um número.";
    }
    return null;
}

async function valida_formulario(usuario, novo_usuario) {
    if (!t_field_nome.value || !t_field_usuario.value || !t_field_senha.value || !t_field_email.value) {
        text_validacao.innerText = 'Por favor, preencha todos os campos';
		text_validacao.style.display = 'block';
    }
    
    if (!validar_email(t_field_email.value)) {
        text_validacao.innerText = 'Por favor, insira um e-mail válido';
        text_validacao.style.display = 'block';
        return;
    }

    const mensagem_senha = validar_senha(t_field_senha.value);
    if (mensagem_senha) {
        text_validacao.innerText = mensagem_senha;
        text_validacao.style.display = 'block';
        return;
    }

    if (usuario) {
        text_validacao.innerText = 'Este usuário já existe';
		text_validacao.style.display = 'block';
        return;
    }

    if (t_field_usuario.value.length > 25) {
        text_validacao.innerText = 'Seu usuário deve conter até 25 caracteres';
		text_validacao.style.display = 'block';
        return;
    }

    if (t_field_nome.value.length > 100) {
        text_validacao.innerText = 'Seu nome deve conter até 100 caracteres';
		text_validacao.style.display = 'block';
        return;
    }

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

    const response = await fetch(`${API_URL_CURRENT_USER}/${novo_usuario.usuario}`);
    const user = await response.json();

    sessionStorage.setItem('usuario', JSON.stringify(user[0].id));
    window.location.href = 'home.html';
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
