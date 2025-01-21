import { Link, useLocation } from "react-router-dom"
import '../styles/components/header.css'

function Header() {
  const location = useLocation();
  
  return (
    <header>
        <nav class='navbar navegacao fs-1 w-100'>
            <div class="d-flex flex-lg-column justify-content-around justify-content-lg-start w-100 align-items-lg-center">
                <Link to={'/home'} className="mt-lg-5" >
                    <i className={location.pathname == '/home' ? "bi bi-house-door navIcon navIconFocus" : "bi bi-house-door navIcon"}></i>
                </Link>
                <Link to={'/seguindo'} className="mt-lg-4" >
                    <i className={location.pathname == '/seguindo' ? "bi bi-hand-thumbs-up navIcon navIconFocus" : "bi bi-hand-thumbs-up navIcon"}></i>
                </Link>
                <Link to={'/perfil'} className="mt-lg-4" >
                    <i className={location.pathname == '/perfil' ? "bi bi-person-circle navIcon navIconFocus" : "bi bi-person-circle navIcon"}></i>
                </Link>
            </div>
        </nav>
    </header>
  )
}

export default Header