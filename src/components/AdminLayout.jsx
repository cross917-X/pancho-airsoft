import { Link, NavLink, Outlet, Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { user } = useAuth()

  if (!user?.isAdmin && !user?.isVendedor) {
    return <Navigate to="/login" replace />
  }

  return (
    <div className="admin-layout">
      <aside className="admin-sidebar">
        <div className="logo">
          Pancho <span>Admin</span>
        </div>
        <nav className="admin-nav">
          <NavLink to="/admin" end>
            Dashboard
          </NavLink>
          <NavLink to="/admin/productos">Productos</NavLink>
          {user?.isAdmin && (
            <>
              <NavLink to="/admin/usuarios">Usuarios</NavLink>
              <NavLink to="/admin/online">En línea</NavLink>
              <NavLink to="/admin/descuentos">Descuentos</NavLink>
            </>
          )}
          <Link to="/">← Ir a la tienda</Link>
        </nav>
      </aside>
      <div className="admin-content">
        <Outlet />
      </div>
    </div>
  )
}
