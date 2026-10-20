import { useEffect, useState } from 'react'
import { getDescuentos, crearDescuento } from '../../services/api'

export default function DescuentosAdmin() {
  const [codigos, setCodigos] = useState([])
  const [form, setForm] = useState({
    codigo: '',
    descripcion: '',
    porcentaje: '10',
    tipo: 'general',
    fecha_inicio: '',
    fecha_fin: '',
  })
  const [msg, setMsg] = useState('')

  const cargar = async () => {
    try {
      const data = await getDescuentos()
      setCodigos(data.codigos || [])
    } catch (e) {
      setMsg(e.message)
    }
  }

  useEffect(() => {
    cargar()
  }, [])

  const onSubmit = async (e) => {
    e.preventDefault()
    setMsg('')
    try {
      await crearDescuento({
        ...form,
        porcentaje: Number(form.porcentaje),
        fecha_inicio: form.fecha_inicio || null,
        fecha_fin: form.fecha_fin || null,
      })
      setMsg('Código creado')
      setForm({
        codigo: '',
        descripcion: '',
        porcentaje: '10',
        tipo: 'general',
        fecha_inicio: '',
        fecha_fin: '',
      })
      cargar()
    } catch (e) {
      setMsg(e.message)
    }
  }

  return (
    <>
      <div className="admin-header">
        <h1>Códigos de descuento</h1>
      </div>

      {msg && <div className="alert">{msg}</div>}

      <div className="form-container" style={{ maxWidth: 560, marginBottom: 32 }}>
        <h3>Nuevo código</h3>
        <form onSubmit={onSubmit}>
          <div className="form-group">
            <label>Código</label>
            <input
              value={form.codigo}
              onChange={(e) => setForm({ ...form, codigo: e.target.value })}
              placeholder="NAVIDAD2026"
              required
            />
          </div>
          <div className="form-group">
            <label>Descripción</label>
            <input
              value={form.descripcion}
              onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
            />
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>% Descuento</label>
              <input
                type="number"
                min={1}
                max={100}
                value={form.porcentaje}
                onChange={(e) => setForm({ ...form, porcentaje: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Tipo</label>
              <select
                value={form.tipo}
                onChange={(e) => setForm({ ...form, tipo: e.target.value })}
              >
                <option value="general">General</option>
                <option value="miembro">Solo miembros</option>
                <option value="festivo">Festivo</option>
                <option value="vendedor">Tiendas / vendedores</option>
              </select>
            </div>
          </div>
          <div className="form-row">
            <div className="form-group">
              <label>Desde</label>
              <input
                type="date"
                value={form.fecha_inicio}
                onChange={(e) => setForm({ ...form, fecha_inicio: e.target.value })}
              />
            </div>
            <div className="form-group">
              <label>Hasta</label>
              <input
                type="date"
                value={form.fecha_fin}
                onChange={(e) => setForm({ ...form, fecha_fin: e.target.value })}
              />
            </div>
          </div>
          <button type="submit" className="btn btn-primary">
            Crear código
          </button>
        </form>
      </div>

      <div className="table-wrap">
        <table>
          <thead>
            <tr>
              <th>Código</th>
              <th>%</th>
              <th>Tipo</th>
              <th>Vigencia</th>
              <th>Usos</th>
              <th>Activo</th>
            </tr>
          </thead>
          <tbody>
            {codigos.map((c) => (
              <tr key={c.id}>
                <td>{c.codigo}</td>
                <td>{c.porcentaje}%</td>
                <td>{c.tipo}</td>
                <td>
                  {(c.fecha_inicio || '—') + ' / ' + (c.fecha_fin || '—')}
                </td>
                <td>
                  {c.usos_actuales}
                  {c.usos_max != null ? ` / ${c.usos_max}` : ''}
                </td>
                <td>{c.activo ? 'Sí' : 'No'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}
