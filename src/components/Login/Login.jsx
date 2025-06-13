import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './Login.css';

const Login = () => {
    const [nombre, setNombre] = useState('');
    const [contrasena, setContrasena] = useState('');
    const navigate = useNavigate();
    const { login } = useAppContext();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (nombre.trim() && contrasena.trim()) {
            login({ name: nombre });
            navigate('/');
        } else {
            alert("Por favor, completa ambos campos.");
        }
    };

    return (
        <div className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h2>Iniciar Sesión</h2>
                <div className="form-group">
                    <label htmlFor="nombre">Nombre de Usuario</label>
                    <input
                        type="text"
                        id="nombre"
                        value={nombre}
                        onChange={(e) => setNombre(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="contrasena">Contraseña</label>
                    <input
                        type="password"
                        id="contrasena"
                        value={contrasena}
                        onChange={(e) => setContrasena(e.target.value)}
                    />
                </div>
                <button type="submit" className="login-btn">Ingresar</button>
            </form>
        </div>
    );
};

export default Login;