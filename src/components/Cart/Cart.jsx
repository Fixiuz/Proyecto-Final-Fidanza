import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Modificación
import './Cart.css';

function Cart() {
  // Modificación: Nombres de nuestro contexto
  const { cart, clearCart, removeFromCart, updateItemQuantity } = useAppContext();
  const navigate = useNavigate();

  const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);

  return (
    <div className="cart-container">
      <h2>Tu Carrito</h2>
      {cart.length === 0 ? (
        <>
          <p>El carrito está vacío.</p>
          <Link to="/catalogo" className="seguir-comprando-btn">Seguir Comprando</Link>
        </>
      ) : (
        <>
          <ul className="cart-list">
            {cart.map((item) => (
              <li key={item.id} className="cart-item">
                <img src={item.img} alt={item.titulo} className="cart-item-img" /> {/* Modificación */}
                <div className="cart-item-info">
                  <h4>{item.titulo}</h4> {/* Modificación */}
                  <p>{item.descripcion}</p>
                  <p>Precio unitario: ${item.precio}</p>
                  <label>Cantidad: </label>
                  <input
                    type="number"
                    min="1"
                    value={item.quantity} // Modificación
                    onChange={(e) => updateItemQuantity(item.id, parseInt(e.target.value))} // Modificación
                    className="cart-cantidad-input"
                  />
                  <p>Subtotal: ${item.precio * item.quantity}</p> {/* Modificación */}
                  <button onClick={() => removeFromCart(item.id)} className="eliminar-btn"> {/* Modificación */}
                    Eliminar
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <h3>Total: ${total.toFixed(2)}</h3>
          <div className="cart-buttons">
            <Link to="/catalogo" className="seguir-comprando-btn">Seguir comprando</Link>
            <button onClick={() => navigate('/checkout')} className="finalizar-compra-btn">
              Finalizar compra
            </button>
            <button onClick={clearCart} className="vaciar-btn">Vaciar Carrito</button> {/* Modificación */}
          </div>
        </>
      )}
    </div>
  );
}

export default Cart;