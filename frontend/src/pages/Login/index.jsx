import './Login.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import TFieldSenha from '../../Components/TFieldSenha';
import BtnEntrar from '../../Components/BtnEntrar';
import LoginIcon from '@mui/icons-material/Login';
import BtnVoltar from '../../Components/BtnVoltar';

function Login() {
  const [senha, setSenha] = useState('');
  const [login, setLogin] = useState('');

  const handleSenha = (value) => {
      setSenha(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Login:', login);
    console.log('Senha:', senha);
  }

  return (<>
    <BtnVoltar pagina={'/'} />
    <main className='container text-center tela_login'>
      <div className='h-100 d-flex flex-column align-items-center justify-content-around'>
        <div className="img_container_login" data-titulo='Fresh Photo'>
          <img src='assets/logo_login.png' alt='pedaço de melancia com Fresh Photo escrito em baixo' id='img_logo' />
        </div>
        <form className='h-50 d-flex flex-column justify-content-around' onSubmit={handleSubmit}>
          <TextField
            id='t_field_login'
            label='Usuário ou email'
            variant="outlined"
            size='small'
            style={{margin: 8 + 'px', width: 25 + 'ch'}}
            value={login} 
            onChange={(e) => setLogin(e.target.value)} 
          />
          <TFieldSenha
            tamanho='small'
            value={senha}
            onChange={handleSenha}
          />
          <a href='#'><p className='text-start ms-2'>Esqueceu sua senha?</p></a>
          <BtnEntrar texto={'login'} componente={<LoginIcon />} id_entrada={'btn_login'} />
        </form>
      </div>
    </main>
  </>
  );
}

export default Login;
