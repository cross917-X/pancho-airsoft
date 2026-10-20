import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getProductos } from '../../services/api'

export default function ProductosAdmin() {
  const [productos, setProductos] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getProductos()
      setProductos(data.productos || [])
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los productos desde la BD')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  return (
    <>
      <div className="admin-header">
        <h1>Productos</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline" onClick={cargar}>
            Actualizar
          </button>
          <Link to="/admin/productos/nuevo" className="btn btn-primary">
            + Nuevo producto
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <p>Cargando productos desde la base de datos...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Precio</th>
                <th>Stock</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {productos.length === 0 ? (
                <tr>
                  <td colSpan={6} style={{ textAlign: 'center' }}>
                    No hay productos
                  </td>
                </tr>
              ) : (
                productos.map((p) => (
                  <tr key={p.id}>
                    <td>{p.codigo}</td>
                    <td>{p.nombre}</td>
                    <td>{p.categoria || '—'}</td>
                    <td>
                      $
                      {Number(p.precio).toLocaleString('es-CL')}
                    </td>
                    <td>
                      {p.stock}
                      {p.stockCritico != null &&
                        Number(p.stock) <= Number(p.stockCritico) && (
                          <span
                            style={{
                              color: 'var(--color-danger)',
                              fontSize: '0.8rem',
                            }}
                          >
                            {' '}
                            (crítico)
                          </span>
                        )}
                    </td>
                    <td>
                      <Link
                        to={`/admin/productos/${p.id}`}
                        className="btn btn-outline btn-sm"
                      >
                        Editar
                      </Link>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}
    </>
  )
}
