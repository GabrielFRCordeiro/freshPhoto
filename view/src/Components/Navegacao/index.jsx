import './Navegacao.css';

export default function Navegacao() {
  return (
    <nav className='navbar navegacao fs-1'>
        <div className="container">
            <i className="bi bi-house-door navIcon"></i>
            <i className="bi bi-search navIcon"></i>
            <i className="bi bi-hand-thumbs-up navIcon"></i>
            <i className="bi bi-person-circle navIcon navIconFocus"></i>
        </div>
    </nav>
  )
}
