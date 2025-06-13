import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Login.css'; // Asegúrate de tener este archivo si lo necesitas

const Login = () => {
  const [nombre, setNombre] = useState('');
  const [contrasena, setContrasena] = useState('');
  const navigate = useNavigate();
  const location = useLocation();
  const { login } = useAppContext();

  // Revisa si venimos de una ruta protegida. Si no, nos envía al inicio.
  const from = location.state?.from?.pathname || "/";

  const handleSubmit = (e) => {
    e.preventDefault();
    if (nombre.trim() && contrasena.trim()) {
      login({ name: nombre });
      // Nos devuelve a la página desde la que vinimos (ej. /checkout)
      navigate(from, { replace: true });
    } else {
      alert("Por favor, completa ambos campos.");
    }
  };

  return (
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
                <input
                    type="password"
                    id="contrasena"
                    value={contrasena}
                    onChange={(e) => setContrasena(e.target.value)}
                    required
                />
            </div>
            <button type="submit" className="login-btn">Ingresar</button>
        </form>
    </div>
  );
};

export default Login;