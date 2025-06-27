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

  // --- Efectos y Funciones ---

  // Efecto para cargar los productos desde la API al iniciar
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos');
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