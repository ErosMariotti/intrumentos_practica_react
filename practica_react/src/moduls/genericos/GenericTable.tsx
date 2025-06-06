// src/modules/genericos/GenericTable.tsx

import React from 'react';

export interface Column<T> {
  key: keyof T | string;
  label: string;
  render?: (row: T) => React.ReactNode;
}

interface GenericTableProps<T> {
  columns: Column<T>[];
  data: T[];
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void;
  loading?: boolean;
}

export function GenericTable<T extends { id: number | string }>({
  columns,
  data,
  onEdit,
  onDelete,
  loading = false,
}: GenericTableProps<T>) {
  return (
    <div className="generic-table-container" style={{ overflowX: 'auto' }}>
      <table className="generic-table" style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            {columns.map((col) => (
              <th
                key={col.key as string}
                style={{
                  borderBottom: '1px solid #ccc',
                  textAlign: 'left',
                  padding: '0.5rem 1rem',
                  background: '#f5f5f5',
                }}
              >
                {col.label}
              </th>
            ))}
            <th
              style={{
                borderBottom: '1px solid #ccc',
                textAlign: 'left',
                padding: '0.5rem 1rem',
                background: '#f5f5f5',
                minWidth: '120px',
              }}
            >
              Acciones
            </th>
          </tr>
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length + 1} style={{ textAlign: 'center', padding: '1rem' }}>
                Cargando…
              </td>
            </tr>
          ) : (
            data.map((row) => (
              <tr key={row.id as React.Key} style={{ borderBottom: '1px solid #eee' }}>
                {columns.map((col) => (
                  <td key={col.key as string} style={{ padding: '0.5rem 1rem' }}>
                    {col.render ? col.render(row) : String((row as any)[col.key as string])}
                  </td>
                ))}
                <td style={{ padding: '0.5rem 1rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    {onEdit && (
                      <button
                        onClick={() => onEdit(row)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          color: '#007bff',
                        }}
                        title="Editar"
                      >
                        ✏️
                      </button>
                    )}
                    {onDelete && (
                      <button
                        onClick={() => onDelete(row)}
                        style={{
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          padding: '0.25rem',
                          color: '#c82333',
                        }}
                        title="Eliminar"
                      >
                        🗑️
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
