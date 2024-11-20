import BtnAcao from '../BtnAcao'
import './CaixaPerfil.css'

function CaixaPerfil() {
  return (<header className='caixaPerfil d-flex flex-column flex-lg-row justify-content-evenly justify-content-lg-around'>
    <div className='d-flex align-items-center justify-content-center pe-5 pe-lg-0'>
        <img className='pe-4 pe-lg-3' src='assets/img_perfil.svg' alt='imagem padrão de usuário' />
        <div className='pe-5 pe-lg-0'>
        <h2>Nome</h2>
        <p>@usuario</p>
        </div>
    </div>
    <BtnAcao texto='Seguir' />
  </header>
  )
}

export default CaixaPerfil