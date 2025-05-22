import React from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';

function Hero() {
  return (
    <section className="bg-light py-5">
      <Container>
        <Row className="align-items-center">
          <Col md={7}>
            <h1 className="mb-4 text-primary fw-bold">¡Bienvenido a MiTiendaTech!</h1>
            <p className="lead">
              Somos una <strong>distribuidora líder de insumos informáticos</strong> con años de experiencia en el rubro. 
              Ofrecemos una amplia variedad de productos de alta calidad: monitores, notebooks, componentes, periféricos y mucho más.
              <br /><br />
              Nos destacamos por nuestro compromiso con la innovación, la atención personalizada y la satisfacción de nuestros clientes. 
              Trabajamos con las mejores marcas del mercado y brindamos asesoramiento profesional para que encuentres la solución ideal para tu empresa, oficina o uso personal.
              <br /><br />
              ¡Confía en nosotros para potenciar tu mundo digital!
            </p>
            
          </Col>
          <Col md={5} className="d-none d-md-block">
            <img 
              src="https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=600&q=80"
              alt="Distribuidora de insumos informáticos"
              className="img-fluid rounded shadow"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default Hero;