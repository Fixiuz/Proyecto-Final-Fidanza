import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';

import { FaInstagram, FaFacebook, FaWhatsapp, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import Swal from 'sweetalert2';
import './SeccionContacto.css';

function SeccionContacto() {
  const [formData, setFormData] = useState({ nombre: '', email: '', mensaje: '' });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Formulario enviado:', formData);

    Swal.fire({
      title: '¡Mensaje Enviado!',
      text: 'Gracias por contactarnos. Te responderemos a la brevedad.',
      icon: 'success',
      timer: 3000,
      showConfirmButton: false
    });
    
    setFormData({ nombre: '', email: '', mensaje: '' });
  };

  return (
    <section className="contacto-section-wrapper">
      <Container>
        <div className="contacto-header">
          <h2>Contacto</h2>
          <p>¿Tienes dudas o quieres hacer un pedido? Déjanos un mensaje y nos pondremos en contacto.</p>
        </div>

        <div className="contacto-bloque-unificado">
          
          
          <div className="formulario-panel">
            <h3>Envíanos un Mensaje</h3>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3" controlId="nombre">
                <Form.Label>Nombre</Form.Label> 
                <Form.Control type="text" name="nombre" placeholder="Tu nombre completo" value={formData.nombre} onChange={handleChange} required /> 
              </Form.Group>
              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control type="email" name="email" placeholder="tu@email.com" value={formData.email} onChange={handleChange} required />
              </Form.Group>
              <Form.Group className="mb-3" controlId="mensaje">
                <Form.Label>Mensaje</Form.Label>
                <Form.Control as="textarea" rows={5} name="mensaje" placeholder="Escribe tu consulta aquí..." value={formData.mensaje} onChange={handleChange} required /> 
              </Form.Group>
              <Button variant="primary" type="submit" className="w-100"> 
                Enviar Mensaje
              </Button>
            </Form>
          </div>

          
          <div className="mapa-panel">
            
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3272.269935439434!2d-57.954593!3d-34.900000!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95a2e63b1f204c0f%3A0x8cf76b6d54b4a34!2sPlaza%20Moreno!5e0!3m2!1ses!2sar!4v1628523363413!5m2!1ses!2sar"
              width="600"
              height="450"
              style={{ border:0 }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Mapa de Ubicación"
            ></iframe>
            
            <div className="info-adicional">
              <p><FaMapMarkerAlt /> Calle Falsa 123, La Plata, Buenos Aires</p>
              <p><FaEnvelope /> email@ejemplo.com</p>
            </div>
          </div>
        </div>

       
        <div className="redes-footer">
          <p>También puedes encontrarnos en:</p>
          <div className="social-icons-footer">
            <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
            <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
            <a href="https://wa.me/TUNUMERO" aria-label="WhatsApp"><FaWhatsapp /></a>
          </div>
        </div>
      </Container>
    </section>
  );
}

export default SeccionContacto;