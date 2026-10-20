import { PRODUCTOS } from '../data/productos'
import ProductCard from '../components/ProductCard'

export default function Productos() {
  return (
    <>
      <div className="section-title">
        <h1>Catálogo de productos</h1>
      </div>
      <div className="products-grid">
        {PRODUCTOS.map((p) => (
          <ProductCard key={p.id} producto={p} />
        ))}
      </div>
    </>
  )
}
