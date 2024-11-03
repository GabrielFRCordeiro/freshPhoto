import './Cadastrar.css';
import TField from '../../Components/TField';
import TFieldSenha from '../../Components/TFieldSenha';
import BtnEntrar from '../../Components/BtnEntrar';
import CreateIcon from '@mui/icons-material/Create';
import BtnVoltar from '../../Components/BtnVoltar';

function Cadastrar() {
  return (<>
    <BtnVoltar />
    <main className='container text-center tela_cadastrar'>
      <div className='h-100 d-flex flex-column align-items-center justify-content-around'>
        <img src='assets/logo_login.png' alt='pedaço de melancia com Fresh Photo escrito em baixo' />
        <form className='h-50 d-flex flex-column justify-content-around'>
          <TField texto='Nome' tamanho='small' />
          <TField texto='Usuário' tamanho='small' />
          <TFieldSenha tamanho='small' />
          <TField texto='Email' tipo='email' tamanho='small' />
          <a href='#'><p className='text-start ms-2'>Esqueceu sua senha?</p></a>
          <BtnEntrar texto={'CADASTRAR'} componente={<CreateIcon />} />
        </form>
      </div>
    </main>
  </>
  );
}

export default Cadastrar;
