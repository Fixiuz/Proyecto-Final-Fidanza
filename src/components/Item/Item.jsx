import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './Item.css';

function Item({ producto }) {
  const handleAddToCart = () => {
    
    alert(`¡${producto.titulo} ha sido añadido al carrito!`);
    console.log(`Agregado al carrito: ${producto.titulo}`);
  }

  return (
    <Card className=" item-card">
      <div className="item-img-container"> 
        <Card.Img
          variant="top"
          src={producto.img}
          alt={producto.titulo}
          className="item-img"
        />
        
        <Link to={`/item/${producto.id}`} className="item-details-overlay">
          <span className="item-details-text" >Ver Detalles </span>
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
        <div className=" btn">
          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="w-10 item-btn"
          >
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;