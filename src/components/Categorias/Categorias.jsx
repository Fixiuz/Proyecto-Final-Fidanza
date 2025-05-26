import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom'; 
import './Categorias.css';


const categoriasData = [
  {
    nombre: 'Gaming',
    imagen: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748213728/Catgaming2_jz94in.jpg', 
    link: '/catalogo?categoria=Gaming', 
  },
  {
    nombre: 'Notebooks',
    imagen: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748213621/CatNotebook_kcjbuf.jpg',
    link: '/catalogo?categoria=Notebooks',
  },
  {
    nombre: 'Consolas',
    imagen: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748213619/CatConsoles2_ev4fpm.jpg',
    link: '/catalogo?categoria=Consolas',
  },
  {
    nombre: 'Audio',
    imagen: 'https://res.cloudinary.com/dwjqk2hcf/image/upload/v1748213620/CatAudio_oiyuan.jpg',
    link: '/catalogo?categoria=Audio',
  },
];

function Categorias() {
  return (
    <Container className="categorias-container my-5">
      
      <Row className="justify-content-center">
        {categoriasData.map((categoria, index) => (
          <Col key={index} xs={6} sm={4} md={3} lg={2} className="mb-4">
            <Link to={categoria.link} className="categoria-card-link">
              <Card className="categoria-card">
                <Card.Img
                  variant="top"
                  src={categoria.imagen}
                  alt={categoria.nombre}
                  className="categoria-img"
                />
                <Card.Body className="categoria-body">
                  <Card.Title className="categoria-title">{categoria.nombre}</Card.Title>
                </Card.Body>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Categorias;