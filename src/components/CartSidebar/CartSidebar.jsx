// En: src/components/CartSidebar/CartSidebar.jsx

import React, { useState, useEffect } from 'react';
import { useAppContext } from '../../context/AppContext';
import { useLocation, Link } from 'react-router-dom';
import './CartSidebar.css';

function CartSidebar() {
  const [hasOpened, setHasOpened] = useState(false);
  const { cart, updateItemQuantity, removeFromCart } = useAppContext();
  const { pathname } = useLocation();
  const isCatalogArea = pathname.startsWith('/catalogo') || pathname.startsWith('/item');

  useEffect(() => {
    if (isCatalogArea && cart.length > 0 && !hasOpened) {
      setHasOpened(true);
    }
    if (!isCatalogArea || cart.length === 0) {
      setHasOpened(false);
    }
  }, [cart.length, hasOpened, isCatalogArea]);

  if (!hasOpened) {
    return null;
  }

  return (
    <div className={`cart-sidebar ${hasOpened ? 'open' : ''}`}>
      <h4>Resumen del Carrito</h4>
      <ul>
        {cart.map(item => (
          <li key={item.id} className="cart-sidebar-item">
            <img src={item.img} alt={item.titulo} className="mini-img" /> {/* Modificación */}
            <div>
              <p>{item.titulo}</p>
              <p>
                <button onClick={() => updateItemQuantity(item.id, item.quantity - 1)}>-</button>
                <span style={{ margin: '0 8px' }}>{item.quantity}</span>
                <button onClick={() => updateItemQuantity(item.id, item.quantity + 1)}>+</button>
                x ${item.precio} = ${(item.quantity * item.precio).toFixed(2)}
              </p>
              <button onClick={() => removeFromCart(item.id)}>Eliminar</button>
            </div>
          </li>
        ))}
      </ul>

      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <Link to="/carrito" onClick={() => setHasOpened(false)}>
          <button className="ver-carrito">Ver carrito completo</button>
        </Link>
      </div>
    </div>
  );
}

export default CartSidebar;