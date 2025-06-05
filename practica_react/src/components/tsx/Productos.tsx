// src/components/Productos.tsx
import React from 'react';
import { CardProducto } from './CardProducto';
import '../css/Productos.css'; // Asegúrate de que la ruta sea correcta

export const Productos: React.FC = () => (
  <div className="productos-container">
    <h2>Catálogo de Instrumentos</h2>
    <CardProducto />
  </div>
);
