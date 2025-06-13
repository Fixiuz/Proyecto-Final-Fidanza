import React, { useEffect, useState, useMemo } from 'react';
import Item from '../Item/Item';
import './ItemListContainer.css';
import { Container, Row, Col, Form, ListGroup, Spinner, Alert, Button } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext'; // Modificación

function ItemListContainer() {
  // Modificación: Se eliminan los estados de productos, cargando y error.
  // const [productos, setProductos] = useState([]);
  // const [cargando, setCargando] = useState(true);
  // const [error, setError] = useState(null);

  const { products: productos, loading: cargando, error } = useAppContext(); // Modificación

  const [limite, setLimite] = useState(12);
  const [orden, setOrden] = useState('');
  const [busqueda, setBusqueda] = useState('');

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const categoriaFromUrl = queryParams.get('categoria');

  const [categoriaSeleccionada, setCategoriaSeleccionada] = useState(categoriaFromUrl || '');

  useEffect(() => {
    setCategoriaSeleccionada(categoriaFromUrl || '');
    setLimite(12);
  }, [categoriaFromUrl]);

  // Modificación: Se elimina el useEffect que hacía el fetch.
  // useEffect(() => {
  //   setCargando(true);
  //   fetch(...)
  //   ...
  // }, []);

  const categorias = useMemo(
    () => [...new Set(productos.map(p => p.categoria))].sort(),
    [productos] // Modificación: Ahora depende de los productos del contexto
  );

  const productosFiltrados = useMemo(() => {
    let filtrados = [...productos];

    if (busqueda.trim()) {
      filtrados = filtrados.filter(p =>
        p.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      );
    }

    if (categoriaSeleccionada) {
      filtrados = filtrados.filter(p => p.categoria === categoriaSeleccionada);
    }

    switch (orden) {
      case 'titulo':
        filtrados.sort((a, b) => a.titulo.localeCompare(b.titulo));
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
  }, [productos, busqueda, categoriaSeleccionada, orden]); // Modificación

  const mostrarMas = () => {
    setLimite(prev => prev + 12);
  };

  return (
    <Container fluid className="mt-4">
      
      <h2 className="item-list-title">
        {categoriaSeleccionada ? `Productos de ${categoriaSeleccionada}` : 'Novedades'}
      </h2>

      <Row>
        {/* Sidebar */}
        <Col md={3}>
          <div className="sidebar p-3 border rounded bg-light mb-4">
            <h5>Filtrar y ordenar</h5>

            <Form.Group className="mb-3">
              <Form.Label>Buscar</Form.Label>
              <Form.Control
                type="text"
                placeholder="Buscar por nombre o descripción"
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
                <option value="">Sin ordenar</option>
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
                  <Button onClick={mostrarMas}>Cargar más</Button> {/* Re-agregué el botón que parece faltar en tu código original */}
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