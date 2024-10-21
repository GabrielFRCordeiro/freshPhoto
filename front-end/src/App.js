import './App.css';
import TField from './Components/TField';
import TFieldSenha from './Components/TFieldSenha';

function App() {
  return (<>
      <img src='assets/logo_login.png' alt='pedaço de melancia com Fresh Photo escrito em baixo' />
      <TField texto='Usuário ou email' tamanho='small' />
      <TFieldSenha tamanho='small' />
    </>
  );
}

export default App;
