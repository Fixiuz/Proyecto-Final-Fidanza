import React, { useEffect, useState } from 'react';
import Item from '../Item/Item';
import './ItemListContainer.css';

function ItemListContainer() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [limite, setLimite] = useState(15); // 3 filas x 5 columnas

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
        setCargando(false);
      });
  }, []);

  const mostrarMas = () => setLimite(limite + 15);

  return (
    <div className="item-list-container">
      <h2 className="item-list-title">Todos los productos</h2>
      {cargando ? (
        <p className="item-list-loading">Cargando productos...</p>
      ) : (
        <>
          <div className="item-grid">
            {productos.slice(0, limite).map(producto => (
              <Item key={producto.id} producto={producto} />
            ))}
          </div>
          {productos.length > limite && (
            <div style={{ textAlign: 'center', marginTop: '2rem' }}>
              <button className="item-btn" onClick={mostrarMas}>
                Ver más
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default ItemListContainer;
