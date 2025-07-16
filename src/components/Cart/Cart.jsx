import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import { Helmet } from 'react-helmet-async'; 
import './Cart.css';

function Cart() {
  const { cart, clearCart, removeFromCart, updateItemQuantity } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

 
  const handleCheckout = () => {
    navigate('/checkout');
  };

  return (
    <div className="cart-container">
      <Helmet>
        <title>TechLife - Carrito</title>
        <meta name="description" content="Revisa los productos en tu carrito de compras en TechLife." />
      </Helmet>
      
      
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center' }}>
          <p>El carrito está vacío.</p>
          <Link to="/catalogo" className="seguir-comprando-btn">Seguir Comprando</Link>
        </div>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.titulo} className="cart-item-img" />
                <div className="cart-item-info">
                  <h4>{item.titulo}</h4>
                  <p>Precio unitario: ${item.precio}</p>
                  <label>Cantidad:</label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity}
                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value, 10))}
                    className="cart-cantidad-input"
                  />
                  <p>Subtotal: ${(item.precio * item.quantity).toFixed(2)}</p>
                  <button onClick={() => removeFromCart(item.id)} className="eliminar-btn">
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <div className="cart-buttons">
            <Link to="/catalogo" className="seguir-comprando-btn">Seguir comprando</Link>
            <button onClick={handleCheckout} className="finalizar-compra-btn">
              Finalizar compra
            </button>
            <button onClick={clearCart} className="vaciar-btn">Vaciar Carrito</button>
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;