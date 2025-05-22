import React from 'react';
import { Navbar, Nav, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { BsCart3 } from 'react-icons/bs';

function NavBar() {
  return (
    <Navbar bg="light" expand="lg" className="shadow-sm">
      <Container fluid className="px-4">
        {/* Logo a la izquierda */}
        <Navbar.Brand as={Link} to="/" className="fw-bold text-primary">
          MiLogo
        </Navbar.Brand>

        {/* Botón hamburguesa */}
        <Navbar.Toggle aria-controls="navbar-nav" />

        {/* Menú colapsable */}
        <Navbar.Collapse id="navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link as={Link} to="/about">Quiénes Somos</Nav.Link>
            <Nav.Link as={Link} to="/contact">Contactanos</Nav.Link>
            <Nav.Link as={Link} to="/catalogo">Catálogo</Nav.Link>
            <Nav.Link as={Link} to="/carrito">
              <BsCart3 size={22} />
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavBar;
