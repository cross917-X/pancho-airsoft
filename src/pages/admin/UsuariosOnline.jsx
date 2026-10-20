import { useEffect, useState } from 'react'
import { getUsuariosOnline } from '../../services/api'

export default function UsuariosOnline() {
  const [usuarios, setUsuarios] = useState([])
  const [total, setTotal] = useState(0)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    try {
      setError('')
      const data = await getUsuariosOnline()
      setUsuarios(data.usuarios || [])
      setTotal(data.total || 0)
    } catch (e) {
      setError(e.message || 'No se pudo cargar')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    cargar()
    const id = setInterval(cargar, 10000) // cada 10s
    return () => clearInterval(id)
  }, [])

  return (
    <>
      <div className="admin-header">
        <h1>Usuarios conectados</h1>
        <button type="button" className="btn btn-outline" onClick={cargar}>
          Actualizar
        </button>
      </div>
      <p style={{ color: 'var(--color-text-muted)', marginBottom: 16 }}>
        Se actualiza cada 10 segundos. Criterio: estado en línea o actividad reciente (15 min).
      </p>
      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <p>Cargando...</p>
      ) : (
        <>
          <p style={{ marginBottom: 12 }}>
            <strong>{total}</strong> usuario(s) conectado(s)
          </p>
          <div className="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Nombre</th>
                  <th>Email</th>
                  <th>Tipo</th>
                  <th>Estado</th>
                  <th>Última actividad</th>
                </tr>
              </thead>
              <tbody>
                {usuarios.length === 0 ? (
                  <tr>
                    <td colSpan={6} style={{ textAlign: 'center' }}>
                      Nadie conectado ahora
                    </td>
                  </tr>
                ) : (
                  usuarios.map((u) => (
                    <tr key={u.codigo_hex}>
                      <td>{u.codigo_hex}</td>
                      <td>
                        {u.nombre} {u.apellidos}
                      </td>
                      <td>{u.email}</td>
                      <td>{u.tipo_usuario}</td>
                      <td>{u.estado}</td>
                      <td>{u.ultima_actividad || u.ultimo_acceso || '—'}</td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </>
      )}
    </>
  )
}
