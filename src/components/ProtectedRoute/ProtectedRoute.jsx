import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// Modificación: Ruta corregida para encontrar el contexto
import { useAppContext } from '../../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  if (!isLoggedIn) {
    // Si no está logueado, lo redirigimos a /login, guardando la ruta
    // desde la que intentaba acceder para poder volver después.
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Si está logueado, simplemente mostramos el componente que corresponde (ej. CheckoutForm)
  return children;
};

export default ProtectedRoute;