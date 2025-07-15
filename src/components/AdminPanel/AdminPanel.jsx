import React from 'react';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // Importamos SweetAlert2
import { useAppContext } from '../../context/AppContext';
import './AdminPanel.css';

function AdminPanel() {
  const { products, loading, error, deleteProduct } = useAppContext();
  const navigate = useNavigate();

  /**
   * Navega al formulario para editar un producto existente.
   * La alerta de éxito se mostrará desde el componente ProductForm.
   */
  const handleEdit = (id) => {
    navigate(`/admin/product/${id}`);
  };
  
  /**
   * Navega al formulario para agregar un nuevo producto.
   */
  const handleAdd = () => {
    navigate('/admin/product');
  };

  /**
   * Maneja el proceso de eliminación de un producto, incluyendo:
   * 1. Una ventana de confirmación con SweetAlert.
   * 2. La llamada a la API si el usuario confirma.
   * 3. Una alerta de éxito o error como resultado.
   */
  const handleDelete = async (productId, productName) => {
    // Usamos Swal.fire para una confirmación más elegante que window.confirm
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

    // Si el usuario hace clic en "Sí, ¡bórralo!"
    if (result.isConfirmed) {
      try {
        await deleteProduct(productId);
        
        // Mostramos una alerta de éxito con SweetAlert
        Swal.fire(
          '¡Eliminado!',
          'El producto ha sido eliminado con éxito.',
          'success'
        );

      } catch (err) {
        console.error("Error al eliminar:", err);
        
        // Mostramos una alerta de error con SweetAlert
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