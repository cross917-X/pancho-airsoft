import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { validarEmail } from '../utils/validaciones'

export default function Login() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState({})

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}

    if (!email.trim()) err.email = 'El correo es obligatorio'
    else if (email.length > 100) err.email = 'Máximo 100 caracteres'
    else if (!validarEmail(email))
      err.email = 'Solo se permiten correos @duoc.cl, @profesor.duoc.cl o @gmail.com'

    if (!password) err.password = 'La contraseña es obligatoria'
    else if (password.length < 4 || password.length > 255)
      err.password = 'La contraseña debe tener entre 4 y 255 caracteres'

    setErrors(err)
    if (Object.keys(err).length) return

    try {
      const res = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'No se pudo iniciar sesión')
        return
      }
      const user = login(data.usuario)
      if (user.isAdmin) {
        alert('Bienvenido Administrador')
        navigate('/admin')
      } else {
        alert('Inicio de sesión exitoso')
        navigate('/')
      }
    } catch {
      alert('No se pudo conectar al servidor. ¿Está corriendo el backend?')
    }
  }

  return (
    <div className="form-container">
      <h1>Iniciar sesión</h1>
      <p className="subtitle">Accede a tu cuenta</p>

      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="login-email">Correo electrónico</label>
          <input
            type="email"
            id="login-email"
            value={email}
            maxLength={100}
            placeholder="ejemplo@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className={`form-group ${errors.password ? 'has-error' : ''}`}>
          <label htmlFor="login-password">Contraseña</label>
          <input
            type="password"
            id="login-password"
            value={password}
            maxLength={10}
            placeholder="4 a 10 caracteres"
            onChange={(e) => setPassword(e.target.value)}
          />
          {errors.password && <div className="error">{errors.password}</div>}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Ingresar
          </button>
        </div>
      </form>

      <p className="form-footer">
        ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
      </p>
    </div>
  )
}
