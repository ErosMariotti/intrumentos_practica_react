// src/components/NavBar.tsx
import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import '../css/NavBar.css'; // Asegúrate de que la ruta sea correcta

export const NavBar: React.FC = () => {
  const stored = localStorage.getItem('usuario');
  const navigate = useNavigate();
  let usuario: { rol: string; nombreUsuario: string } | null = null;
  if (stored) {
    usuario = JSON.parse(stored);
  }

  const handleLogout = () => {
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <nav className="main-nav">
      <ul>
        {/* Siempre visibles */}
        <li><NavLink to="/" end>Home</NavLink></li>
        <li><NavLink to="/ubicacion">Dónde Estamos</NavLink></li>

        {usuario ? (
          <>
            {/* — Si es Cliente o Admin, mostrar Productos y Carrito — */}
            { (usuario.rol === 'Cliente' || usuario.rol === 'Admin') && (
              <>
                <li><NavLink to="/productos">Productos</NavLink></li>
                <li><NavLink to="/carrito">Carrito</NavLink></li>
              </>
            )}

            {/* — Si es Admin, mostrar AVM Productos y AVM Categorías — */}
            { usuario.rol === 'Admin' && (
              <>
                <li><NavLink to="/avm-producto">AVM Productos</NavLink></li>
                <li><NavLink to="/avm-categoria">AVM Categorías</NavLink></li>
              </>
            )}

            {/* Siempre que esté logueado: Cerrar Sesión */}
            <li>
              <button className="btn-logout" onClick={handleLogout}>
                Cerrar Sesión
              </button>
            </li>
          </>
        ) : (
          /* Si NO está logueado, solo verán Login */
          <li><NavLink to="/login">Login</NavLink></li>
        )}
      </ul>
    </nav>
  );
};
