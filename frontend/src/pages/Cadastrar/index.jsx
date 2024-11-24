import './Cadastrar.css';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import TFieldSenha from '../../Components/TFieldSenha';
import BtnEntrar from '../../Components/BtnEntrar';
import CreateIcon from '@mui/icons-material/Create';
import BtnVoltar from '../../Components/BtnVoltar';

function Cadastrar() {
  const [nome, setNome] = useState('');
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const [email, setEmail] = useState('');

  const handleSenha = (value) => {
      setSenha(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    console.log('Nome:', nome);
    console.log('Usuário:', usuario);
    console.log('Senha:', senha);
    console.log('Email:', email);
  }

  return (<>
    <BtnVoltar pagina={'/'} />
    <main className='container text-center tela_cadastrar'>
      <h1 className='titulo_config'>Fresh Photo</h1>
      <div className='h-100 d-flex flex-column align-items-center justify-content-around'>
        <img src='assets/img_perfil.svg' alt='imagem padrão de usuário' className='img_cadastrar' />
        <form className='h-50 d-flex flex-column justify-content-around' onSubmit={handleSubmit} >
          <TextField 
            id='t_field_nome' 
            label='Nome' 
            variant="outlined" 
            size='small' 
            style={{ margin: '8px', width: '25ch' }} 
            value={nome} 
            onChange={(e) => setNome(e.target.value)}
            required
          />
          <TextField 
            id='t_field_usuario' 
            label='Usuário' 
            variant="outlined" 
            size='small' 
            style={{ margin: '8px', width: '25ch' }} 
            value={usuario} 
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
          <TFieldSenha
            tamanho='small'
            value={senha}
            onChange={handleSenha}
          />
          <TextField 
            id='t_field_email' 
            label='Email' 
            variant="outlined" 
            type='email' 
            size='small' 
            style={{ margin: '8px', width: '25ch' }} 
            value={email} 
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <div className='text-start ms-2 mb-2'>
            <input type="checkbox" name="termos" id="termos" />
            <label htmlFor="termos" className='ms-2 text-capitalize'>aceitar termos de uso</label><br />
          </div>
          <BtnEntrar texto={'cadastrar'} componente={<CreateIcon />} id_entrada={'btn_cadastrar'} />
        </form>
      </div>
    </main>
  </>
  );
}

export default Cadastrar;
