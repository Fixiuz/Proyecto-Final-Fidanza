import { Container, Row, Col } from 'react-bootstrap';
import './Footer.css';

function Footer() {
  return (
    <footer className="bg-dark text-white py-4 mt-5">
      <Container>
        <Row>
          <Col md={4}>
            <h5>MiTiendaTech</h5>
            <p>Los mejores productos de informática</p>
          </Col>
          <Col md={4}>
            <h5>Contacto</h5>
            <p>email@ejemplo.com</p>
          </Col>
          <Col md={4}>
            <h5>Redes Sociales</h5>
            {/* Aquí íconos */}
          </Col>
        </Row>
        <Row className="mt-3">
          <Col className="text-center">
            <p>© {new Date().getFullYear()} Todos los derechos reservados</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;