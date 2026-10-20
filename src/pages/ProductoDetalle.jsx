import { useParams, Link } from 'react-router-dom'
import { useState } from 'react'
import { PRODUCTOS } from '../data/productos'
import { useCart } from '../context/CartContext'
import { formatearPrecio } from '../utils/validaciones'

export default function ProductoDetalle() {
  const { id } = useParams()
  const producto = PRODUCTOS.find((p) => p.id === Number(id))
  const { agregar } = useCart()
  const [qty, setQty] = useState(1)

  if (!producto) {
    return (
      <p>
        Producto no encontrado.{' '}
        <Link to="/productos">Volver al catálogo</Link>
      </p>
    )
  }

  return (
    <div className="product-detail">
      <div className="product-gallery">
        <div className="main-img">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={(e) => {
              e.target.src =
                'https://placehold.co/500x500/1a1d24/3d8b5f?text=Airsoft'
            }}
          />
        </div>
      </div>
      <div className="product-info">
        <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: 8 }}>
          {producto.categoria} · {producto.codigo}
        </p>
        <h1>{producto.nombre}</h1>
        <div className="price">{formatearPrecio(producto.precio)}</div>
        <p className="desc">{producto.descripcion}</p>
        <p style={{ marginBottom: 16, fontSize: '0.9rem', color: 'var(--color-text-muted)' }}>
          Stock disponible: {producto.stock} unidades
        </p>
        <div className="qty-control">
          <button type="button" onClick={() => setQty((q) => Math.max(1, q - 1))}>
            −
          </button>
          <input
            type="number"
            value={qty}
            min={1}
            max={producto.stock}
            onChange={(e) => setQty(Math.max(1, parseInt(e.target.value, 10) || 1))}
          />
          <button type="button" onClick={() => setQty((q) => q + 1)}>
            +
          </button>
        </div>
        <button
          type="button"
          className="btn btn-primary"
          onClick={() => {
            agregar(producto, qty)
            alert(`${producto.nombre} agregado al carrito`)
          }}
        >
          Añadir al carrito
        </button>
      </div>
    </div>
  )
}
