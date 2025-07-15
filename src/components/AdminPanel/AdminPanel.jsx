// AdminPanel.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';
import './AdminPanel.css';

function AdminPanel() {
  const { products, loading, error, deleteProduct } = useAppContext();
  const navigate = useNavigate();

  const handleEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };
  
  const handleAdd = () => {
    navigate('/admin/product');
  };

  // 1. Creamos la nueva función para manejar el borrado
  const handleDelete = async (productId, productName) => {
    // 2. Usamos window.confirm para mostrar un diálogo de confirmación nativo del navegador.
    // Si el usuario presiona "Cancelar", la función se detiene aquí.
    const isConfirmed = window.confirm(`¿Estás seguro de que quieres eliminar el producto "${productName}"?`);

    if (!isConfirmed) {
      return;
    }

    // 3. Si el usuario confirma, usamos try/catch para manejar el resultado.
    try {
      // Llamamos a la función del contexto para que haga el trabajo con la API.
      await deleteProduct(productId);
      
      // 4. Si la línea anterior no lanzó un error, mostramos una alerta de éxito.
      window.alert('¡Producto eliminado con éxito!');

    } catch (err) {
      // 5. Si deleteProduct lanzó un error, lo capturamos y mostramos una alerta de error.
      console.error("Error al eliminar:", err);
      window.alert(`Error al eliminar el producto: ${err.message}`);
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <section className="admin-panel">
      <div className="admin-header">
        <h2>Panel de Administración</h2>
        <button onClick={handleAdd} className="add-product-btn">Agregar Nuevo Producto</button>
      </div>
      <p>Bienvenido. Aquí podrás gestionar los productos.</p>
      
      <div className="product-list">
        <table>
          <thead>
            <tr>
              <th>Imagen</th>
              <th>Título</th>
              <th>Precio</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product.id}>
                <td>
                  <img src={product.img || product.imagen} alt={product.titulo} className="product-image" />
                </td>
                <td>{product.titulo}</td>
                <td>${product.precio}</td>
                <td>
                  <button onClick={() => handleEdit(product.id)} className="edit-btn">Editar</button>
                  {/* 6. Actualizamos el botón para que llame a nuestra nueva función handleDelete */}
                  <button onClick={() => handleDelete(product.id, product.titulo)} className="delete-btn">Borrar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

export default AdminPanel;