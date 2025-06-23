import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Login.css';

// --- Sub-componente para la Mascota PINGÜINO MEJORADO ---
const LoginMascot = ({ state }) => {
  const idleSvg = (
    <svg width="140" height="140" viewBox="0 0 200 200">
      <g>
        <path d="M100 180 C138.66 180 170 148.66 170 110 C170 71.34 138.66 40 100 40 C61.34 40 30 71.34 30 110 C30 148.66 61.34 180 100 180 Z" fill="#34495e"/>
        <path d="M100 170 C133.137 170 160 143.137 160 110 C160 76.863 133.137 50 100 50 C66.863 50 40 76.863 40 110 C40 143.137 66.863 170 100 170 Z" fill="#ecf0f1"/>
        <circle cx="80" cy="95" r="12" fill="white"/><circle cx="120" cy="95" r="12" fill="white"/>
        <circle cx="82" cy="98" r="6" fill="#2c3e50"/><circle cx="118" cy="98" r="6" fill="#2c3e50"/>
        <path d="M95 110 L105 110 L100 125 Z" fill="#f39c12"/>
        <path d="M30 110 C10 120 10 140 30 150 L45 140 C35 130 35 120 40 110 Z" fill="#2c3e50"/>
        <path d="M170 110 C190 120 190 140 170 150 L155 140 C165 130 165 120 160 110 Z" fill="#2c3e50"/>
      </g>
    </svg>
  );
  const hidingSvg = (
    <svg width="140" height="140" viewBox="0 0 200 200">
      <g>
        <path d="M100 180 C138.66 180 170 148.66 170 110 C170 71.34 138.66 40 100 40 C61.34 40 30 71.34 30 110 C30 148.66 61.34 180 100 180 Z" fill="#34495e"/>
        <path d="M100 170 C133.137 170 160 143.137 160 110 C160 76.863 133.137 50 100 50 C66.863 50 40 76.863 40 110 C40 143.137 66.863 170 100 170 Z" fill="#ecf0f1"/>
        <path d="M95 110 L105 110 L100 125 Z" fill="#f39c12"/>
        <path d="M30 110 C45 80 80 70 95 85 L85 105 C70 95 45 95 30 110 Z" fill="#2c3e50" transform="rotate(-5 80 95)" />
        <path d="M170 110 C155 80 120 70 105 85 L115 105 C130 95 155 95 170 110 Z" fill="#2c3e50" transform="rotate(5 120 95)" />
      </g>
    </svg>
  );
   const peekingSvg = (
    <svg width="140" height="140" viewBox="0 0 200 200">
       <g>
        <path d="M100 180 C138.66 180 170 148.66 170 110 C170 71.34 138.66 40 100 40 C61.34 40 30 71.34 30 110 C30 148.66 61.34 180 100 180 Z" fill="#34495e"/>
        <path d="M100 170 C133.137 170 160 143.137 160 110 C160 76.863 133.137 50 100 50 C66.863 50 40 76.863 40 110 C40 143.137 66.863 170 100 170 Z" fill="#ecf0f1"/>
        <circle cx="120" cy="95" r="12" fill="white"/><circle cx="118" cy="98" r="6" fill="#2c3e50"/>
        <path d="M95 110 L105 110 L100 125 Z" fill="#f39c12"/>
        <path d="M30 110 C45 80 80 70 95 85 L85 105 C70 95 45 95 30 110 Z" fill="#2c3e50" transform="rotate(-5 80 95)" />
        <path d="M170 110 C190 120 190 140 170 150 L155 140 C165 130 165 120 160 110 Z" fill="#2c3e50"/>
      </g>
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
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const { login } = useAppContext();
  const navigate = useNavigate();
  const location = useLocation();
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

  let mascotState = 'idle';
  if (isPasswordFocused) mascotState = 'hiding';
  if (isPasswordVisible) mascotState = 'peeking';

  return (
    <div className="login-final-background">
      <div className="login-final-container">
        <div className="login-final-mascot">
          <LoginMascot state={mascotState} />
        </div>
        
        <h2>Bienvenido de Vuelta</h2>
        <p className="subtitle">Ingresa tus credenciales para continuar</p>

        <form onSubmit={handleSubmit} className="login-final-form">
          <div className="form-group">
            <input
              type="text"
              id="nombre"
              className="form-input"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
            <label htmlFor="nombre" className="form-label">Usuario</label>
          </div>
          <div className="form-group">
            <input
              type={isPasswordVisible ? 'text' : 'password'}
              id="contrasena"
              className="form-input"
              value={contrasena}
              onChange={(e) => setContrasena(e.target.value)}
              onFocus={() => setIsPasswordFocused(true)}
              onBlur={() => setIsPasswordFocused(false)}
              required
            />
            <label htmlFor="contrasena" className="form-label">Contraseña</label>
            <span className="password-toggle-icon" onClick={() => setIsPasswordVisible(!isPasswordVisible)}>
              {isPasswordVisible ? '🙈' : '👁️'}
            </span>
          </div>
          <button type="submit" className="login-final-btn">
            Ingresar
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;