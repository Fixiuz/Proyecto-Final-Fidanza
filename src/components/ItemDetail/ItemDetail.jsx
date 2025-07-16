import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { Container, Row, Col, Image, Button, Spinner, Alert } from 'react-bootstrap';
import './ItemDetail.css';
import { useAppContext } from '../../context/AppContext'; 
import { Helmet } from 'react-helmet-async';
function ItemDetail() {
  const { id } = useParams();
  const { products, loading, addToCart } = useAppContext(); 

  
  const producto = products.find(p => p.id === id);

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" variant="primary" />
        <p>Cargando detalle del producto...</p>
      </Container>
    );
  }

  if (!producto) {
    return (
      <Container className="text-center mt-5">
        <Alert variant="warning">
          <h4>Producto no encontrado</h4>
          <p>El producto que buscas no existe o fue removido.</p>
          <Link to="/catalogo">
            <Button variant="primary">Volver al Catálogo</Button>
          </Link>
        </Alert>
      </Container>
    );
  }

  return (
    <Container className="item-detail-container mt-5">
      <Helmet>
        <title>TechLife - Detalles del Producto</title>
        <meta name="description" content="Revisa los detalles del producto en TechLife." />
      </Helmet>
      <Row>
        <Col md={6}>
          <Image src={producto.img} alt={producto.titulo} fluid rounded />
        </Col>
        <Col md={6}>
          <div className="item-detail-info">
            <h2>{producto.titulo}</h2>
            <p className="item-detail-description">{producto.descripcion_larga}</p>
            <p className="item-detail-price">${producto.precio}</p>
            <p>Categoría: <Link to={`/catalogo?categoria=${producto.categoria}`}>{producto.categoria}</Link></p>
            <Button 
              variant="success" 
              className="mt-3" 
              onClick={() => addToCart(producto)} 
            >
              Añadir al carrito
            </Button>
          </div>
        </Col>
      </Row>
    </Container>
  );
}

export default ItemDetail;