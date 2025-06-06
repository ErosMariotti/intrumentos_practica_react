// src/modules/genericos/GenericForm.tsx

import React, { useState, useEffect } from 'react';

export interface FieldConfig<T> {
  key: keyof T | string;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: any }[];
  required?: boolean;
}

interface GenericFormProps<T> {
  fields: FieldConfig<T>[];
  initialValues?: Partial<T>;
  open: boolean;
  onSave: (values: Partial<T>) => void;
  onCancel: () => void;
  loading?: boolean;
  title?: string;
}

export function GenericForm<T>({
  fields,
  initialValues = {},
  open,
  onSave,
  onCancel,
  loading = false,
  title = 'Formulario',
}: GenericFormProps<T>) {
  const [values, setValues] = useState<Partial<T>>(initialValues);

  // Cada vez que cambian initialValues u open, reseteamos el estado interno
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues, open]);

  if (!open) return null;

  return (
    <div
      className="gf-overlay"
      style={{
        position: 'fixed',
        inset: 0,
        background: 'rgba(0,0,0,0.3)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
      }}
      onClick={onCancel}
    >
      <div
        className="gf-modal"
        style={{
          background: '#fff',
          borderRadius: '8px',
          width: '90%',
          maxWidth: '600px',
          padding: '1.5rem',
          boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
        }}
        onClick={(e) => e.stopPropagation()}
      >
        <h2 style={{ marginBottom: '1rem', textAlign: 'center' }}>{title}</h2>
        <form
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '1rem',
          }}
          onSubmit={(e) => {
            e.preventDefault();
            onSave(values);
          }}
        >
          {fields.map((field) => (
            <div key={field.key as string} style={{ display: 'flex', flexDirection: 'column' }}>
              <label style={{ marginBottom: '0.5rem', fontWeight: 500 }}>
                {field.label}
              </label>

              {field.type === 'select' ? (
                <select
                  value={
                    values[field.key as keyof T] !== undefined
                      ? String(values[field.key as keyof T])
                      : ''
                  }
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [field.key]: e.target.value,
                    })
                  }
                  required={field.required}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.5rem',
                  }}
                >
                  <option value="">— Seleccione —</option>
                  {field.options?.map((opt) => (
                    <option key={String(opt.value)} value={opt.value}>
                      {opt.label}
                    </option>
                  ))}
                </select>
              ) : (
                <input
                  type={field.type}
                  value={
                    values[field.key as keyof T] !== undefined
                      ? String(values[field.key as keyof T])
                      : ''
                  }
                  onChange={(e) =>
                    setValues({
                      ...values,
                      [field.key]: e.target.value,
                    })
                  }
                  required={field.required}
                  style={{
                    border: '1px solid #ccc',
                    borderRadius: '4px',
                    padding: '0.5rem',
                  }}
                />
              )}
            </div>
          ))}

          <div
            style={{
              gridColumn: '1 / -1',
              display: 'flex',
              justifyContent: 'flex-end',
              gap: '1rem',
              marginTop: '1.5rem',
            }}
          >
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              style={{
                background: '#ccc',
                border: 'none',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading}
              style={{
                background: '#007bff',
                color: '#fff',
                border: 'none',
                padding: '0.5rem 1.25rem',
                borderRadius: '4px',
                cursor: loading ? 'not-allowed' : 'pointer',
              }}
            >
              {loading ? 'Guardando…' : 'Guardar'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
