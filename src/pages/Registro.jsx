import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGIONES_COMUNAS } from '../data/productos'
import { validarEmail, validarRut } from '../utils/validaciones'

export default function Registro() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    password: '',
    confirm: '',
    region: '',
    comuna: '',
    direccion: '',
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const comunas = form.region ? REGIONES_COMUNAS[form.region] || [] : []

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}

    if (!form.rut.trim()) err.rut = 'El RUT es obligatorio'
    else if (!validarRut(form.rut)) err.rut = 'RUT inválido (ej: 19011022K)'

    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio'
    else if (form.nombre.length > 50) err.nombre = 'Máximo 50 caracteres'

    if (!form.apellidos.trim()) err.apellidos = 'Los apellidos son obligatorios'
    else if (form.apellidos.length > 100) err.apellidos = 'Máximo 100 caracteres'

    if (!form.email.trim()) err.email = 'El correo es obligatorio'
    else if (form.email.length > 100) err.email = 'Máximo 100 caracteres'
    else if (!validarEmail(form.email))
      err.email = 'Solo @duoc.cl, @profesor.duoc.cl o @gmail.com'

    if (!form.password || form.password.length < 4 || form.password.length > 255)
      err.password = 'Contraseña entre 4 y 255 caracteres'

    if (form.confirm !== form.password) err.confirm = 'Las contraseñas no coinciden'

    if (!form.direccion.trim()) err.direccion = 'La dirección es obligatoria'
    else if (form.direccion.length > 300) err.direccion = 'Máximo 300 caracteres'

    setErrors(err)
    if (Object.keys(err).length) return

    try {
      const res = await fetch('http://localhost:5000/api/usuarios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          rut: form.rut,
          nombre: form.nombre,
          apellidos: form.apellidos,
          email: form.email,
          password: form.password,
          region: form.region,
          comuna: form.comuna,
          direccion: form.direccion,
          tipo_usuario: 'Cliente',
        }),
      })
      const data = await res.json()
      if (!res.ok) {
        alert(data.error || 'No se pudo registrar')
        return
      }
      alert('Registro exitoso. Tu código de cuenta: ' + (data.codigo_hex || ''))
      navigate('/login')
    } catch (error) {
      alert('No se pudo conectar al servidor. ¿Está corriendo el backend en el puerto 5000?')
    }
  }

  const field = (name, label, props = {}) => (
    <div className={`form-group ${errors[name] ? 'has-error' : ''}`}>
      <label htmlFor={`reg-${name}`}>{label}</label>
      <input
        id={`reg-${name}`}
        value={form[name]}
        onChange={set(name)}
        {...props}
      />
      {errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  )

  return (
    <div className="form-container" style={{ maxWidth: 560 }}>
      <h1>Crear cuenta</h1>
      <p className="subtitle">Regístrate para comprar y seguir tus pedidos</p>

      <form onSubmit={handleSubmit} noValidate>
        {field('rut', 'RUT', { placeholder: '19011022K', maxLength: 12 })}

        <div className="form-row">
          {field('nombre', 'Nombre', { maxLength: 50 })}
          {field('apellidos', 'Apellidos', { maxLength: 100 })}
        </div>

        {field('email', 'Correo electrónico', {
          type: 'email',
          placeholder: 'ejemplo@gmail.com',
          maxLength: 100,
        })}

        <div className="form-row">
          {field('password', 'Contraseña', { type: 'password', maxLength: 10 })}
          {field('confirm', 'Confirmar contraseña', {
            type: 'password',
            maxLength: 10,
          })}
        </div>

        <div className="form-row">
          <div className={`form-group ${errors.region ? 'has-error' : ''}`}>
            <label htmlFor="reg-region">Región</label>
            <select
              id="reg-region"
              value={form.region}
              onChange={(e) =>
                setForm((f) => ({ ...f, region: e.target.value, comuna: '' }))
              }
            >
              <option value="">Seleccione región</option>
              {Object.keys(REGIONES_COMUNAS).map((r) => (
                <option key={r} value={r}>
                  {r}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label htmlFor="reg-comuna">Comuna</label>
            <select
              id="reg-comuna"
              value={form.comuna}
              onChange={set('comuna')}
            >
              <option value="">Seleccione comuna</option>
              {comunas.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {field('direccion', 'Dirección', { maxLength: 300 })}

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Registrarse
          </button>
        </div>
      </form>

      <p className="form-footer">
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
      </p>
    </div>
  )
}
