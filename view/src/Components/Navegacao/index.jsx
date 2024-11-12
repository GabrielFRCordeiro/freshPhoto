import './Navegacao.css';

export default function Navegacao() {
  return (
    <nav className='navbar navegacao fs-1'>
        <div className="container d-lg-flex flex-lg-column justify-content-lg-aroundcontainer d-lg-flex flex-lg-column justify-content-lg-start">
            <i className="bi bi-house-door navIcon mt-lg-5"></i>
            <i className="bi bi-search navIcon mt-lg-4"></i>
            <i className="bi bi-hand-thumbs-up navIcon mt-lg-4"></i>
            <i className="bi bi-person-circle navIcon navIconFocus mt-lg-4"></i>
        </div>
    </nav>
  )
}
