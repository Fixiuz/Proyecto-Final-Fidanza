import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';

function ContactForm() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setEnviado(true);
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <section className="py-5 bg-white" id="contacto">
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="mb-4 text-center text-primary">Contacto</h2>
            <p className="text-center mb-4">
              ¿Tenés dudas o querés hacer un pedido? Completá el formulario y nos pondremos en contacto a la brevedad.
            </p>
            {enviado && <Alert variant="success">¡Mensaje enviado correctamente!</Alert>}
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label>
                <Form.Control type="text" placeholder="Tu nombre" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" placeholder="tu@email.com" required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí..." required />
              </Form.Group>
              <div className="d-grid">
                <Button variant="primary" type="submit">
                  Enviar mensaje
                </Button>
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </section>
  );
}

export default ContactForm;