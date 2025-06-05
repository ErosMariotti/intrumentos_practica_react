import type { Categoria } from '../models/categoria';

/**
 * Devuelve todas las categorías disponibles.
 */
export async function getCategorias(): Promise<Categoria[]> {
  const res = await fetch('http://localhost:8080/api/categorias')
  if (!res.ok) {
    throw new Error(`Error al cargar categorías: ${res.status}`)
  }
  return res.json()
}

/**
 * Crea una nueva categoría.
 * El objeto que recibe NO debe incluir campo `id`.
 */
export async function createCategoria(payload: Omit<Categoria, 'id'>): Promise<Categoria> {
  const res = await fetch('http://localhost:8080/api/categorias', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Error al crear categoría: ${res.status}`);
  }
  return res.json();
}

/**
 * Actualiza una categoría existente por su ID.
 * Envía únicamente `{ denominacion: string }` como payload.
 */
export async function updateCategoria(
  id: number,
  payload: Omit<Categoria, 'id'>
): Promise<Categoria> {
  const res = await fetch(`http://localhost:8080/api/categorias/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  });
  if (!res.ok) {
    throw new Error(`Error al actualizar categoría (ID ${id}): ${res.status}`);
  }
  return res.json();
}

/**
 * Elimina una categoría por su ID.
 */
export async function deleteCategoria(id: number): Promise<void> {
  const res = await fetch(`http://localhost:8080/api/categorias/${id}`, {
    method: 'DELETE',
  });
  if (!res.ok) {
    throw new Error(`Error al eliminar categoría (ID ${id}): ${res.status}`);
  }
}