// En src/components/CheckoutForm/CheckoutForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './CheckoutForm.css';

function CheckoutForm() {
  const { crearOrden, user } = useAppContext(); // Traemos el usuario logueado
  const navigate = useNavigate();
  
  // Modificación: Nuevo estado para la pasarela de pago
  const [formData, setFormData] = useState({
    nombreTitular: user ? user.name : '', // Pre-llenamos el nombre si el usuario existe
    email: '',
    telefono: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la validación de los campos...

    // Modificación: Pasamos todos los datos del formulario a crearOrden
    crearOrden(formData, (ordenId, orden) => {
      navigate(`/factura/${ordenId}`, { state: { ordenId, orden } });
    }, (error) => {
      console.error('Error al procesar el pago:', error);
      alert('Hubo un error al procesar el pago.');
    });
  };

  return (
    <div className="checkout-container">
      <h2>Datos de Pago</h2>
      <form onSubmit={handleSubmit} className="checkout-form">
        <div className="form-group">
          <label htmlFor="nombreTitular">Nombre del Titular</label>
          <input type="text" name="nombreTitular" value={formData.nombreTitular} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input type="email" name="email" value={formData.email} onChange={handleChange} required />
        </div>
        
        <div className="form-group">
          <label htmlFor="telefono">Teléfono</label>
          <input type="tel" name="telefono" value={formData.telefono} onChange={handleChange} required />
        </div>

        <div className="form-group">
          <label htmlFor="numeroTarjeta">Número de Tarjeta</label>
          <input type="text" name="numeroTarjeta" placeholder="0000 0000 0000 0000" value={formData.numeroTarjeta} onChange={handleChange} required />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label htmlFor="vencimiento">Vencimiento (MM/AA)</label>
            <input type="text" name="vencimiento" placeholder="MM/AA" value={formData.vencimiento} onChange={handleChange} required />
          </div>
          <div className="form-group">
            <label htmlFor="cvv">CVV</label>
            <input type="password" name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="confirmar-btn">Pagar Ahora</button>
      </form>
    </div>
  );
}

export default CheckoutForm;