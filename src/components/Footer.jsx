import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-inner">
        <div>
          <h4>Pancho Villa Táctico</h4>
          <p>
            Especialistas en réplicas Airsoft y equipamiento táctico para uso
            deportivo y recreativo.
          </p>
        </div>
        <div>
          <h4>Navegación</h4>
          <Link to="/productos">Productos</Link>
          <Link to="/nosotros">Nosotros</Link>
          <Link to="/blogs">Blog</Link>
          <Link to="/contacto">Contacto</Link>
        </div>
        <div>
          <h4>Cuenta</h4>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro">Crear cuenta</Link>
          <Link to="/carrito">Mi carrito</Link>
        </div>
        <div>
          <h4>Contacto</h4>
          <p>contacto@panchovillatactico.cl</p>
          <p>+56 9 1234 5678</p>
          <p>Santiago, Chile</p>
        </div>
      </div>
      <div className="footer-bottom">
        © 2026 Pancho Villa Táctico · Todas las réplicas son Airsoft (6 mm – no
        letales)
      </div>
    </footer>
  )
}
