const img_cadastrar = document.querySelector('#user_img');

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
