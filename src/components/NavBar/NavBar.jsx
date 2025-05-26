import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import './NavBar.css';

function NavBar({ usuario, setUsuario }) {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    setUsuario(null);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <Link to="/" onClick={() => setExpanded(false)}><p>Tech</p><p className='logo2'>Life</p></Link>
        </div>

        {/* Botón hamburguesa */}
        <button
          className="navbar-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          ☰
        </button>

        {/* Menú desplegable */}
        <div className={`navbar-menu ${expanded ? 'expanded' : ''}`}>
          <ul className="navbar-center">
            <li><Link to="/catalogo" onClick={() => setExpanded(false)}>Catálogo</Link></li>
            <li><Link to="/about" onClick={() => setExpanded(false)}>Quiénes Somos</Link></li>
            <li><Link to="/contact" onClick={() => setExpanded(false)}>Contactanos</Link></li>
          </ul>

          <div className="navbar-right">
            <Link to="/carrito" onClick={() => setExpanded(false)} className="cart-icon">
              <BsCart3 size={22} />
            </Link>
            {usuario ? (
              <>
                <span className="bienvenida">Bienvenido, {usuario}</span>
                <button className="sesion-btn" onClick={handleLogout}>Cerrar sesión</button>
              </>
            ) : (
              <button className="sesion-btn" onClick={() => { setExpanded(false); navigate('/login'); }}>
                Iniciar sesión
              </button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
