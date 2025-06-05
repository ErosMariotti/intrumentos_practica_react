// src/components/FormularioCategoria.tsx
import React, { useState, useEffect } from 'react';
import { createCategoria, updateCategoria } from '../../service/categoriaService';
import type { Categoria } from '../../models/categoria';
import '../css/FormularioCategoria.css';

interface Props {
  categoria?: Categoria;   // si viene, es edición; si no, es alta
  onSaved: () => void;     // callback para recargar la lista
  onCancel: () => void;    // callback para cerrar el modal sin guardar
}

export const FormularioCategoria: React.FC<Props> = ({
  categoria,
  onSaved,
  onCancel,
}) => {
  const [denominacion, setDenominacion] = useState<string>(categoria?.denominacion ?? '');
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState<boolean>(false);

  // Si category cambia (cuando abrimos en modo “editar”), precargamos el estado
  useEffect(() => {
    if (categoria) {
      setDenominacion(categoria.denominacion);
    }
  }, [categoria]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    setError(null);

    try {
      const payload = { denominacion: denominacion.trim() };
      if (!payload.denominacion) {
        setError('La denominación es obligatoria.');
        setSaving(false);
        return;
      }

      if (categoria) {
        // modo edición
        await updateCategoria(categoria.id, payload);
      } else {
        // modo creación
        await createCategoria(payload);
      }
      onSaved();
    } catch (err: any) {
      setError(err.message || 'Error desconocido al guardar.');
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fp-overlay" onClick={onCancel}>
      <div className="fp-modal" onClick={(e) => e.stopPropagation()}>
        <form className="fp-form" onSubmit={handleSubmit}>
          <h2>{categoria ? 'Editar Categoría' : 'Nueva Categoría'}</h2>

          {error && <div className="form-error">Error: {error}</div>}

          <label>
            Denominación
            <input
              type="text"
              name="denominacion"
              value={denominacion}
              onChange={(e) => setDenominacion(e.target.value)}
              required
              maxLength={128}
            />
          </label>

          <div className="fp-actions">
            <button
              type="button"
              onClick={onCancel}
              disabled={saving}
            >
              Cancelar
            </button>
            <button type="submit" disabled={saving}>
              {saving ? 'Guardando…' : categoria ? 'Actualizar' : 'Agregar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
