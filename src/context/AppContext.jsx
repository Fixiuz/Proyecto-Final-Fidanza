import React, { createContext, useState, useContext, useEffect } from 'react';

import { useWindowSize } from '../hooks/useWindowSize';


const AppContext = createContext();


export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useAppContext debe ser usado dentro de un AppProvider');
  }
  return context;
};


export const AppProvider = ({ children }) => {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);

  
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  
  const [cart, setCart] = useState([]);

 
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  
  const { width } = useWindowSize();
  const isMobile = width < 768; 
  
  
  const API_URL = 'https://682ebe91746f8ca4a47e1ee6.mockapi.io/Productos';

  

  
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

  
  const login = (userData) => {
    setIsLoggedIn(true);
    setUser(userData);
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };
  
  
  const addProduct = async (productData) => {
    delete productData.id;
    console.log("Enviando estos datos a la API:", productData);
    try {
      const response = await fetch(API_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(productData),
      });
      if (!response.ok) {
        let errorDetails = 'No se pudieron leer los detalles del error del servidor.';
        try {
          const errorData = await response.json();
          errorDetails = JSON.stringify(errorData);
        } catch (e) {
          errorDetails = await response.text();
        }
        throw new Error(`Error del Servidor: ${response.status}. Detalles: ${errorDetails}`);
      }
      await fetchProducts();
    } catch (error) {
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
      await fetchProducts();
    } catch (err) {
      console.error(err);
      setError(err.message);
    }
  };

  const deleteProduct = async (productId) => {
    const response = await fetch(`${API_URL}/${productId}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error('No se pudo eliminar el producto del servidor.');
    }
    await fetchProducts();
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
    
    if (!isMobile) {
      setIsSidebarOpen(true);
    }
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
    isMobile,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};