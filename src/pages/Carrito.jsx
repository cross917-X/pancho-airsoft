import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import { formatearPrecio } from '../utils/validaciones'
import { comprar, validarDescuento } from '../services/api'

export default function Carrito() {
  const { items, eliminar, actualizarCantidad, totalPrecio, vaciar } = useCart()
  const { user } = useAuth()
  const [codigo, setCodigo] = useState('')
  const [descuento, setDescuento] = useState(null)
  const [msg, setMsg] = useState('')
  const [loading, setLoading] = useState(false)

  const aplicarCodigo = async () => {
    setMsg('')
    setDescuento(null)
    if (!codigo.trim()) return
    try {
      const data = await validarDescuento(
        codigo.trim(),
        user?.tipo_usuario || 'Cliente'
      )
      setDescuento(data.descuento)
      setMsg(`Código aplicado: ${data.descuento.porcentaje}%`)
    } catch (e) {
      setMsg(e.message || 'Código inválido')
    }
  }

  const totalConDesc = descuento
    ? totalPrecio * (1 - Number(descuento.porcentaje) / 100)
    : totalPrecio

  const pagar = async () => {
    if (items.length === 0) {
      alert('Tu carrito está vacío')
      return
    }
    setLoading(true)
    try {
      const data = await comprar({
        usuario_hex: user?.codigo_hex || '',
        items: items.map((i) => ({
          producto_id: i.id,
          cantidad: i.cantidad,
        })),
        codigo_descuento: descuento?.codigo || codigo || '',
      })
      vaciar()
      setDescuento(null)
      setCodigo('')
      alert(
        `Pago exitoso. Total: ${formatearPrecio(data.total)}` +
          (data.descuento_porcentaje
            ? ` (descuento ${data.descuento_porcentaje}%)`
            : '')
      )
    } catch (e) {
      // Si falla la API, al menos vaciamos localmente solo si quieres;
      // mejor avisar del error de stock
      alert(e.message || 'No se pudo completar la compra')
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <h1 className="mb-20">Mi carrito de compras</h1>

      <div className="cart-layout">
        <div className="cart-items">
          {items.length === 0 ? (
            <p
              style={{
                padding: 30,
                textAlign: 'center',
                color: 'var(--color-text-muted)',
              }}
            >
              Tu carrito está vacío
            </p>
          ) : (
            items.map((item) => (
              <div className="cart-item" key={item.id}>
                <img
                  src={item.imagen}
                  alt={item.nombre}
                  onError={(e) => {
                    e.target.src =
                      'https://placehold.co/100x100/1a1d24/3d8b5f?text=AS'
                  }}
                />
                <div>
                  <h4>{item.nombre}</h4>
                  <p style={{ color: 'var(--color-accent)', margin: '6px 0' }}>
                    {formatearPrecio(item.precio)}
                  </p>
                  <div className="qty-control">
                    <button
                      type="button"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad - 1)
                      }
                    >
                      −
                    </button>
                    <input
                      type="number"
                      value={item.cantidad}
                      min={1}
                      onChange={(e) =>
                        actualizarCantidad(
                          item.id,
                          parseInt(e.target.value, 10) || 1
                        )
                      }
                    />
                    <button
                      type="button"
                      onClick={() =>
                        actualizarCantidad(item.id, item.cantidad + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                </div>
                <div>
                  <p style={{ fontWeight: 600, marginBottom: 10 }}>
                    {formatearPrecio(item.precio * item.cantidad)}
                  </p>
                  <button
                    type="button"
                    className="btn btn-danger btn-sm"
                    onClick={() => eliminar(item.id)}
                  >
                    Eliminar
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        <aside className="cart-summary">
          <h2>Resumen</h2>
          <div className="summary-row">
            <span>Subtotal</span>
            <span>{formatearPrecio(totalPrecio)}</span>
          </div>

          <div className="form-group" style={{ marginTop: 12 }}>
            <label>Código de descuento</label>
            <div style={{ display: 'flex', gap: 8 }}>
              <input
                value={codigo}
                onChange={(e) => setCodigo(e.target.value.toUpperCase())}
                placeholder="NAVIDAD2026"
              />
              <button
                type="button"
                className="btn btn-outline btn-sm"
                onClick={aplicarCodigo}
              >
                Aplicar
              </button>
            </div>
            {msg && (
              <p style={{ fontSize: '0.85rem', marginTop: 6, color: 'var(--color-text-muted)' }}>
                {msg}
              </p>
            )}
          </div>

          {descuento && (
            <div className="summary-row">
              <span>Descuento ({descuento.porcentaje}%)</span>
              <span>
                -{formatearPrecio(totalPrecio - totalConDesc)}
              </span>
            </div>
          )}

          <div className="summary-row total">
            <span>Total</span>
            <span>{formatearPrecio(totalConDesc)}</span>
          </div>
          <button
            type="button"
            className="btn btn-primary"
            style={{ width: '100%', marginTop: 20 }}
            onClick={pagar}
            disabled={items.length === 0 || loading}
          >
            {loading ? 'Procesando...' : 'Proceder al pago'}
          </button>
          <Link
            to="/productos"
            className="btn btn-outline"
            style={{ width: '100%', marginTop: 10 }}
          >
            Seguir comprando
          </Link>
        </aside>
      </div>
    </>
  )
}
