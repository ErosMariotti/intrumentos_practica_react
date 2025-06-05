// src/components/CategoriaAVM.tsx
import React, { useEffect, useState } from 'react';
import {  getCategorias, deleteCategoria } from '../../service/categoriaService';
import type { Categoria } from '../../models/categoria';
import { FormularioCategoria } from './FormularioCategoria';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../css/CategoriaAVM.css';

export const CategoriaAVM: React.FC = () => {
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState<boolean>(false);
  const [editing, setEditing] = useState<Categoria | undefined>(undefined);

  const fetchData = () => {
    setLoading(true);
    getCategorias()
      .then((data) => {
        setCategorias(data);
        setError(null);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditing(undefined);
    setShowForm(true);
  };

  const handleEdit = (cat: Categoria) => {
    setEditing(cat);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!window.confirm('¿Confirma que desea eliminar esta categoría?')) return;
    try {
      await deleteCategoria(id);
      fetchData();
    } catch (err: any) {
      setError(err.message);
    }
  };

  const onFormSuccess = () => {
    setShowForm(false);
    fetchData();
  };

  const onFormCancel = () => setShowForm(false);

  if (loading) return <p className="avm-loading">Cargando…</p>;
  if (error) return <p className="avm-error">Error: {error}</p>;

  return (
    <div className="avm-container">
      {/* 1) Botón para agregar nueva categoría */}
      <button className="avm-btn-add" onClick={handleAdd}>
        + Agregar Categoría
      </button>

      {/* 2) Tabla de categorías */}
      <table className="avm-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Denominación</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {categorias.map((cat) => (
            <tr key={cat.id}>
              <td>{cat.id}</td>
              <td>{cat.denominacion}</td>
              <td className="avm-actions-cell">
                <button
                  className="avm-btn-edit"
                  title="Editar"
                  onClick={() => handleEdit(cat)}
                >
                  <FaEdit />
                </button>
                <button
                  className="avm-btn-delete"
                  title="Eliminar"
                  onClick={() => handleDelete(cat.id)}
                >
                  <FaTrash />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 3) Si showForm=true, mostramos el modal con FormularioCategoria */}
      {showForm && (
        <FormularioCategoria
          categoria={editing}
          onCancel={onFormCancel}
          onSaved={onFormSuccess}
        />
      )}
    </div>
  );
};
