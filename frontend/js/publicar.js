const input_img = document.querySelector('#publicacao_img');
const input_categoria = document.querySelector("#input_categoria");
const t_field_legenda = document.querySelector('#t_field_legenda');
const t_field_receita = document.querySelector('#t_field_receita');
const btn_publicar = document.querySelector('#btn_publicar');
const form_publicar = document.querySelector("#form_publicar");
const text_validacao = document.querySelector('#text_validacao');
const categoriaOptions = Array.from(document.querySelectorAll('#categoria-list option')).map(option => option.value);

const API_URL_POSTAGEM = 'http://127.0.0.1:5000/postagem';

function verificarTamanhoImagem(file) {
    const tamanhoMaximoMB = 30;
    const tamanhoMaximoBytes = tamanhoMaximoMB * 1024 * 1024;
    return file.size <= tamanhoMaximoBytes;
}

function verificarProporcaoImagem(file) {
    return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = URL.createObjectURL(file);
        img.onload = () => {
            const proporcaoMaxima = 1080;
            resolve(img.width <= proporcaoMaxima && img.height <= proporcaoMaxima);
        };
        img.onerror = () => reject(new Error('Erro ao carregar a imagem.'));
    });
}

form_publicar.addEventListener('submit', async (e) => {
    e.preventDefault();

    if (!input_categoria.value) {
        text_validacao.innerText = 'Por favor, selecione uma categoria.';
        text_validacao.style.display = 'block';
        return;
    }

    if (!categoriaOptions.includes(input_categoria.value)) {
        text_validacao.innerText = 'Por favor, selecione uma categoria válida.';
        text_validacao.style.display = 'block';
        return;
    }

    if (!input_img.files.length) {
        text_validacao.innerText = 'Por favor, selecione uma imagem.';
		text_validacao.style.display = 'block';
        return;
    }

    const file = input_img.files[0];

    if (!verificarTamanhoImagem(file)) {
        text_validacao.innerText = 'A imagem não pode ter mais de 30 MB.';
        text_validacao.style.display = 'block';
        return;
    }

    try {
        const proporcaoValida = await verificarProporcaoImagem(file);
        if (!proporcaoValida) {
            text_validacao.innerText = 'A imagem não pode ter uma proporção maior que 1080 x 1080 pixels.';
            text_validacao.style.display = 'block';
            return;
        }
    } catch (error) {
        console.error(error);
        text_validacao.innerText = 'Erro ao verificar a proporção da imagem.';
        text_validacao.style.display = 'block';
        return;
    }

    btn_publicar.disabled = true;
    btn_publicar.innerText = 'Publicando...';

    const formData = new FormData();
    formData.append('usuario', JSON.parse(sessionStorage.getItem('usuario')));
    formData.append('categoria', input_categoria.value);
    formData.append('img', file);
    formData.append('receita', t_field_receita.value);

    await fetch(API_URL_POSTAGEM, {
        method: 'POST',
        body: formData,
        mode: 'cors'
    })
    .catch(error => console.error('Erro:', error));

    window.location.reload();
});
