// src/components/CartSidebar/CartSidebar.jsx

import React, { useEffect } from 'react';
// MODIFICACIÓN: Importamos useAppContext para poder leer el estado isMobile.
import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import './CartSidebar.css';

function CartSidebar() {
  // MODIFICACIÓN: Extraemos isMobile del contexto.
  const { cart, updateItemQuantity, isSidebarOpen, setIsSidebarOpen, isMobile } = useAppContext();
  const { pathname } = useLocation();
  
  const isCatalogArea = pathname.startsWith('/catalogo') || pathname.startsWith('/item');

  useEffect(() => {
    // MODIFICACIÓN: Añadimos la condición !isMobile.
    // El sidebar ahora solo se abrirá automáticamente si estamos en el área del catálogo,
    // el carrito tiene productos Y NO estamos en un dispositivo móvil.
    if (isCatalogArea && cart.length > 0 && !isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
    // Añadimos isMobile al array de dependencias.
  }, [cart.length, isCatalogArea, setIsSidebarOpen, isMobile]);

  if (!isSidebarOpen) {
    return null;
  }

  return (
    // ... (el resto de tu JSX se mantiene igual)
    <div className="cart-sidebar open">
      <h4>Resumen del Carrito</h4>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="cart-sidebar-item">
            <img src={item.img || item.imagen} alt={item.titulo} className="mini-img" />
            <div>
              <p>{item.titulo}</p>
              <p>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                 x ${item.precio}
              </p>
            </div>
          </li>
        ))}
      </ul>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/carrito" onClick={() => setIsSidebarOpen(false)}>
          <button className="ver-carrito">Ver carrito completo</button>
        </Link>
      </div>
    </div>
  );
}

export default CartSidebar;