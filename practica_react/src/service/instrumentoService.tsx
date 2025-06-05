// src/services/instrumentoService.ts
import type { Instrumento } from '../models/instrumento';

/**
 * Devuelve el valor de X-Usuario (nombre de usuario logueado) desde localStorage.
 * Si no hay usuario, retorna null.
 */
function getUsuarioHeader(): string | null {
  const stored = localStorage.getItem('usuario');
  if (!stored) return null;
  try {
    const usuarioObj = JSON.parse(stored) as { nombreUsuario: string; rol: string; id: number };
    return usuarioObj.nombreUsuario;
  } catch {
    return null;
  }
}

/**
 * Obtiene todas las cabeceras ya con X-Usuario (si existe).
 */
function buildHeaders(): Headers {
  const headers = new Headers({
    'Content-Type': 'application/json',
  });
  const usuario = getUsuarioHeader();
  if (usuario) {
    headers.append('X-Usuario', usuario);
  }
  return headers;
}

/**
 * Obtiene todos los instrumentos desde el back-end, incluyendo el header X-Usuario.
 * @returns Promise<Instrumento[]>
 */
export async function getInstrumentos(): Promise<Instrumento[]> {
  const headers = buildHeaders();
  const res = await fetch('http://localhost:8080/api/instrumentos', {
    method: 'GET',
    headers,
  });
  if (!res.ok) {
    throw new Error(`Error al cargar instrumentos: ${res.status}`);
  }
  return res.json();
}

/**
 * Obtiene un único instrumento por su ID.
 * @param id  Identificador del instrumento
 * @returns   Promise<Instrumento>
 */
export async function getInstrumentoById(id: string): Promise<Instrumento> {
  const headers = buildHeaders();
  const res = await fetch(`http://localhost:8080/api/instrumentos/${id}`, {
    method: 'GET',
    headers,
  });
  if (!res.ok) {
    throw new Error(`Error al cargar instrumento ${id}: ${res.status}`);
  }
  return res.json();
}

/**
 * Crea un nuevo instrumento (solo Admin). 
 * @param i  Instrumento sin id
 */
export async function createInstrumento(i: Omit<Instrumento, 'id'>): Promise<Instrumento> {
  const headers = buildHeaders();
  const res = await fetch('http://localhost:8080/api/instrumentos', {
    method: 'POST',
    headers,
    body: JSON.stringify(i),
  });
  if (!res.ok) {
    throw new Error(`Error al crear: ${res.status}`);
  }
  return res.json();
}

/**
 * Actualiza un instrumento existente (solo Admin).
 * @param id  ID del instrumento a actualizar
 * @param i   Datos parciales a actualizar
 */
export async function updateInstrumento(id: string, i: Partial<Instrumento>): Promise<Instrumento> {
  const headers = buildHeaders();
  const res = await fetch(`http://localhost:8080/api/instrumentos/${id}`, {
    method: 'PUT',
    headers,
    body: JSON.stringify(i),
  });
  if (!res.ok) {
    throw new Error(`Error al actualizar: ${res.status}`);
  }
  return res.json();
}

/**
 * Elimina un instrumento (solo Admin).
 * @param id  ID del instrumento a eliminar
 */
export async function deleteInstrumento(id: string): Promise<void> {
  const headers = buildHeaders();
  const res = await fetch(`http://localhost:8080/api/instrumentos/${id}`, {
    method: 'DELETE',
    headers
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar: ${res.status}`);
  }
}