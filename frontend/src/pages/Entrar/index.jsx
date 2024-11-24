import './Entrar.css';
import BtnEntrar from '../../Components/BtnEntrar';
import LoginIcon from '@mui/icons-material/Login';
import CreateIcon from '@mui/icons-material/Create';
import { Link } from 'react-router-dom';

function Entrar() {
  return (
    <div className='fundo_entrar'>
        <main className='tela_entrar'>
            <img src='assets/logo_login.png' id='img_logo' alt='pedaço de melancia com Fresh Photo escrito em baixo' />
            <Link to={'/login'} id='link_login'>
              <BtnEntrar texto={'login'} componente={<LoginIcon />} id_entrada={'btn_login'} />
            </Link>
            <Link to={'/cadastrar'} id='link_cadastrar'>
              <BtnEntrar texto={'cadastrar'} componente={<CreateIcon />} id_entrada={'btn_cadastrar'} />
            </Link>
        </main>
    </div>
  )
}

export default Entrar
