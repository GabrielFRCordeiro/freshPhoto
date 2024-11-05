import './Login.css';
import TField from '../../Components/TField';
import TFieldSenha from '../../Components/TFieldSenha';
import BtnEntrar from '../../Components/BtnEntrar';
import LoginIcon from '@mui/icons-material/Login';
import BtnVoltar from '../../Components/BtnVoltar';

function Login() {
  return (<>
    <BtnVoltar />
    <main className='container text-center tela_login'>
      <div className='h-100 d-flex flex-column align-items-center justify-content-around'>
        <img src='assets/logo_login.png' alt='pedaço de melancia com Fresh Photo escrito em baixo' />
        <form className='h-50 d-flex flex-column justify-content-around'>
          <TField texto='usuário ou email' tamanho='small' />
          <TFieldSenha tamanho='small' />
          <a href='#'><p className='text-start ms-2 text-capitalize'>esqueceu sua senha?</p></a>
          <BtnEntrar texto={'login'} componente={<LoginIcon />} />
        </form>
      </div>
    </main>
  </>
  );
}

export default Login;
