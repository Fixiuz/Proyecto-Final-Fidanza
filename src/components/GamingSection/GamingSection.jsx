import React from 'react';
import { Link } from 'react-router-dom';
import { FaHeadset, FaKeyboard, FaMouse, FaChair } from 'react-icons/fa';
import './GamingSection.css';

function GamingSection() {
  return (
    <section className="gaming-section-container">
      <div className="gaming-section-header">
        <h2>Tu Setup Gamer Definitivo</h2>
        <p>Desde periféricos de precisión hasta la comodidad que necesitas para largas sesiones. Encuentra todo para llevar tu juego al siguiente nivel.</p>
      </div>
      <div className="gaming-grid">
        
        <div className="gaming-card">
          <div className="gaming-card-icon-container">
            <FaKeyboard className="gaming-card-icon" />
            <FaMouse className="gaming-card-icon" />
          </div>
          <h3>Periféricos de Precisión</h3>
          <p>Teclados mecánicos, mouses ultraligeros y alfombrillas de alta velocidad para una respuesta inmediata.</p>
          <Link to="/catalogo?categoria=Gaming" className="gaming-card-button">
            Ver Periféricos
          </Link>
        </div>

        
        <div className="gaming-card">
          <div className="gaming-card-icon-container">
            <FaHeadset className="gaming-card-icon" />
          </div>
          <h3>Audio Inmersivo</h3>
          <p>Escucha cada paso y cada detalle con nuestros auriculares con sonido envolvente 7.1 y micrófonos nítidos.</p>
          <Link to="/catalogo?categoria=Audio" className="gaming-card-button">
            Ver Auriculares
          </Link>
        </div>

        
        <div className="gaming-card">
          <div className="gaming-card-icon-container">
            <FaChair className="gaming-card-icon" />
          </div>
          <h3>Comodidad para Ganar</h3>
          <p>Sillas ergonómicas diseñadas para mantenerte cómodo y concentrado durante horas de juego intenso.</p>
          <Link to="/catalogo?categoria=Gaming" className="gaming-card-button">
            Ver Sillas
          </Link>
        </div>
      </div>
    </section>
  );
}

export default GamingSection;