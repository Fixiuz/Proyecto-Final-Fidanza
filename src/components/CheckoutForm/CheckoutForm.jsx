// En src/components/CheckoutForm/CheckoutForm.jsx

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 1. Importamos SweetAlert2
import { useAppContext } from '../../context/AppContext';
import './CheckoutForm.css';

function CheckoutForm() {
  const { crearOrden, user } = useAppContext();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    nombreTitular: user ? user.name : '',
    email: '',
    telefono: '',
    numeroTarjeta: '',
    vencimiento: '',
    cvv: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Modificamos la función handleSubmit para usar SweetAlert
  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí iría la validación de los campos...

    // Definimos la función que se ejecutará si la orden se crea con éxito
    const onSuccess = (ordenId, orden) => {
      Swal.fire({
        title: '¡Compra Realizada!',
        text: `Tu pedido #${ordenId} ha sido procesado con éxito.`,
        icon: 'success',
        confirmButtonText: 'Ver Mi Factura',
        allowOutsideClick: false // Evita que la alerta se cierre al hacer clic fuera
      }).then((result) => {
        // Cuando el usuario presiona el botón, lo redirigimos a la factura
        if (result.isConfirmed) {
          navigate(`/factura/${ordenId}`, { state: { ordenId, orden } });
        }
      });
    };

    // Definimos la función que se ejecutará si hay un error
    const onError = (error) => {
      console.error('Error al procesar el pago:', error);
      Swal.fire({
        title: 'Error en el Pago',
        text: `Hubo un problema al procesar tu pago: ${error.message}`,
        icon: 'error',
      });
    };

    // Llamamos a crearOrden con los datos y las funciones de callback
    crearOrden(formData, onSuccess, onError);
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
            <input name="cvv" placeholder="123" value={formData.cvv} onChange={handleChange} required />
          </div>
        </div>

        <button type="submit" className="confirmar-btn">Pagar Ahora</button>
      </form>
    </div>
  );
}

export default CheckoutForm;