import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, allowedRoles }) {
  const { user } = useAuth();

  // 1. Si no hay usuario logueado, redirigir a la landing (Home)
  if (!user) {
    return <Navigate to="/" replace />;
  }

  // 2. Si el rol del usuario no está autorizado para esta ruta, bloquearlo
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // Si un cliente intenta entrar al Admin, lo mandamos a su catálogo
    return <Navigate to={user.role === 'ADMIN' ? '/admin' : '/catalogo'} replace />;
  }

  return children;
}