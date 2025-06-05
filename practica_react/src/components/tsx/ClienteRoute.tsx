// src/components/ClienteRoute.tsx
import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';

interface Usuario {
  id: number;
  nombreUsuario: string;
  rol: string;
}

export const ClienteRoute: React.FC = () => {
  const stored = localStorage.getItem('usuario');
  if (!stored) return <Navigate to="/login" replace />;

  const usuario: Usuario = JSON.parse(stored);
  // Permitimos rol = 'Cliente' o también 'Admin' (si quieres que Admin vea todo)
  if (usuario.rol !== 'Cliente' && usuario.rol !== 'Admin') {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};
