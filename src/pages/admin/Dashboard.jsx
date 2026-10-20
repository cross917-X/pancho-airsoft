import { useEffect, useState } from 'react'
import { getProductos, getUsuarios } from '../../services/api'

export default function Dashboard() {
  const [stats, setStats] = useState({
    productos: '—',
    usuarios: '—',
    pedidos: '—',
  })

  useEffect(() => {
    ;(async () => {
      try {
        const [p, u] = await Promise.all([getProductos(), getUsuarios()])
        setStats({
          productos: (p.productos || []).length,
          usuarios: u.total ?? (u.usuarios || []).length,
          pedidos: '—',
        })
      } catch {
        // deja guiones
      }
    })()
  }, [])

  return (
    <>
      <div className="admin-header">
        <h1>¡Hola, Administrador!</h1>
      </div>
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: 20,
        }}
      >
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Productos
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>
            {stats.productos}
          </p>
        </div>
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Usuarios
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>
            {stats.usuarios}
          </p>
        </div>
        <div
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            borderRadius: 12,
            padding: 24,
          }}
        >
          <h3 style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem' }}>
            Pedidos
          </h3>
          <p style={{ fontSize: '2rem', fontWeight: 700, marginTop: 8 }}>
            {stats.pedidos}
          </p>
        </div>
      </div>
      <p style={{ marginTop: 40, color: 'var(--color-text-muted)' }}>
        Datos en vivo desde la base de datos. En Productos puedes editar precio y
        stock; en Usuarios ves las cuentas registradas.
      </p>
    </>
  )
}
