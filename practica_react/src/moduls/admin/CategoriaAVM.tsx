// src/components/CategoriaAVM.tsx

import React, { useEffect, useState } from 'react';
import { GenericTable } from '../genericos/GenericTable';
import { GenericForm } from '../genericos/GenericForm';
import type{ FieldConfig } from '../genericos/GenericForm';
import { categoryTableConfig, categoryFormConfig } from '../config/categoryConfig';

import type { Categoria } from '../../models/categoria';
import { getCategorias, deleteCategoria, createCategoria, updateCategoria } from '../../service/categoriaService';

export const CategoriaAVM: React.FC = () => {
  const [categories, setCategories] = useState<Categoria[]>([]);
  const [loading, setLoading]       = useState<boolean>(true);
  const [showForm, setShowForm]     = useState<boolean>(false);
  const [editing, setEditing]       = useState<Categoria | null>(null);
  const [error, setError]           = useState<string | null>(null);

  // 1) Cargar categorías
  useEffect(() => {
    setLoading(true);
    getCategorias()
      .then((data) => {
        setCategories(data);
        setError(null);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  const fetchData = () => {
    setLoading(true);
    getCategorias()
      .then((data) => {
        setCategories(data);
        setError(null);
      })
      .catch((err: any) => setError(err.message))
      .finally(() => setLoading(false));
  };

  // 2) Nuevo
  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  // 3) Editar
  const handleEdit = (cat: Categoria) => {
    setEditing(cat);
    setShowForm(true);
  };

  // 4) Eliminar
  const handleDelete = async (cat: Categoria) => {
    if (!window.confirm('¿Confirma que desea eliminar esta categoría?')) return;
    setLoading(true);
    try {
      await deleteCategoria(cat.id);
      fetchData();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 5) Guardar (POST o PUT)
  const handleSave = async (values: Partial<Categoria>) => {
    setLoading(true);
    setError(null);
    try {
      if (editing) {
        await updateCategoria(editing.id, values as Categoria);
      } else {
        await createCategoria(values as Omit<Categoria, 'id'>);
      }
      setShowForm(false);
      setEditing(null);
      fetchData();
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  };

  // 6) initialValues para edición
  const initialValues: Partial<Categoria> = editing ? { ...editing } : {};

  if (loading) return <p className="avm-loading">Cargando…</p>;
  if (error) return <p className="avm-error">Error: {error}</p>;

  return (
    <div className="categoria-avm-container">
      <div style={{ marginBottom: '1rem', textAlign: 'right' }}>
        <button
          onClick={handleAdd}
          style={{
            background: '#17a2b8',
            color: '#fff',
            border: 'none',
            padding: '0.5rem 1rem',
            borderRadius: '4px',
            cursor: 'pointer',
          }}
        >
          + Agregar Categoría
        </button>
      </div>

      <GenericTable<Categoria>
        columns={categoryTableConfig.columns}
        data={categories}
        onEdit={handleEdit}
        onDelete={handleDelete}
        loading={loading}
      />

      <GenericForm<Categoria>
        fields={categoryFormConfig}
        initialValues={initialValues}
        open={showForm}
        onSave={handleSave}
        onCancel={() => {
          setShowForm(false);
          setEditing(null);
        }}
        loading={loading}
        title={editing ? 'Editar Categoría' : 'Nueva Categoría'}
      />
    </div>
  );
};
