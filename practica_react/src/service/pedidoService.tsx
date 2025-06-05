// src/service/pedidoService.tsx

import type { Pedido, NewPedido } from '../models/pedido';

/**
 * Devuelve todos los pedidos (con su detalle completo).
 */
export async function getPedidos(): Promise<Pedido[]> {
  const res = await fetch('http://localhost:8080/api/pedidos');
  if (!res.ok) {
    throw new Error(`Error al cargar pedidos: ${res.status}`);
  }
  return res.json();
}

/**
 * Crea un nuevo pedido. Recibe un NewPedido (sin id en cabecera ni en detalles).
 * Devuelve el Pedido completo que genera el backend.
 */
export async function createPedido(payload: NewPedido): Promise<Pedido> {
  const res = await fetch('http://localhost:8080/api/pedidos', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Error al crear pedido: ${res.status}`);
  }
  return res.json();
}

/**
 * Borra un pedido por su ID.
 */
export async function deletePedido(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/api/pedidos/${id}`, {
    method: 'DELETE'
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar pedido (ID ${id}): ${res.status}`);
  }
}
