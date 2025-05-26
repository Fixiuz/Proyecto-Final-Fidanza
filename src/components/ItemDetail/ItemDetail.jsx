
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import './ItemDetail.css';

function ItemDetail() {
  const { id } = useParams(); 
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    
    setCargando(true);
    setError(null); 

    fetch(`https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos/${id}`)
      .then(res => {
        if (!res.ok) {
          throw new Error('Producto no encontrado'); 
        }
        return res.json();
      })
      .then(data => {
        setProducto(data);
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar el detalle del producto:', err);
        setError('No se pudo cargar el detalle del producto. Intente más tarde.');
        setCargando(false);
      });
  }, [id]); 
  const handleAddToCart = () => {
    alert(`¡"${producto.titulo}" ha sido agregado al carrito!`);
    console.log(`Agregado al carrito: ${producto.titulo}`);
    
  };

  if (cargando) {
    return (
      <Container className="item-detail-container text-center">
        <Spinner animation="border" variant="primary" />
        <p>Cargando detalles del producto...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="item-detail-container text-center">
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="item-detail-container text-center">
        <Alert variant="warning">Producto no encontrado.</Alert>
      </Container>
    );
  }

  return (
    <Container className="item-detail-container my-5">
      <Row className="justify-content-center align-items-center">
        
        <Col md={6} className="text-center">
          <Image src={producto.img} alt={producto.titulo} fluid className="item-detail-img" />
        </Col>

        
        <Col md={6} className="item-detail-info p-4">
          <h1 className="item-detail-title">{producto.titulo}</h1>
          <p className="item-detail-category">Categoría: {producto.categoria}</p>
          <p className="item-detail-description">{producto.descripcion}</p>
          <p className="item-detail-price">${producto.precio}</p>

          <Button
            variant="primary"
            onClick={handleAddToCart}
            className="item-detail-add-to-cart-btn"
          >
            Agregar al carrito
          </Button>
          
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetail;