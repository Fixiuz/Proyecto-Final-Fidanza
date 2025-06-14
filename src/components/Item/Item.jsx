import React from 'react';
import { Card } from 'react-bootstrap'; // Se mantiene Card, pero no Button
import { Link } from 'react-router-dom';
import './Item.css';
import { useAppContext } from '../../context/AppContext';

function Item({ producto }) {
  const { addToCart } = useAppContext();

  const handleAddToCart = () => {
    addToCart(producto);
  }

  return (
    <Card className="item-card">
      <div className="item-img-container">
        <Card.Img
          variant="top"
          src={producto.img}
          alt={producto.titulo}
          className="item-img"
        />
        <Link to={`/item/${producto.id}`} className="item-details-overlay">
          <span className="item-details-text">Ver Detalles</span>
        </Link>
      </div>
      <Card.Body className="d-flex flex-column item-card-body">
        <Card.Title className="item-title text-truncate" title={producto.titulo}>
          {producto.titulo}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted item-price">
          ${producto.precio}
        </Card.Subtitle>
        <Card.Text className="item-desc">
          {producto.descripcion}
        </Card.Text>
        
        {/* Usamos un div contenedor para el botón */}
        <div className="item-btn-container">
          <button onClick={handleAddToCart} className="item-btn">
            Agregar al carrito
          </button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;