import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; 
import { useAppContext } from '../../context/AppContext';
import './AdminPanel.css';
import { Helmet } from 'react-helmet-async';

function AdminPanel() {
  const { products, loading, error, deleteProduct } = useAppContext();
  const navigate = useNavigate();

 
  const handleEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };
  
  
  const handleAdd = () => {
    navigate('/admin/product');
  };

  
  const handleDelete = async (productId, productName) => {
    
    const result = await Swal.fire({
      title: '¿Estás seguro?',
      text: `No podrás revertir la eliminación de "${productName}".`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡bórralo!',
      cancelButtonText: 'Cancelar'
    });

    
    if (result.isConfirmed) {
      try {
        await deleteProduct(productId);
        
        
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado con éxito.',
          'success'
        );

      } catch (err) {
        console.error("Error al eliminar:", err);
        
        
        Swal.fire(
          'Error',
          `Hubo un problema al eliminar el producto: ${err.message}`,
          'error'
        );
      }
    }
  };

  if (loading) return <p>Cargando productos...</p>;
  if (error) return <p>Error al cargar productos: {error}</p>;

  return (
    <section className="admin-panel">
      <Helmet>
        <title>TechLife - Panel de Administración</title>
        <meta name="description" content="Gestiona los productos de tu tienda en TechLife." />
      </Helmet>
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