import { Link } from 'react-router-dom'
import '../styles/components/header.scss'
import Logo from '../assets/img_logo.svg'

export default function Header() {
  return (
    <header className='navegacao'>
        <Link to={'/home'} className='d-none d-lg-flex'>
            <img src={Logo} alt="Logo do Fresh Photo" />
            <h2>Fresh Photo</h2>
        </Link>
        <nav className='d-flex flex-lg-column justify-content-around justify-content-lg-start w-100 align-items-lg-center align-items-xl-start'>
            <Link to={'/home'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-house-door"></i>
                <p className="mb-0 ms-2">Home</p>
            </Link>
            <Link to={'/explorar'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-compass-fill"></i>
                <p className="mb-0 ms-2">Explorar</p>
            </Link>
            <Link to={'/duvidas'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-chat-dots-fill"></i>
                <p className="mb-0 ms-2">Dúvidas</p>
            </Link>
            <button className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-plus-circle"></i>
                <p className="mb-0 ms-2">Criar</p>
            </button>
            <Link to={'/perfil'} className='mt-lg-5 d-flex align-items-center'>
                <i className="bi bi-person-circle"></i>
                <p className="mb-0 ms-2">Perfil</p>
            </Link>
        </nav>
        <div className='d-none d-lg-flex flex-column'>
            <button>Minha Conta</button>
            <button>Sair</button>
        </div>
    </header>
  )
}
