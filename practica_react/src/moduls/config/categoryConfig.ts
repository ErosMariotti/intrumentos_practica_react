// src/modules/config/categoryConfig.ts

import type { Categoria } from '../../models/categoria';

export interface CategoryTableColumn {
  key: keyof Categoria;
  label: string;
  render?: (row: Categoria) => React.ReactNode;
}

export const categoryTableConfig: { columns: CategoryTableColumn[] } = {
  columns: [
    { key: 'id', label: 'ID' },
    { key: 'denominacion', label: 'Denominación' },
  ],
};

export interface CategoryFormField {
  key: keyof Categoria;
  label: string;
  type: 'text' | 'number' | 'select';
  options?: { label: string; value: Categoria['id'] }[];
  required?: boolean;
}

export const categoryFormConfig: CategoryFormField[] = [
  { key: 'denominacion', label: 'Denominación', type: 'text', required: true },
];
