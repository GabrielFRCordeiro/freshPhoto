const img_cadastrar = document.querySelector('#user_img');
const publicacao_img = document.querySelector('#publicacao_img');

img_cadastrar.addEventListener('change', e => {
    const input = e.target;
    const file = input.files[0];
    const imgPreview = document.getElementById('img_preview');
    
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        imgPreview.src = e.target.result;
      };
      reader.readAsDataURL(file);
    }
})

publicacao_img.addEventListener('change', e => {
  const input = e.target;
  const file = input.files[0];
  const imgPreview = document.getElementById('img_preview_publicar');

  if (file) {
    const reader = new FileReader();
    reader.onload = function(e) {
      imgPreview.innerHTML = `<img src="${e.target.result}" class="w-100 h-100 object-fit-cover">`;
    };
    reader.readAsDataURL(file);
  }
})
