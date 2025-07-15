import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
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

  // Estado de error local, exclusivo para este formulario.
  const [formError, setFormError] = useState(null);

  const isEditing = Boolean(id);

  useEffect(() => {
    // Limpia cualquier error previo si el ID cambia (al navegar entre editar y crear)
    setFormError(null);

    if (isEditing) {
      const productToEdit = products.find((p) => p.id === id);
      if (productToEdit) {
        // Combina el estado inicial con los datos del producto para evitar valores 'undefined'.
        setFormData({ ...initialState, ...productToEdit });
      }
    } else {
      // Resetea el formulario al estado inicial si estamos creando un producto nuevo.
      setFormData(initialState);
    }
  }, [id, products, isEditing]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // La función de submit ahora es asíncrona para usar await y try/catch.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormError(null); // Limpia errores anteriores antes de un nuevo intento.

    const productData = {
      ...formData,
      precio: parseFloat(formData.precio) || 0,
    };

    try {
      // Llama a la función correspondiente y espera a que termine.
      if (isEditing) {
        await updateProduct(id, productData);
      } else {
        await addProduct(productData);
      }
      // Si todo sale bien, navega al panel de administración.
      navigate('/adminPanel');
    } catch (error) {
      // Si ocurre un error en addProduct o updateProduct, se captura aquí.
      console.error("Error al enviar el formulario:", error);
      // El error se muestra localmente en el formulario.
      setFormError(error.message);
    }
  };

  return (
    <div className="product-form-container">
      <h2>{isEditing ? 'Editar Producto' : 'Agregar Producto'}</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label>Título</label>
          <input
            type="text"
            name="titulo"
            value={formData.titulo}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Descripción</label>
          <textarea
            name="descripcion"
            value={formData.descripcion}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Precio</label>
          <input
            type="number"
            name="precio"
            step="0.01"
            value={formData.precio}
            onChange={handleChange}
            placeholder="Ej: 299.99"
            required
          />
        </div>
        <div className="form-group">
          <label>URL de la Imagen</label>
          <input
            type="text"
            name="img"
            value={formData.img}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label>Categoría</label>
          <input
            type="text"
            name="categoria"
            value={formData.categoria}
            onChange={handleChange}
            required
          />
        </div>

        {/* Muestra el mensaje de error local si existe */}
        {formError && <p className="form-error-message">{formError}</p>}

        <button type="submit" className="submit-btn">
          {isEditing ? 'Actualizar Producto' : 'Agregar Producto'}
        </button>
      </form>
    </div>
  );
}

export default ProductForm;