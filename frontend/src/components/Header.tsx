import { Link, useLocation } from 'react-router-dom'
import '../styles/components/header.sass'
import Logo from '../assets/img_logo.svg'
import BtnAcao from './BtnAcao'

export default function Header() {
  const location = useLocation();

  const getHomeIconClass = () => {
    return location.pathname === '/' ? 'bi bi-house-door-fill' : 'bi bi-house-door';
  };
  const getExplorarIconClass = () => {
    return location.pathname === '/explorar' ? 'bi bi-compass-fill' : 'bi bi-compass';
  };
  const getDuvidasIconClass = () => {
    return location.pathname === '/duvidas' ? 'bi bi-chat-dots-fill' : 'bi bi-chat-dots';
  };
  const getPerfilIconClass = () => {
    return location.pathname === '/perfil' ? 'bi bi-person-circle' : 'bi bi-person';
  };

  return (
    <header className='navegacao d-flex flex-lg-column justify-content-around justify-content-lg-start align-items-lg-center align-items-xl-start px-lg-3 px-xxl-4'>
        <Link to={'/'} className='nav_logo d-none d-lg-flex align-items-center justify-content-center justify-content-lg-start mt-3 w-100'>
            <img src={Logo} alt="Logo do Fresh Photo" className='d-none d-lg-inline me-2' />
            <h2 className="d-none d-lg-inline mb-0">Fresh Photo</h2>
        </Link>
        <nav className='d-flex flex-lg-column justify-content-around justify-content-lg-start w-100 align-items-lg-start'>
            <Link to={'/'} className='mt-lg-5 d-flex align-items-center order-0'>
                <i className={getHomeIconClass()}></i>
                <p className="d-none d-lg-inline mb-0 ms-2">Home</p>
            </Link>
            <Link to={'/explorar'} className='mt-lg-5 d-flex align-items-center order-1'>
                <i className={getExplorarIconClass()}></i>
                <p className="d-none d-lg-inline mb-0 ms-2">Explorar</p>
            </Link>
            <button className='btn_criar mt-lg-5 d-flex align-items-center order-2 order-lg-3'>
                <i className="bi bi-plus-circle"></i>
                <p className="d-none d-lg-inline mb-0 ms-2">Criar</p>
            </button>
            <Link to={'/duvidas'} className='mt-lg-5 d-flex align-items-center order-3 order-lg-2'>
                <i className={getDuvidasIconClass()}></i>
                <p className="d-none d-lg-inline mb-0 ms-2">Dúvidas</p>
            </Link>
            <Link to={'/perfil'} className='my-lg-5 d-flex align-items-center order-4'>
                <i className={getPerfilIconClass()}></i>
                <p className="d-none d-lg-inline mb-0 ms-2">Perfil</p>
            </Link>
        </nav>
        <div className='nav_config d-none d-lg-flex flex-column justify-content-end mb-4'>
            <Link to={'/configuracoes'}>
                <BtnAcao icone='gear' >Minha Conta</BtnAcao>
            </Link>
            <Link to={'/entrar'}>
                <BtnAcao icone='box-arrow-left'>Sair</BtnAcao>
            </Link>
        </div>
    </header>
  )
}
