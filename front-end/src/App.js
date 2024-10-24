import './App.css';
import TField from './Components/TField';
import TFieldSenha from './Components/TFieldSenha';
import BtnEntrar from './Components/BtnEntrar';
import LoginIcon from '@mui/icons-material/Login';
import BtnVoltar from './Components/BtnVoltar';

function App() {
  return (<>
    <BtnVoltar />
    <main className='container'>
      <img src='assets/logo_login.png' alt='pedaço de melancia com Fresh Photo escrito em baixo' />
      <form>
        <TField texto='Usuário ou email' tamanho='small' />
        <TFieldSenha tamanho='small' />
        <a href='#'><p>Esqueceu sua senha?</p></a>
        <BtnEntrar texto={'LOGIN'} componente={<LoginIcon />} />
      </form>
    </main>
  </>
  );
}

export default App;
