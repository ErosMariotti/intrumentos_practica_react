import React, { useEffect, useState } from 'react'
import type { Instrumento } from '../../models/instrumento';
import {
  getInstrumentos,
  deleteInstrumento,
} from '../../service/instrumentoService'
import { FaEdit, FaTrash } from 'react-icons/fa'
import '../../components/css/InstrumentosAVM.css'
import { FormularioProducto } from '../../components/tsx/FormularioProducto'


export const InstrumentosAVM: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showForm, setShowForm] = useState(false)
  const [editing, setEditing] = useState<Instrumento|undefined>(undefined)

  const handleEdit = (item: Instrumento) => {
    setEditing(item)
    setShowForm(true)
  }
  const handleAdd = () => {
    setEditing(undefined)
    setShowForm(true)
  }
  const onFormSuccess = () => {
    setShowForm(false)
    fetchData()
  }
  const onFormCancel = () => setShowForm(false)

  const fetchData = () => {
    setLoading(true)
    getInstrumentos()
      .then((data) => {
        setInstrumentos(data)
        setError(null)
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    fetchData()
  }, [])

  const handleDelete = async (id: string) => {
    if (!window.confirm('¿Confirma que desea eliminar este instrumento?')) return
    try {
      await deleteInstrumento(id)
      fetchData()
    } catch (err: any) {
      setError(err.message)
    }
  }

  if (loading) return <p className="avm-loading">Cargando…</p>
  if (error) return <p className="avm-error">Error: {error}</p>

  return (
  <>
    {/* 1) Botón para abrir el formulario en modo “Agregar” */}
    <button className="avm-btn-add" onClick={handleAdd}>
      + Agregar Producto
    </button>

    {/* 2) Tabla principal de AVM */}
    <table className="avm-table">
      <thead>
        <tr>
          <th>Instrumento</th>
          <th>Vendidos</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {instrumentos.map((item) => (
          <tr key={item.id}>
            <td>{item.instrumento}</td>
            <td>{item.cantidadVendida}</td>
            <td>${Number(item.precio).toLocaleString()}</td>
            <td className="avm-actions-cell">
              {/* Botón “Editar” */}
              <button
                className="avm-btn-edit"
                title="Editar"
                onClick={() => handleEdit(item)}
              >
                <FaEdit />
              </button>
              {/* Botón “Eliminar” */}
              <button
                className="avm-btn-delete"
                title="Eliminar"
                onClick={() => handleDelete(item.id)}
              >
                <FaTrash />
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* 3) Aquí montamos el formulario de Crear/Editar */}
    {showForm && (
      <FormularioProducto
        instrumento={editing}
        onCancel={onFormCancel}
        onSaved={onFormSuccess}
        />
    )}
  </>
)
}
