import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { REGIONES_COMUNAS } from '../../data/productos'
import { validarEmail, validarRut } from '../../utils/validaciones'

export default function UsuarioForm() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    rut: '',
    nombre: '',
    apellidos: '',
    email: '',
    fecha: '',
    tipo: '',
    region: '',
    comuna: '',
    direccion: '',
  })
  const [errors, setErrors] = useState({})

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const comunas = form.region ? REGIONES_COMUNAS[form.region] || [] : []

  const handleSubmit = (e) => {
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

    if (!form.tipo) err.tipo = 'Seleccione el tipo de usuario'

    if (!form.direccion.trim()) err.direccion = 'La dirección es obligatoria'
    else if (form.direccion.length > 300) err.direccion = 'Máximo 300 caracteres'

    setErrors(err)
    if (Object.keys(err).length) return

    alert('Usuario guardado correctamente (simulado)')
    navigate('/admin/usuarios')
  }

  const group = (name, label, input) => (
    <div className={`form-group ${errors[name] ? 'has-error' : ''}`}>
      <label>{label}</label>
      {input}
      {errors[name] && <div className="error">{errors[name]}</div>}
    </div>
  )

  return (
    <>
      <div className="admin-header">
        <h1>Nuevo usuario</h1>
        <Link to="/admin/usuarios" className="btn btn-outline">
          Volver
        </Link>
      </div>

      <div className="form-container" style={{ maxWidth: 640, margin: 0 }}>
        <form onSubmit={handleSubmit} noValidate>
          {group(
            'rut',
            'RUT *',
            <input
              value={form.rut}
              placeholder="19011022K"
              maxLength={12}
              onChange={set('rut')}
            />
          )}

          <div className="form-row">
            {group(
              'nombre',
              'Nombre *',
              <input value={form.nombre} maxLength={50} onChange={set('nombre')} />
            )}
            {group(
              'apellidos',
              'Apellidos *',
              <input
                value={form.apellidos}
                maxLength={100}
                onChange={set('apellidos')}
              />
            )}
          </div>

          {group(
            'email',
            'Correo electrónico *',
            <input
              type="email"
              value={form.email}
              maxLength={100}
              placeholder="ejemplo@gmail.com"
              onChange={set('email')}
            />
          )}

          {group(
            'fecha',
            'Fecha de nacimiento',
            <input type="date" value={form.fecha} onChange={set('fecha')} />
          )}

          {group(
            'tipo',
            'Tipo de usuario *',
            <select value={form.tipo} onChange={set('tipo')}>
              <option value="">Seleccione</option>
              <option value="Administrador">Administrador</option>
              <option value="Vendedor">Vendedor</option>
              <option value="Cliente">Cliente</option>
            </select>
          )}

          <div className="form-row">
            <div className="form-group">
              <label>Región</label>
              <select
                value={form.region}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    region: e.target.value,
                    comuna: '',
                  }))
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
              <label>Comuna</label>
              <select value={form.comuna} onChange={set('comuna')}>
                <option value="">Seleccione comuna</option>
                {comunas.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {group(
            'direccion',
            'Dirección *',
            <input
              value={form.direccion}
              maxLength={300}
              onChange={set('direccion')}
            />
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Guardar usuario
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
