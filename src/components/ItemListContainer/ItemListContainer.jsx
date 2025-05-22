import React, { useEffect, useState, useMemo } from 'react';
import Item from '../Item/Item';
import './ItemListContainer.css';
import { Container, Row, Col, Form, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const [limite, setLimite] = useState(12);
  const [orden, setOrden] = useState('');
  const [busqueda, setBusqueda] = useState('');
  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState('');

  useEffect(() => {
    setCargando(true);
    fetch('https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos')
      .then(res => res.json())
      .then(data => {
        setProductos(data);
        setCargando(false);
      })
      .catch(error => {
        console.error('Error al cargar productos:', error);
        setError('No se pudieron cargar los productos. Intente más tarde.');
        setCargando(false);
      });
  }, []);

  const categorias = useMemo(
    () => [...new Set(productos.map(p => p.categoria))],
    [productos]
  );

  const productosFiltrados = useMemo(() => {
    let filtrados = [...productos];

    if (busqueda.trim()) {
      filtrados = filtrados.filter(p =>
        p.titulo.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }

    switch (orden) {
      case 'nombre':
        filtrados.sort((a, b) => a.nombre.localeCompare(b.titulo));
        break;
      case 'categoria':
        filtrados.sort((a, b) => a.categoria.localeCompare(b.categoria));
        break;
      case 'precio':
        filtrados.sort((a, b) => a.precio - b.precio);
        break;
      default:
        break;
    }

    return filtrados;
  }, [productos, busqueda, categoriaSeleccionada, orden]);

  const mostrarMas = () => setLimite(prev => prev + 15);

  return (
    <Container fluid className="mt-4">
      <h2 className="item-list-title">Todos los productos</h2>

      
      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <div className="sidebar p-3 border rounded bg-light mb-4">
            <h5>Filtrar y ordenar</h5>

            <Form.Group className="mb-3">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre"
                value={busqueda}
                onChange={e => setBusqueda(e.target.value)}
                aria-label="Buscar productos por nombre"
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Ordenar por</Form.Label>
              <Form.Select
                value={orden}
                onChange={e => setOrden(e.target.value)}
                aria-label="Ordenar productos"
              >
                <option value="">Seleccionar</option>
                <option value="titulo">Nombre</option>
                <option value="categoria">Categoría</option>
                <option value="precio">Precio</option>
              </Form.Select>
            </Form.Group>

            <h6>Categorías</h6>
            <ListGroup>
              <ListGroup.Item
                action
                active={categoriaSeleccionada === ''}
                onClick={() => setCategoriaSeleccionada('')}
              >
                Todas
              </ListGroup.Item>
              {categorias.map(cat => (
                <ListGroup.Item
                  key={cat}
                  action
                  active={categoriaSeleccionada === cat}
                  onClick={() => setCategoriaSeleccionada(cat)}
                >
                  {cat}
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        </Col>

        {/* Productos */}
        <Col md={9}>

          {cargando ? (
            <div className="text-center">
              <Spinner animation="border" variant="primary" />
              <p>Cargando productos...</p>
            </div>
          ) : error ? (
            <Alert variant="danger">{error}</Alert>
          ) : productosFiltrados.length === 0 ? (
            <Alert variant="warning">No se encontraron productos.</Alert>
          ) : (
            <>
              <div className="item-grid">
                {productosFiltrados.slice(0, limite).map(producto => (
                  <Item key={producto.id} producto={producto} />
                ))}
              </div>
              {productosFiltrados.length > limite && (
                <div className="text-center mt-4">
                  <Button variant="outline-primary" onClick={mostrarMas}>
                    Ver más
                  </Button>
                </div>
              )}
            </>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default ItemListContainer;
