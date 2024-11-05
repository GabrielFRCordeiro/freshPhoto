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
      <h1 className='titulo_config'>Fresh Photo</h1>
      <div className='h-100 d-flex flex-column align-items-center justify-content-around'>
        <img src='assets/img_perfil.svg' alt='imagem padrão de usuário' />
        <form className='h-50 d-flex flex-column justify-content-around'>
          <TField texto='nome' tamanho='small' />
          <TField texto='usuário' tamanho='small' />
          <TFieldSenha tamanho='small' />
          <TField texto='email' tipo='email' tamanho='small' />
          <div className='text-start ms-2 mb-2'>
            <input type="checkbox" name="termos" id="termos" />
            <label htmlFor="termos" className='ms-2 text-capitalize'>aceitar termos e usos</label><br />
          </div>
          <BtnEntrar texto={'cadastrar'} componente={<CreateIcon />} />
        </form>
      </div>
    </main>
  </>
  );
}

export default Cadastrar;
