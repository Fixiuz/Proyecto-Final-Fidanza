import React from 'react';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';
import { useAppContext } from '../../context/AppContext';
import './CartWidget.css'; // Crearemos este archivo para los estilos del contador

const CartWidget = () => {
  const { cart } = useAppContext();

  // Calculamos la cantidad total de items en el carrito (sumando las cantidades de cada producto)
  const totalItems = cart.reduce((accumulator, currentItem) => {
    return accumulator + currentItem.quantity;
  }, 0);

  return (
    <Link to="/carrito" className="cart-widget-container">
      <BsCart3 size={22} />
      {totalItems > 0 && (
        <span className="cart-item-count">{totalItems}</span>
      )}
    </Link>
  );
};

export default CartWidget;