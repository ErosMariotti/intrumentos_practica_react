import React, { useState, useEffect } from 'react'
import type { Instrumento } from '../../models/instrumento';
import { createInstrumento, updateInstrumento } from '../../service/instrumentoService'
import { getCategorias } from '../../service/categoriaService'
import type { Categoria } from '../../models/categoria';
import '../css/FormularioProducto.css'

interface Props {
  instrumento?: Instrumento  // si viene, es edición; si no, es alta
  onSaved: () => void        // callback para volver a recargar lista
  onCancel: () => void
}

export const FormularioProducto: React.FC<Props> = ({
  instrumento,
  onSaved,
  onCancel
}) => {
  // campos del formulario
  const [form, setForm] = useState({
    instrumento: instrumento?.instrumento   ?? '',
    marca:        instrumento?.marca        ?? '',
    modelo:       instrumento?.modelo       ?? '',
    precio:       instrumento?.precio       ?? '',
    costoEnvio:   instrumento?.costoEnvio   ?? '',
    cantidadVendida: instrumento?.cantidadVendida ?? '',
    descripcion:  instrumento?.descripcion  ?? '',
    imagen:       instrumento?.imagen       ?? '',
    categoriaId:  instrumento?.categoria?.id.toString() ?? '' 
  })
  const [categorias, setCategorias] = useState<Categoria[]>([])
  const [error, setError]         = useState<string|null>(null)
  const [saving, setSaving]       = useState(false)

  // cargar categorías
  useEffect(() => {
    getCategorias()
      .then(setCategorias)
      .catch(e => setError(e.message))
  }, [])

  const handleChange = (e: React.ChangeEvent<HTMLInputElement|HTMLTextAreaElement|HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    try {
      const payload = {
        instrumento: form.instrumento,
        marca:       form.marca,
        modelo:      form.modelo,
        precio:      form.precio,
        costoEnvio:  form.costoEnvio,
        cantidadVendida: form.cantidadVendida,
        descripcion: form.descripcion,
        imagen:      form.imagen,
        categoria:   { id: Number(form.categoriaId) }
      }
      if (instrumento) {
        // edición
        await updateInstrumento(instrumento.id.toString(), payload)
      } else {
        // alta
        await createInstrumento(payload)
      }
      onSaved()
    } catch (err: any) {
      setError(err.message)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fp-overlay" onClick={onCancel}>
      <div className="fp-modal" onClick={e => e.stopPropagation()}>
        {/* ---------- Contenido visible del modal ---------- */}
        <form className="fp-form" onSubmit={handleSubmit}>
          <h2>{instrumento ? 'Editar Instrumento' : 'Nuevo Instrumento'}</h2>

          {error && <div className="form-error">Error: {error}</div>}

          <label>
            Categoría
            <select
              name="categoriaId"
              value={form.categoriaId}
              onChange={handleChange}
              required
            >
              <option value="">— seleccioná —</option>
              {categorias.map(cat => (
                <option key={cat.id} value={cat.id.toString()}>
                  {cat.denominacion}
                </option>
              ))}
            </select>
          </label>

          <label>
            Nombre instrumento
            <input
              type="text"
              name="instrumento"
              value={form.instrumento}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Marca
            <input
              type="text"
              name="marca"
              value={form.marca}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Modelo
            <input
              type="text"
              name="modelo"
              value={form.modelo}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Precio
            <input
              type="number"
              name="precio"
              value={form.precio}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Costo de envío
            <input
              type="text"
              name="costoEnvio"
              value={form.costoEnvio}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Cantidad vendida
            <input
              type="number"
              name="cantidadVendida"
              value={form.cantidadVendida}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Imagen (nombre de archivo)
            <input
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Descripción
            <textarea
              name="descripcion"
              value={form.descripcion}
              onChange={handleChange}
              rows={4}
              required
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
            <button
              type="submit"
              disabled={saving}
            >
              {saving ? 'Guardando…' : (instrumento ? 'Actualizar' : 'Agregar')}
            </button>
          </div>
        </form>
        {/* -------------------------------------------------- */}
      </div>
    </div>
  )
}
