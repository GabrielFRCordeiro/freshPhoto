const user_img=document.querySelector("#user_img"),t_field_nome=document.querySelector("#t_field_nome"),t_field_usuario=document.querySelector("#t_field_usuario"),t_field_senha=document.querySelector("#t_field_senha"),t_field_email=document.querySelector("#t_field_email"),form_cadastrar=document.querySelector("#form_cadastrar"),text_validacao=document.querySelector("#text_validacao"),API_URL="http://127.0.0.1:5000/usuario/cadastrar",API_URL_CURRENT_USER="http://127.0.0.1:5000/usuario/user";async function verifica_existencia(e,a){const t=await fetch(API_URL);return(await t.json()).some((t=>e===t.usuario||a===t.email))}function validar_email(e){return/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(e)}function validar_senha(e){return e.length<8?"A senha deve ter no mínimo 8 caracteres.":/[A-Z]/.test(e)?/[a-z]/.test(e)?/\d/.test(e)?null:"A senha deve conter um número.":"A senha deve conter uma letra minúscula.":"A senha deve conter uma letra maiúscula."}async function valida_formulario(e,a){if(t_field_nome.value&&t_field_usuario.value&&t_field_senha.value&&t_field_email.value||(text_validacao.innerText="Por favor, preencha todos os campos",text_validacao.style.display="block"),!validar_email(t_field_email.value))return text_validacao.innerText="Por favor, insira um e-mail válido",void(text_validacao.style.display="block");const t=validar_senha(t_field_senha.value);if(t)return text_validacao.innerText=t,void(text_validacao.style.display="block");if(e)return text_validacao.innerText="Este usuário já existe",void(text_validacao.style.display="block");if(t_field_usuario.value.length>25)return text_validacao.innerText="Seu usuário deve conter até 25 caracteres",void(text_validacao.style.display="block");if(t_field_nome.value.length>100)return text_validacao.innerText="Seu nome deve conter até 100 caracteres",void(text_validacao.style.display="block");const i=new FormData;i.append("nome",a.nome),i.append("usuario",a.usuario),i.append("senha",a.senha),i.append("email",a.email),i.append("img",a.img),await fetch(API_URL,{method:"POST",body:i,mode:"cors"}).catch((e=>console.error("Erro:",e)));const o=await fetch(`${API_URL_CURRENT_USER}/${a.usuario}`),r=await o.json();sessionStorage.setItem("usuario",JSON.stringify(r[0].id)),window.location.href="home.html"}form_cadastrar.addEventListener("submit",(async e=>{e.preventDefault();const a={nome:t_field_nome.value,usuario:t_field_usuario.value,senha:t_field_senha.value,email:t_field_email.value,img:user_img.files[0]};valida_formulario(await verifica_existencia(a.usuario,a.email),a)}));