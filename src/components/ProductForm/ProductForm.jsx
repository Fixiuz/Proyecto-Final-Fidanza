import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2'; // 1. Faltaba importar SweetAlert2
import { useAppContext } from '../../context/AppContext';
import './ProductForm.css';

// Define el estado inicial fuera del componente para reutilizarlo y resetear el form.
const initialState = {
  titulo: '',
  descripcion: '',
  precio: '',
  img: '',
  categoria: '',
};

function ProductForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { products, addProduct, updateProduct } = useAppContext();
  const [formData, setFormData] = useState(initialState);
  const isEditing = Boolean(id);

  useEffect(() => {
    if (isEditing) {
      const productToEdit = products.find((p) => p.id === id);
      if (productToEdit) {
        setFormData({ ...initialState, ...productToEdit });
      }
    } else {
      setFormData(initialState);
    }
  }, [id, products, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio) || 0,
    };

    try {
      const successMessage = isEditing ? 'Producto actualizado con éxito' : 'Producto agregado con éxito';
      
      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }
      
      // 2. Muestra la alerta de éxito al completar la operación
      await Swal.fire({
        title: '¡Éxito!',
        text: successMessage,
        icon: 'success',
        timer: 2000,
        showConfirmButton: false
      });
      
      navigate('/adminPanel');

    } catch (error) {
      console.error("Error al enviar el formulario:", error);
      
      // 3. Muestra la alerta de error si la operación falla
      Swal.fire({
        title: 'Error',
        text: `No se pudo guardar el producto: ${error.message}`,
        icon: 'error',
      });
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Título</label>
          <input type="text" name="titulo" value={formData.titulo} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea name="descripcion" value={formData.descripcion} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input type="number" name="precio" step="0.01" value={formData.precio} onChange={handleChange} placeholder="Ej: 299.99" required />
        </div>
        <div className="form-group">
          <label>URL de la Imagen</label>
          <input type="text" name="img" value={formData.img} onChange={handleChange} required />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input type="text" name="categoria" value={formData.categoria} onChange={handleChange} required />
        </div>
        <button type="submit" className="submit-btn">
          {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;