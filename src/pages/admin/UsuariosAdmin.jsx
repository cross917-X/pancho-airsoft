import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getUsuarios } from '../../services/api'

export default function UsuariosAdmin() {
  const [usuarios, setUsuarios] = useState([])
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    setLoading(true)
    setError('')
    try {
      const data = await getUsuarios()
      setUsuarios(data.usuarios || [])
    } catch (e) {
      setError(e.message || 'No se pudieron cargar los usuarios desde la BD')
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
        <h1>Usuarios</h1>
        <div style={{ display: 'flex', gap: 10 }}>
          <button type="button" className="btn btn-outline" onClick={cargar}>
            Actualizar
          </button>
          <Link to="/admin/usuarios/nuevo" className="btn btn-primary">
            + Nuevo usuario
          </Link>
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}
      {loading ? (
        <p>Cargando usuarios desde la base de datos...</p>
      ) : (
        <div className="table-wrap">
          <table>
            <thead>
              <tr>
                <th>Código HEX</th>
                <th>RUT</th>
                <th>Nombre</th>
                <th>Correo</th>
                <th>Tipo</th>
                <th>Estado</th>
                <th>Acciones</th>
              </tr>
            </thead>
            <tbody>
              {usuarios.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center' }}>
                    No hay usuarios en la base de datos
                  </td>
                </tr>
              ) : (
                usuarios.map((u) => (
                  <tr key={u.codigo_hex}>
                    <td>{u.codigo_hex}</td>
                    <td>{u.rut}</td>
                    <td>
                      {u.nombre} {u.apellidos}
                    </td>
                    <td>{u.email}</td>
                    <td>{u.tipo_usuario}</td>
                    <td>{u.estado || '—'}</td>
                    <td>
                      <Link
                        to={`/admin/usuarios/${u.codigo_hex}`}
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
