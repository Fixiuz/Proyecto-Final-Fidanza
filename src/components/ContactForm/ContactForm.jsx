// src/components/ContactForm/ContactForm.jsx
import React, { useState } from 'react';
import { Container, Row, Col, Form, Button, Alert } from 'react-bootstrap';
import './ContactForm.css'; 

function ContactForm() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    console.log('Formulario enviado');
    setEnviado(true);
    
    e.target.reset(); 
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <section className="contact-section" id="contacto"> 
      <Container>
        <Row className="justify-content-center">
          <Col md={8} lg={6}>
            <h2 className="contact-title">Contactanos</h2> 
            <p className="contact-description"> 
              ¿Tenés dudas o querés hacer un pedido? Completá el formulario y nos pondremos en contacto a la brevedad.
            </p>
            {enviado && <Alert variant="success" className="contact-alert">¡Mensaje enviado correctamente!</Alert>}
            <Form onSubmit={handleSubmit} className="contact-form"> 
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label className="form-label">Nombre</Form.Label> 
                <Form.Control type="text" placeholder="Tu nombre" required className="form-input" /> 
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label className="form-label">Email</Form.Label>
                <Form.Control type="email" placeholder="tu@email.com" required className="form-input" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mensaje">
                <Form.Label className="form-label">Mensaje</Form.Label>
                <Form.Control as="textarea" rows={4} placeholder="Escribe tu mensaje aquí..." required className="form-textarea" /> 
              </Form.Group>
              <div className="d-grid">
                <Button variant="secondary" type="submit" className="contact-button"> 
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