import React, { useEffect, useState, useRef } from 'react';
import { Container, Row, Col, Card, Spinner, Alert } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import './OfertasDestacadas.css';


const VISIBLE_ITEMS = 3; 
const PRELOAD_ITEMS = 5; 

function OfertasDestacadas() {
  const [productosGaming, setProductosGaming] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [currentIndex, setCurrentIndex] = useState(0); 
  const [transitionEnabled, setTransitionEnabled] = useState(true); 
  const sliderRef = useRef(null); 
  const itemWidthRef = useRef(0); 

  useEffect(() => {
    setCargando(true);
    fetch('https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos')
      .then(res => {
        if (!res.ok) {
          throw new Error('Error al cargar los productos de la API');
        }
        return res.json();
      })
      .then(data => {
        const gamingProducts = data.filter(p => p.categoria === 'Gaming');
        const shuffled = gamingProducts.sort(() => 0.5 - Math.random());

     
        const selectedProducts = shuffled.slice(0, PRELOAD_ITEMS);

        if (selectedProducts.length === 0) {
          setProductosGaming([]);
          setCargando(false);
          return;
        }

        
        const clonedProducts = [
          ...selectedProducts.slice(-VISIBLE_ITEMS), 
          ...selectedProducts,                       
          ...selectedProducts.slice(0, VISIBLE_ITEMS)  
        ];
        setProductosGaming(clonedProducts);
        
        setCurrentIndex(VISIBLE_ITEMS); 
        setCargando(false);
      })
      .catch(err => {
        console.error('Error al cargar productos Gaming:', err);
        setError('No se pudieron cargar las ofertas Gaming. Intente más tarde.');
        setCargando(false);
      });
  }, []);

  
  useEffect(() => {
    if (productosGaming.length > VISIBLE_ITEMS * 2) { 
      const interval = setInterval(() => {
        setCurrentIndex(prevIndex => prevIndex + 1);
      }, 3000); 
      return () => clearInterval(interval);
    }
  }, [productosGaming]);

  
  useEffect(() => {
    
    if (currentIndex >= productosGaming.length - VISIBLE_ITEMS) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(VISIBLE_ITEMS); 
      }, 800); 
    }
    
    else if (currentIndex < VISIBLE_ITEMS) {
      setTimeout(() => {
        setTransitionEnabled(false);
        setCurrentIndex(productosGaming.length - (VISIBLE_ITEMS * 2)); 
      }, 800); 
    } else {
      setTransitionEnabled(true); 
    }
  }, [currentIndex, productosGaming.length]);


  if (cargando) {
    return (
      <Container className="ofertas-container my-5">
        <h2 className="ofertas-title">🔥 Ofertas  🔥</h2>
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
          <p>Cargando ofertas destacadas...</p>
        </div>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="ofertas-container my-5">
        <h2 className="ofertas-title">🔥 Ofertas  🔥</h2>
        <Alert variant="danger">{error}</Alert>
      </Container>
    );
  }

  if (productosGaming.length <= VISIBLE_ITEMS) { 
    return (
      <Container className="ofertas-container my-5">
        <h2 className="ofertas-title">🔥 Ofertas  🔥</h2>
        <Row className="justify-content-center">
          {productosGaming.map((producto) => (
            <Col key={producto.id} xs={12} sm={6} md={12 / VISIBLE_ITEMS} className="mb-4">
              <Link to={`/item/${producto.id}`} className="oferta-card-link">
                <Card className="oferta-card h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={producto.img}
                    alt={producto.titulo}
                    className="oferta-img"
                  />
                  <Card.Body className="d-flex flex-column oferta-body">
                    <Card.Title className="oferta-title text-truncate" title={producto.titulo}>
                      {producto.titulo}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted oferta-price">
                      ${producto.precio}
                    </Card.Subtitle>
                    <Card.Text className="oferta-desc">
                      {producto.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
          ))}
          {productosGaming.length === 0 && (
            <Alert variant="info" className="w-100 text-center">
              No se encontraron productos Gaming en oferta.
            </Alert>
          )}
        </Row>
      </Container>
    );
  }

  return (
    <Container className="ofertas-container my-10">
      <h2 className="ofertas-title">🔥 Ofertas  🔥</h2>

      
      <div className="slider-wrapper">
        <div
          ref={sliderRef}
          className="slider-content"
          style={{
            transform: `translateX(-${currentIndex * (100 / VISIBLE_ITEMS)}%)`,
            transition: transitionEnabled ? 'transform 0.8s ease-in-out' : 'none',
          }}
        >
          {productosGaming.map((producto, index) => (
            
            <div key={`${producto.id}-${index}`} className="slider-item">
              <Link to={`/item/${producto.id}`} className="oferta-card-link">
                <Card className="oferta-card h-100 shadow-sm">
                  <Card.Img
                    variant="top"
                    src={producto.img}
                    alt={producto.titulo}
                    className="oferta-img"
                  />
                  <Card.Body className="d-flex flex-column oferta-body">
                    <Card.Title className="oferta-title text-truncate" title={producto.titulo}>
                      {producto.titulo}
                    </Card.Title>
                    <Card.Subtitle className="mb-2 text-muted oferta-price">
                      ${producto.precio}
                    </Card.Subtitle>
                    <Card.Text className="oferta-desc">
                      {producto.descripcion}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="text-center mt-3">
        {productosGaming.map((_, idx) => (
          <span
            key={idx}
            className={`slider-dot ${currentIndex === idx ? 'active' : ''}`}
            onClick={() => setCurrentIndex(idx)}
          ></span>
        ))}
      </div>
    </Container>
  );
}

export default OfertasDestacadas;