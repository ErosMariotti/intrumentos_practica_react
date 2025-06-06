import { BrowserRouter, Routes, Route } from 'react-router-dom'
import './App.css'
import { DetalleProducto } from './components/tsx/DetalleProducto';
import { Home } from './components/tsx/home';
import { Ubicacion } from './components/tsx/Ubicacion';
import { Productos } from './components/tsx/Productos';
import { NavBar } from './components/tsx/NavBar';

import { Carrito } from './components/tsx/Carrito';
import { Login } from './components/tsx/Login';

// Importar Route Guards
import { AdminRoute } from './components/tsx/AdminRoute';
import { ClienteRoute } from './components/tsx/ClienteRoute';
import { InstrumentosAVM } from './moduls/admin/InstrumentosAVM';
import { CategoriaAVM } from './moduls/admin/CategoriaAVM';


function App() {

  return (
     <BrowserRouter>
      <NavBar />

      <Routes>
        {/* Rutas públicas: cualquiera (logueado o no) */}
        <Route path="/" element={<Home />} />
        <Route path="/ubicacion" element={<Ubicacion />} />
        <Route path="/login" element={<Login />} />

        {/* Ruta de detalle de producto — accesible públicamente */}
        <Route path="/detalle/:id" element={<DetalleProducto />} />

        {/* Rutas protegidas para Cliente (incluye Admin también) */}
        <Route element={<ClienteRoute />}>
          <Route path="/productos" element={<Productos />} />

          <Route path="/carrito" element={<Carrito />} />
        </Route>

        {/* Rutas protegidas para Admin */}
        <Route element={<AdminRoute />}>
          <Route path="/avm-producto" element={<InstrumentosAVM />} />
          <Route path="/avm-categoria" element={<CategoriaAVM />} />
        </Route>

        {/* Cualquier otra ruta redirige a Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </BrowserRouter>
 )}


export default App

        
