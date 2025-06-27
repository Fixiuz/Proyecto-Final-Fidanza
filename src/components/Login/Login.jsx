import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Login.css';

// --- Sub-componente para la Mascota (PINGÜINO) ---
const LoginMascot = ({ state }) => {
  // state puede ser: 'idle', 'hiding', 'peeking'

  const idleSvg = (
    <svg width="120" height="120" viewBox="0 0 200 200">
      {/* Cuerpo del Pingüino */}
      <path d="M 100,20 C 70,20 50,50 50,90 C 50,150 70,180 100,180 C 130,180 150,150 150,90 C 150,50 130,20 100,20 Z" fill="#2c3e50"/>
      {/* Panza Blanca */}
      <path d="M 100,50 C 80,50 70,70 70,90 C 70,130 80,150 100,150 C 120,150 130,130 130,90 C 130,70 120,50 100,50 Z" fill="white"/>
      {/* Ojos */}
      <circle cx="85" cy="80" r="10" fill="white"/>
      <circle cx="115" cy="80" r="10" fill="white"/>
      <circle cx="87" cy="82" r="5" fill="#2c3e50"/>
      <circle cx="113" cy="82" r="5" fill="#2c3e50"/>
      {/* Pico */}
      <path d="M 95,95 L 105,95 L 100,105 Z" fill="#ffff00"/>
      {/* Aletas */}
      <path d="M 50,90 C 30,110 30,130 50,140 L 60,130 C 50,125 50,115 55,100 Z" fill="#2c3e50"/>
      <path d="M 150,90 C 170,110 170,130 150,140 L 140,130 C 150,125 150,115 145,100 Z" fill="#2c3e50"/>
    </svg>
  );

  const hidingSvg = (
    <svg width="120" height="120" viewBox="0 0 200 200">
      {/* Cuerpo y Panza (igual) */}
      <path d="M 100,20 C 70,20 50,50 50,90 C 50,150 70,180 100,180 C 130,180 150,150 150,90 C 150,50 130,20 100,20 Z" fill="#2c3e50"/>
      <path d="M 100,50 C 80,50 70,70 70,90 C 70,130 80,150 100,150 C 120,150 130,130 130,90 C 130,70 120,50 100,50 Z" fill="white"/>
      {/* Aletas cubriendo los ojos */}
      <path d="M 50,90 C 60,70 90,65 100,75 L 100,95 C 90,105 60,110 50,90 Z" fill="#2c3e50" transform="rotate(-10 100 100)"/>
      <path d="M 150,90 C 140,70 110,65 100,75 L 100,95 C 110,105 140,110 150,90 Z" fill="#2c3e50" transform="rotate(10 100 100)"/>
      {/* Pico */}
      <path d="M 95,95 L 105,95 L 100,105 Z" fill="#f39c12"/>
    </svg>
  );

  const peekingSvg = (
    <svg width="120" height="120" viewBox="0 0 200 200">
       {/* Cuerpo y Panza (igual) */}
      <path d="M 100,20 C 70,20 50,50 50,90 C 50,150 70,180 100,180 C 130,180 150,150 150,90 C 150,50 130,20 100,20 Z" fill="#2c3e50"/>
      <path d="M 100,50 C 80,50 70,70 70,90 C 70,130 80,150 100,150 C 120,150 130,130 130,90 C 130,70 120,50 100,50 Z" fill="white"/>
      {/* Aleta izquierda cubriendo */}
      <path d="M 50,90 C 60,70 90,65 100,75 L 100,95 C 90,105 60,110 50,90 Z" fill="#2c3e50" transform="rotate(-10 100 100)"/>
      {/* Ojo derecho visible */}
      <circle cx="115" cy="80" r="10" fill="white"/>
      <circle cx="113" cy="82" r="5" fill="#2c3e50"/>
      {/* Pico */}
      <path d="M 95,95 L 105,95 L 100,105 Z" fill="#f39c12"/>
      {/* Aleta derecha */}
      <path d="M 150,90 C 170,110 170,130 150,140 L 140,130 C 150,125 150,115 145,100 Z" fill="#2c3e50"/>
    </svg>
  );

  if (state === 'hiding') return hidingSvg;
  if (state === 'peeking') return peekingSvg;
  return idleSvg;
};


// --- Componente Principal ---
const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppContext();

  // --- Estados para la animación ---
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && contrasena.trim()) {
      login({ name: nombre });
      navigate(from, { replace: true });
    } else {
      alert("Por favor, completa ambos campos.");
    }
  };

  // Determinar el estado de la mascota
  let mascotState = 'idle';
  if (isPasswordFocused) {
    mascotState = 'hiding';
  }
  if (isPasswordVisible) {
    mascotState = 'peeking';
  }

  return (
    <div className="login-page-container">
      <div className="login-mascot">
        <LoginMascot state={mascotState} />
      </div>
      <div className="login-container">
          <h2>Iniciar Sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
              <div className="form-group">
                  <label htmlFor="nombre">Nombre de Usuario</label>
                  <input
                      type="text"
                      id="nombre"
                      value={nombre}
                      onChange={(e) => setNombre(e.target.value)}
                      required
                  />
              </div>
              <div className="form-group">
                  <label htmlFor="contrasena">Contraseña</label>
                  <div className="password-wrapper">
                    <input
                        type={isPasswordVisible ? 'text' : 'password'}
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                        onFocus={() => setIsPasswordFocused(true)}
                        onBlur={() => setIsPasswordFocused(false)}
                        required
                    />
                    <span className="password-toggle-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
                      {isPasswordVisible ? '🙈' : '👁️'}
                    </span>
                  </div>
              </div>
              <button type="submit" className="login-btn">Ingresar</button>
          </form>
      </div>
    </div>
  );
};

export default Login;