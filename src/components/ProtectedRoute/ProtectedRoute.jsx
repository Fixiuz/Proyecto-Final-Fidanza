import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppContext } from '../../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLoggedIn } = useAppContext();
  const location = useLocation();

  if (!isLoggedIn) {
  
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  
  return children;
};

export default ProtectedRoute;