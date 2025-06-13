import React, { createContext, useState, useContext, useEffect } from 'react'; // Modificación

const AppContext = createContext();

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};

export const AppProvider = ({ children }) => {
  // Estado para el Login
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  // Estado para el Carrito
  const [cart, setCart] = useState([]);
  
  // Modificación: Estados para productos y carga
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // Modificación: useEffect para cargar los productos desde la API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos');
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error al cargar los productos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []); // El array vacío asegura que esto se ejecute solo una vez

  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

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

  const clearCart = () => {
    setCart([]);
  };

  const updateItemQuantity = (productId, newQuantity) => {
    setCart(prevCart => {
      if (newQuantity <= 0) {
        // Si la nueva cantidad es 0 o menos, elimina el producto
        return prevCart.filter(item => item.id !== productId);
      }
      // Si no, actualiza la cantidad del producto correspondiente
      return prevCart.map(item =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      );
    });
  };

  const crearOrden = (datosComprador, onSuccess, onError) => {
    try {
      const total = cart.reduce((acc, item) => acc + item.precio * item.quantity, 0);
      const orden = {
        comprador: datosComprador,
        items: cart.map(item => ({
          id: item.id,
          titulo: item.titulo, // Aseguramos el nombre correcto
          precio: item.precio,
          quantity: item.quantity
        })),
        total: total.toFixed(2),
        fecha: new Date().toISOString()
      };
      
      const ordenId = `ORD-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      console.log("Orden creada (simulado):", ordenId, orden);

      // Limpiamos el carrito después de crear la orden
      clearCart();
      
      // Llamamos al callback de éxito
      onSuccess(ordenId, orden);

    } catch (error) {
      console.error("Error al crear la orden:", error);
      onError(error);
    }
  };


  const value = {
    isLoggedIn,
    user,
    login,
    logout,
    cart,
    addToCart,
    removeFromCart,
    clearCart,
    products, // Modificación
    loading,
    updateItemQuantity,
    crearOrden,
     // Modificación
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};