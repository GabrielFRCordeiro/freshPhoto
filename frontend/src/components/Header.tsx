import { Link } from 'react-router-dom'
import '../styles/components/header.scss'
import Logo from '../assets/img_logo.svg'
import BtnAcao from './BtnAcao'

export default function Header() {
  return (
    <header className='navegacao d-flex flex-lg-column justify-content-around justify-content-lg-start align-items-lg-center align-items-xl-start px-lg-3 px-xxl-4'>
        <Link to={'/home'} className='nav_logo d-none d-lg-flex align-items-center justify-content-center justify-content-lg-start mt-3 w-100'>
            <img src={Logo} alt="Logo do Fresh Photo" className='d-none d-lg-inline me-2' />
            <h2 className="d-none d-lg-inline mb-0">Fresh Photo</h2>
        </Link>
        <nav className='d-flex flex-lg-column justify-content-around justify-content-lg-start w-100 align-items-lg-start'>
            <Link to={'/'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-house-door"></i>
                <p className="mb-0 ms-2">Home</p>
            </Link>
            <Link to={'/explorar'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-compass"></i>
                <p className="mb-0 ms-2">Explorar</p>
            </Link>
            <Link to={'/duvidas'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-chat-dots"></i>
                <p className="mb-0 ms-2">Dúvidas</p>
            </Link>
            <button className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-plus-circle"></i>
                <p className="mb-0 ms-2">Criar</p>
            </button>
            <Link to={'/perfil'} className='my-lg-5 d-flex align-items-center'>
                <i className="bi bi-person-circle"></i>
                <p className="mb-0 ms-2">Perfil</p>
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
