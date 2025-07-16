

import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaWhatsapp } from 'react-icons/fa';
import './Footer.css';

const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };
function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <Row className="align-items-center">
          
          <Col md={4} className="footer-col-left">
            <h5 className="footer-logo"  onClick={handleScrollToTop}>
              TechLife
            </h5>
            <p className="copyright-text">© {new Date().getFullYear()} Todos los derechos reservados.</p>
          </Col>

          
          <Col md={4} className="footer-col-center">
            <h5>Navegación</h5>
            <ul className="footer-links">
              <li><Link to="/catalogo">Productos</Link></li>
              <li><Link to="/como-comprar">Cómo Comprar</Link></li>
              <li><Link to="/contact">Contacto</Link></li>
            </ul>
          </Col>

          
          <Col md={4} className="footer-col-right">
            <h5>Síguenos</h5>
            <div className="footer-social-icons">
              <a href="https://instagram.com" aria-label="Instagram"><FaInstagram /></a>
              <a href="https://facebook.com" aria-label="Facebook"><FaFacebook /></a>
              <a href="https://wa.me/TUNUMERO" aria-label="WhatsApp"><FaWhatsapp /></a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;