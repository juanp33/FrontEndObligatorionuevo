// PrivateRoute.js
import React from 'react';
import { Navigate } from 'react-router-dom';

function PrivateRoute({ children }) {
  const username = localStorage.getItem('username');

  // Si el username no está en localStorage, redirige al login
  if (!username) {
    return <Navigate to="/login" />;
  }

  // Si el username existe, renderiza el componente hijo
  return children;
}

export default PrivateRoute;