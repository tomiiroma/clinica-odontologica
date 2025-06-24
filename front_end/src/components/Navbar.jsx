import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
import logo from '../../public/images/logo-dental.png'
import { useAuth } from "../auth/useAuth"
import { logout } from "../auth/logout"

const NavBar = () => {
  const { isLoggedIn, rol } = useAuth()

  return (
    <header className="nav-container">
      <div className="nav-logo">
        <img src={logo} alt="Logo" className="nav-icon" />
        <span className="nav-title">Consultorio Odontológico</span>
      </div>
      
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/tratamientos">Tratamientos</Link>
        <Link to="/sedes">Sedes</Link>

        {/* Panel Afiliado dinámico */}
        <Link to={isLoggedIn ? `/dashboard-${rol}` : "/login"}>
          Ir a mi Panel
        </Link>

        {isLoggedIn && (
          <button onClick={logout} className="logout-button">
            Cerrar sesión
          </button>
        )}
      </nav>
    </header>
  )
}

export default NavBar
