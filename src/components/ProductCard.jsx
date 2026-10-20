import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { formatearPrecio } from '../utils/validaciones'

export default function ProductCard({ producto }) {
  const { agregar } = useCart()

  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`}>
        <div className="img-wrap">
          <img
            src={producto.imagen}
            alt={producto.nombre}
            onError={(e) => {
              e.target.src =
                'https://placehold.co/400x400/1a1d24/3d8b5f?text=Airsoft'
            }}
          />
        </div>
      </Link>
      <div className="info">
        <div className="category">{producto.categoria}</div>
        <h3>{producto.nombre}</h3>
        <div className="price-row">
          <span className="price">{formatearPrecio(producto.precio)}</span>
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => {
              agregar(producto, 1)
              alert(`${producto.nombre} agregado al carrito`)
            }}
          >
            Añadir
          </button>
        </div>
      </div>
    </article>
  )
}
