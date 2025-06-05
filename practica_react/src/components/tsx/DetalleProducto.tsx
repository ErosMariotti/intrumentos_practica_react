// src/components/DetalleProducto.tsx
import '../css/DetalleProducto.css'
import React, { useState, useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { getInstrumentoById } from '../../service/instrumentoService'
import type { Instrumento } from '../../models/instrumento';

interface CartItem {
  instrumento: Instrumento
  cantidad: number
}

export const DetalleProducto: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [instrumento, setInstrumento] = useState<Instrumento | null>(null)
  const [loading, setLoading] = useState<boolean>(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    getInstrumentoById(id)
      .then((data) => setInstrumento(data))
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false))
  }, [id])

  if (loading) return <p className="loading">Cargando detalle…</p>
  if (error) return <p className="error">Error: {error}</p>
  if (!instrumento) return <p>No se encontró el instrumento.</p>

  const handleAddToCart = () => {
    try {
      // 1) Leer carrito actual de localStorage (o crear un array vacío si no existe)
      const stored = localStorage.getItem('cartItems')
      const cart: CartItem[] = stored ? JSON.parse(stored) : []

      // 2) Verificar si el instrumento ya está en el carrito
      const index = cart.findIndex((item) => item.instrumento.id === instrumento.id)

      if (index >= 0) {
        // Si ya existe, solo incrementamos la cantidad
        cart[index].cantidad += 1
      } else {
        // Si no existe, lo agregamos con cantidad = 1
        cart.push({ instrumento: instrumento, cantidad: 1 })
      }

      // 3) Guardar de nuevo en localStorage
      localStorage.setItem('cartItems', JSON.stringify(cart))

      // 4) Mostrar confirmación
      alert(`"${instrumento.instrumento}" se agregó al carrito.`)
    } catch (e) {
      console.error('Error agregando al carrito:', e)
      alert('No se pudo agregar el producto al carrito.')
    }
  }

  return (
    <div className="detalle-container">
      <button className="volver-btn" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detalle-content">
        <div className="detalle-imagen">
          <img
            src={`/img/${instrumento.imagen}`}
            alt={instrumento.instrumento}
          />
        </div>
        <div className="detalle-info">
          <h2 className="detalle-title">{instrumento.instrumento}</h2>
          <p className="detalle-sold">{instrumento.cantidadVendida} vendidos</p>
          <p className="detalle-price">
            ${Number(instrumento.precio).toLocaleString()}
          </p>
          <p className="detalle-brand">
            <strong>Marca:</strong> {instrumento.marca}
          </p>
          <p className="detalle-model">
            <strong>Modelo:</strong> {instrumento.modelo}
          </p>
          <p className="detalle-shipping">
            <strong>Costo Envío:</strong>{' '}
            {instrumento.costoEnvio === 'G'
              ? 'Envío gratis a todo el país'
              : `$${instrumento.costoEnvio}`}
          </p>
          <h3>Descripción:</h3>
          <p className="detalle-desc">{instrumento.descripcion}</p>

          <button className="btn-carrito" onClick={handleAddToCart}>
            🛒 Agregar al carrito
          </button>
        </div>
      </div>
    </div>
  )
}
