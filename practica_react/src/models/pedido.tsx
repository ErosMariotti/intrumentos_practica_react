// src/models/pedido.ts

import type { Instrumento } from '../models/instrumento';

// Suponemos que ya tienes definida la interfaz Instrumento en otro lugar.
// import { Instrumento } from './instrumento';

// El detalle que envía el frontend (sin id ni referencia al pedido,
// solo cantidad e id de instrumento)
export interface NewPedidoDetalle {
  cantidad: number;
  instrumento: { id: number };
}

// El payload que envía el frontend para crear un pedido
export interface NewPedido {
  fechaPedido: string;       // e.g. "2023-07-10"
  totalPedido: number;
  detalles: NewPedidoDetalle[];
}

// La interfaz original "Pedido" con todos los campos que el backend
// devolverá (incluyendo id, fecha, total y los detalles completos)
export interface PedidoDetalle {
  id: number;
  cantidad: number;
  instrumento: Instrumento;
  pedido: { id: number };
}

export interface Pedido {
  id: number;
  fechaPedido: string;
  totalPedido: number;
  detalles: PedidoDetalle[];
}