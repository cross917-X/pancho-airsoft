import { useState } from 'react'
import { validarEmail } from '../utils/validaciones'

export default function Contacto() {
  const [form, setForm] = useState({ nombre: '', email: '', comentario: '' })
  const [errors, setErrors] = useState({})
  const [exito, setExito] = useState(false)

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = (e) => {
    e.preventDefault()
    const err = {}

    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio'
    else if (form.nombre.length > 100) err.nombre = 'Máximo 100 caracteres'

    if (form.email) {
      if (form.email.length > 100) err.email = 'Máximo 100 caracteres'
      else if (!validarEmail(form.email))
        err.email = 'Solo se permiten correos  @gmail.com, @hotmail.com y @email.com'
    }

    if (!form.comentario.trim()) err.comentario = 'El comentario es obligatorio'
    else if (form.comentario.length > 500) err.comentario = 'Máximo 500 caracteres'

    setErrors(err)
    if (Object.keys(err).length) return

    setExito(true)
    setForm({ nombre: '', email: '', comentario: '' })
  }

  return (
    <div className="form-container">
      <h1>Contacto</h1>
      <p className="subtitle">
        Envíanos tu consulta y te responderemos a la brevedad
      </p>

      {exito && (
        <div className="alert alert-success">
          Mensaje enviado correctamente. Te contactaremos pronto.
        </div>
      )}

      <form onSubmit={handleSubmit} noValidate>
        <div className={`form-group ${errors.nombre ? 'has-error' : ''}`}>
          <label htmlFor="contacto-nombre">Nombre completo</label>
          <input
            id="contacto-nombre"
            value={form.nombre}
            maxLength={100}
            onChange={set('nombre')}
          />
          {errors.nombre && <div className="error">{errors.nombre}</div>}
        </div>

        <div className={`form-group ${errors.email ? 'has-error' : ''}`}>
          <label htmlFor="contacto-email">Correo electrónico</label>
          <input
            type="email"
            id="contacto-email"
            value={form.email}
            maxLength={100}
            placeholder="ejemplo@gmail.com"
            onChange={set('email')}
          />
          {errors.email && <div className="error">{errors.email}</div>}
        </div>

        <div className={`form-group ${errors.comentario ? 'has-error' : ''}`}>
          <label htmlFor="contacto-comentario">Mensaje</label>
          <textarea
            id="contacto-comentario"
            rows={5}
            maxLength={500}
            value={form.comentario}
            onChange={set('comentario')}
          />
          {errors.comentario && (
            <div className="error">{errors.comentario}</div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Enviar mensaje
          </button>
        </div>
      </form>
    </div>
  )
}
