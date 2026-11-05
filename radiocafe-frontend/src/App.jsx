import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Home from './pages/Home';
import AdminDashboard from './pages/AdminDashboard';
import ClientCatalog from './pages/ClientCatalog';

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Ruta Pública: Landing Page e Inicio de Sesión */}
          <Route path="/" element={<Home />} />

          {/* Ruta Protegida: Acceso para Clientes y Administradores */}
          <Route 
            path="/catalogo" 
            element={
              <ProtectedRoute allowedRoles={['CLIENTE', 'ADMIN']}>
                <ClientCatalog />
              </ProtectedRoute>
            } 
          />

          {/* Ruta Protegida EXCLUSIVA: Bloquea clientes no autorizados */}
          <Route 
            path="/admin" 
            element={
              <ProtectedRoute allowedRoles={['ADMIN']}>
                <AdminDashboard />
              </ProtectedRoute>
            } 
          />

          {/* Redirección por defecto si escriben una ruta inexistente */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}