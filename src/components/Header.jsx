import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'

export default function Header() {
  const { totalItems } = useCart()
  const { user, logout } = useAuth()

  return (
    <>
      <div className="top-bar">
        Todas las réplicas son <strong>Airsoft cal. 6 mm</strong> — No letales ·
        Uso deportivo y recreativo
      </div>
      <header className="header">
        <div className="header-inner">
          <Link to="/" className="logo">
            Pancho <span>Villa</span>
          </Link>
          <nav className="nav">
            <NavLink to="/" end>
              Inicio
            </NavLink>
            <NavLink to="/productos">Productos</NavLink>
            <NavLink to="/nosotros">Nosotros</NavLink>
            <NavLink to="/blogs">Blog</NavLink>
            <NavLink to="/contacto">Contacto</NavLink>
          </nav>
          <div className="header-actions">
            <Link to="/carrito" className="btn-cart">
              🛒 Carrito <span className="cart-count">{totalItems}</span>
            </Link>
            <div className="auth-links">
              {user ? (
                <>
                  {user.isAdmin && (
                    <Link to="/admin">Admin</Link>
                  )}
                  <button
                    type="button"
                    onClick={logout}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: 'inherit',
                      cursor: 'pointer',
                      marginLeft: 12,
                      fontSize: '0.9rem',
                    }}
                  >
                    Cerrar sesión
                  </button>
                </>
              ) : (
                <>
                  <Link to="/login">Iniciar sesión</Link>
                  <Link to="/registro">Registrarse</Link>
                </>
              )}
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
