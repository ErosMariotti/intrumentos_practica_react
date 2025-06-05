// src/components/CardProducto.tsx
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { getInstrumentos } from '../../service/instrumentoService'
import type { Instrumento } from '../../models/instrumento';
import '../css/CardProducto.css'

export const CardProducto: React.FC = () => {
  const [instrumentos, setInstrumentos] = useState<Instrumento[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string|null>(null)

  useEffect(() => {
    getInstrumentos()
      .then(data => setInstrumentos(data))
      .catch(err => setError(err.message))
      .finally(() => setLoading(false))
  }, [])

  if (loading) return <p className="loading">Cargando instrumentos…</p>
  if (error)   return <p className="error">Error: {error}</p>

  return (
    <ul className="product-list">
      {instrumentos.map(item => (
        <li key={item.id} className="product-card">
          <img
            src={`/img/${item.imagen}`}
            alt={item.instrumento}
            className="product-image"
          />
          <div className="product-details">
            <h3 className="product-name">{item.instrumento}</h3>
            <p className="product-price">
              ${Number(item.precio).toLocaleString()}
            </p>
            <p className="product-shipping">
              {item.costoEnvio === 'G'
                ? 'Envío gratis a todo el país'
                : `Costo de envío interior de Argentina: $${item.costoEnvio}`}
            </p>
            <p className="product-sold">{item.cantidadVendida} vendidos</p>

            {/* Nuevo botón Ver Detalle */}
            <Link to={`/detalle/${item.id}`} className="btn btn-detalle">
              Ver Detalle
            </Link>
          </div>
        </li>
      ))}
    </ul>
  )
}
