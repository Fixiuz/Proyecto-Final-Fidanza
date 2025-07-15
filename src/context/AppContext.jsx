import React, { createContext, useState, useContext, useEffect } from 'react';

// 1. Creamos el contexto
const AppContext = createContext();

// 2. Creamos un hook personalizado para consumir el contexto fácilmente
export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

// 3. Creamos el componente Proveedor que envolverá la aplicación
export const AppProvider = ({ children }) => {
  // --- Estados del Contexto ---
  
  // Estado para el Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Estado para los Productos
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Estado para el Carrito
  const [cart, setCart] = useState([]);

  // Estado para el Carrito Lateral (Sidebar)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  // URL de la API
  const API_URL = 'https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos';

  // --- Efectos y Funciones ---

  // Efecto para cargar los productos desde la API al iniciar
  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_URL);
      if (!response.ok) {
        throw new Error(`Error HTTP: ${response.status}`);
      }
      const data = await response.json();
      setProducts(data);
    } catch (error) {
      console.error("Error al cargar los productos:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Funciones de Login
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };
  
  // Funciones CRUD para Productos
  const addProduct = async (productData) => {
    // IMPORTANTE: Al crear un producto NUEVO (POST), NUNCA debemos enviar un 'id'.
    // El servidor es quien debe generar el nuevo ID. Si por alguna razón el objeto
    // 'productData' tiene un 'id' (por ejemplo, de un estado anterior), lo eliminamos.
    delete productData.id;

    console.log("Enviando estos datos a la API:", productData); // Paso 1: Ver qué estamos enviando.

    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });

      if (!response.ok) {
        // Paso 2: Si hay un error, intentamos obtener los detalles del servidor.
        let errorDetails = 'No se pudieron leer los detalles del error del servidor.';
        try {
          // El servidor a menudo responde con un JSON que explica el error.
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (e) {
          // Si la respuesta de error no es JSON, la leemos como texto.
          errorDetails = await response.text();
        }
        
        // Lanzamos un error súper detallado que veremos en la consola.
        throw new Error(`Error del Servidor: ${response.status}. Detalles: ${errorDetails}`);
      }

      // Si todo sale bien, recargamos los productos.
      await fetchProducts();

    } catch (error) {
      // Re-lanzamos el error para que el formulario lo pueda atrapar y mostrar.
      console.error("Error final en addProduct:", error);
      throw error;
    }
  };

  const updateProduct = async (productId, productData) => {
    try {
      const response = await fetch(`${API_URL}/${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) throw new Error('Error al actualizar el producto');
      await fetchProducts(); // Recargar productos
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    // Esta función ya no necesita try/catch.
    // Su única responsabilidad es comunicarse con la API.
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });

    // Si la respuesta no es exitosa, lanza un error que será
    // capturado por la función que la llamó (en AdminPanel).
    if (!response.ok) {
      throw new Error('No se pudo eliminar el producto del servidor.');
    }

    // Si todo salió bien, actualiza la lista de productos.
    await fetchProducts();
  };

  // Funciones del Carrito
  const addToCart = (product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find(item => item.id === product.id);
      if (existingProduct) {
        return prevCart.map(item =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter(item => item.id !== productId));
  };

  const updateItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        return prevCart.filter(item => item.id !== productId);
      }
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };
  
  const clearCart = () => {
    setCart([]);
  };

  // Función para crear la orden de compra
  const crearOrden = (datosCheckout, onSuccess, onError) => {
    try {
      const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
      const orden = {
        comprador: {
          nombre: datosCheckout.nombreTitular,
          email: datosCheckout.email,
          telefono: datosCheckout.telefono,
        },
        pago: {
          metodo: 'Tarjeta de Crédito/Débito',
          numero: `**** **** **** ${datosCheckout.numeroTarjeta.slice(-4)}`
        },
        items: cart.map(item => ({
          id: item.id,
          titulo: item.titulo,
          precio: item.precio,
          quantity: item.quantity
        })),
        total: total.toFixed(2),
        fecha: new Date().toISOString()
      };
      
      const ordenId = `ORD-${Date.now()}`;
      console.log("Orden creada:", ordenId, orden);

      clearCart();
      onSuccess(ordenId, orden);

    } catch (error) {
      console.error("Error al crear la orden:", error);
      onError(error);
    }
  };

  // 4. Valor que se pasará a los componentes hijos
  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    products,
    loading,
    error,
    addProduct,
    updateProduct,
    deleteProduct,
    cart,
    addToCart,
    removeFromCart,
    updateItemQuantity,
    clearCart,
    crearOrden,
    isSidebarOpen,
    setIsSidebarOpen,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};