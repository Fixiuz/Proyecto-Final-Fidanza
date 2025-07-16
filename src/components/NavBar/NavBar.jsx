import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './NavBar.css';
import { useAppContext } from '../../context/AppContext';
import CartWidget from '../CartWidget/CartWidget'; 
import { TbTools } from "react-icons/tb";

function NavBar() {
  const [expanded, setExpanded] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, user, logout } = useAppContext();

  const handleLogout = () => {
    logout();
    setExpanded(false);
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <Link to="/" onClick={() => setExpanded(false)}><p>Tech</p><p className='logo2'>Life</p></Link>
        </div>

        <button
          className="navbar-toggle"
          onClick={() => setExpanded(!expanded)}
        >
          ☰
        </button>

        <div className={`navbar-menu ${expanded ? 'expanded' : ''}`}>
          <ul className="navbar-center">
            <li><Link to="/catalogo" onClick={() => setExpanded(false)}>Productos</Link></li>
            <li><Link to="/como-comprar" onClick={() => setExpanded(false)}>Cómo Comprar</Link></li>
            <li><Link to="/contact" onClick={() => setExpanded(false)}>Contactanos</Link></li>
          </ul>

          <div className="navbar-right">
            
            <div onClick={() => setExpanded(false)}>
              <CartWidget />
            </div>

            {isLoggedIn ? (
              <>
                <span className="bienvenida"> {user.name}</span>

                <button className="sesion-btn" onClick={handleLogout}>Cerrar sesión</button>
                
                <Link to="/adminPanel" className='admin' onClick={() => setExpanded(false)}>🛠️ Admin Panel</Link>
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