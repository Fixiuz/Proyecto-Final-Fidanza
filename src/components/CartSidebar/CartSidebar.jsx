

import React, { useEffect } from 'react';

import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import './CartSidebar.css';

function CartSidebar() {
  
  const { cart, updateItemQuantity, isSidebarOpen, setIsSidebarOpen, isMobile } = useAppContext();
  const { pathname } = useLocation();
  
  const isCatalogArea = pathname.startsWith('/catalogo') || pathname.startsWith('/item');

  useEffect(() => {
    
    if (isCatalogArea && cart.length > 0 && !isMobile) {
      setIsSidebarOpen(true);
    } else {
      setIsSidebarOpen(false);
    }
    
  }, [cart.length, isCatalogArea, setIsSidebarOpen, isMobile]);

  if (!isSidebarOpen) {
    return null;
  }

  return (
    
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