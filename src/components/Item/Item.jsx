import React from 'react';
import { Card, Button } from 'react-bootstrap';

function Item({ producto, onAddToCart }) {
  return (
    <Card className="shadow-sm h-100">
      <div style={{ height: '200px', padding: '1rem', backgroundColor: '#f8f9fa' }}>
        <Card.Img 
          variant="top" 
          src={producto.img}
          alt={producto.titulo}
          style={{ height: '100%', objectFit: 'contain' }} 
        />        
      </div>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="text-truncate" title={producto.titulo}>
          {producto.titulo}
        </Card.Title>
        <Card.Subtitle className="mb-2 text-muted">
          ${producto.precio}
        </Card.Subtitle>
        <Card.Text className="text-capitalize text-secondary small mb-3">
          {producto.categoria}
        </Card.Text>
        <Card.Text className="item-desc">
          {producto.descripcion}
        </Card.Text>
        <div className="mt-auto">
          <Button 
            variant="primary" 
            onClick={() => alert('Producto agregado al carrito')}
            className="w-100"
          >
            Agregar al carrito
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
}

export default Item;
