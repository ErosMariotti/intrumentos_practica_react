// src/components/AdminRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Usuario {
  id: number;
  nombreUsuario: string;
  rol: string;
}

export const AdminRoute: React.FC = () => {
  const stored = localStorage.getItem('usuario');
  if (!stored) return <Navigate to="/login" replace />;

  const usuario: Usuario = JSON.parse(stored);
  if (usuario.rol !== 'Admin') {
    // Si no es Admin, redirigimos a Home o a donde prefieras
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
