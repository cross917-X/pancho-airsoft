import { Link } from 'react-router-dom'
import { PRODUCTOS } from '../data/productos'
import ProductCard from '../components/ProductCard'

export default function Home() {
  const destacados = PRODUCTOS.slice(0, 4)

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <h1>Réplicas Airsoft de alto rendimiento</h1>
          <p>
            Equipamiento táctico, rifles AEG, pistolas GBB y accesorios para
            jugadores de todos los niveles. Calidad, precisión y servicio
            especializado.
          </p>
          <Link to="/productos" className="btn btn-primary">
            Ver catálogo
          </Link>
        </div>
        <div className="hero-image">
          <img
            src="/img/scar.jpg"
            alt="Réplicas Airsoft"
            onError={(e) => {
              e.target.src =
                'https://placehold.co/600x380/1a1d24/3d8b5f?text=Pancho+Villa+Tactico'
            }}
          />
        </div>
      </section>

      <section>
        <div className="section-title">
          <h2>Productos destacados</h2>
          <Link to="/productos" className="btn btn-outline btn-sm">
            Ver todos
          </Link>
        </div>
        <div className="products-grid">
          {destacados.map((p) => (
            <ProductCard key={p.id} producto={p} />
          ))}
        </div>
      </section>
    </>
  )
}
