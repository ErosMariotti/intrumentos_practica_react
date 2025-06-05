// src/components/Carrito.tsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Instrumento } from '../../models/instrumento';
import { createPedido } from '../../service/pedidoService';
import type { NewPedido, NewPedidoDetalle } from '../../models/pedido';
import '../css/Carrito.css';

interface CartItem {
  instrumento: Instrumento;
  cantidad: number;
}

export const Carrito: React.FC = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const navigate = useNavigate();

  useEffect(() => {
    const stored = localStorage.getItem('cartItems');
    if (stored) {
      setCart(JSON.parse(stored));
    }
  }, []);

  const handleEliminar = (id: number) => {
    const nuevoCart = cart.filter(item => Number(item.instrumento.id) !== id);
    setCart(nuevoCart);
    localStorage.setItem('cartItems', JSON.stringify(nuevoCart));
  };

  const handleVaciar = () => {
    setCart([]);
    localStorage.removeItem('cartItems');
  };

  const subtotal = cart.reduce((acc, item) => {
    const precioNum = Number(item.instrumento.precio);
    return acc + precioNum * item.cantidad;
  }, 0);

  /*const handleFinalizarCompra = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    try {
      // 1) Generar fechaPedido en formato YYYY-MM-DD
      const hoy = new Date();
      const yyyy = hoy.getFullYear();
      const mm = String(hoy.getMonth() + 1).padStart(2, '0');
      const dd = String(hoy.getDate()).padStart(2, '0');
      const fechaPedido = `${yyyy}-${mm}-${dd}`;

      // 2) Construir detalles como NewPedidoDetalle[]
      const detallesPayload: NewPedidoDetalle[] = cart.map(item => ({
        cantidad: item.cantidad,
        instrumento: { id: Number(item.instrumento.id) }
      }));

      // 3) Construir el objeto NewPedido
      const pedidoPayload: NewPedido = {
        fechaPedido,
        totalPedido: subtotal,
        detalles: detallesPayload
      };

      // 4) Llamar a createPedido (ahora acepta NewPedido)
      const nuevoPedido = await createPedido(pedidoPayload);

      alert(`Compra realizada! Pedido ID: ${nuevoPedido.id}`);

      // 5) Limpiar carrito
      setCart([]);
      localStorage.removeItem('cartItems');

      // 6) Redirigir, por ejemplo al Home
      navigate('/');
    } catch (err: any) {
      console.error('Error al finalizar compra:', err);
      alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
    }
  }; */

    const handleFinalizarCompra = async () => {
    if (cart.length === 0) {
      alert('El carrito está vacío.');
      return;
    }

    try {
      // 1) Generar fechaPedido en formato YYYY-MM-DD
      const hoy = new Date();
      const yyyy = hoy.getFullYear();
      const mm = String(hoy.getMonth() + 1).padStart(2, '0');
      const dd = String(hoy.getDate()).padStart(2, '0');
      const fechaPedido = `${yyyy}-${mm}-${dd}`;

      // 2) Construir detalles como NewPedidoDetalle[],
      //    convirtiendo instrumento.id a number con Number(...)
      const detallesPayload: NewPedidoDetalle[] = cart.map(item => ({
        cantidad: item.cantidad,
        instrumento: { id: Number(item.instrumento.id) }
      }));

      // 3) Crear el objeto NewPedido
      const pedidoPayload: NewPedido = {
        fechaPedido,
        totalPedido: subtotal,
        detalles: detallesPayload
      };

      console.log('Payload a enviar:', JSON.stringify(pedidoPayload, null, 2));

      // 4) Llamar al servicio para crear el pedido
      const nuevoPedido = await createPedido(pedidoPayload);

      alert(`Compra realizada! Pedido ID: ${nuevoPedido.id}`);

      // 5) Limpiar carrito
      setCart([]);
      localStorage.removeItem('cartItems');

      // 6) Redirigir a Home (o a donde prefieras)
      navigate('/');
    } catch (err: any) {
      console.error('Error al finalizar compra:', err);
      alert('Hubo un error al procesar tu compra. Intenta nuevamente.');
    }
  };



  return (
    <div className="carrito-container">
      <h2>Mi Carrito</h2>

      {cart.length === 0 ? (
        <p className="carrito-empty">El carrito está vacío.</p>
      ) : (
        <>
          <table className="carrito-table">
            <thead>
              <tr>
                <th>Producto</th>
                <th>Cantidad</th>
                <th>Precio Unitario</th>
                <th>Subtotal</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => {
                const precioNum = Number(item.instrumento.precio);
                return (
                  <tr key={item.instrumento.id}>
                    <td>{item.instrumento.instrumento}</td>
                    <td>{item.cantidad}</td>
                    <td>${precioNum.toLocaleString()}</td>
                    <td>${(precioNum * item.cantidad).toLocaleString()}</td>
                    <td className="carrito-actions-cell">
                      <button
                        className="btn-eliminar"
                        onClick={() => handleEliminar(Number(item.instrumento.id))}
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="carrito-summary">
            <p>
              <strong>Total:</strong> ${subtotal.toLocaleString()}
            </p>
            <div>
              <button className="btn-vaciar" onClick={handleVaciar}>
                Vaciar carrito
              </button>
              <button className="btn-finalizar" onClick={handleFinalizarCompra}>
                Finalizar Compra
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
