import { useState, useEffect } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PRODUCTOS } from '../../data/productos'
import { crearProducto, actualizarProducto, getProducto } from '../../services/api'

const CATEGORIAS = [
  'Rifles AEG',
  'Pistolas',
  'Subfusiles',
  'Francotiradores',
  'Escopetas',
  'Rifles Clásicos',
  'Ametralladoras',
  'Accesorios',
  'Munición Airsoft',
]

export default function ProductoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState({
    codigo: '',
    nombre: '',
    descripcion: '',
    precio: '',
    stock: '',
    stockCritico: '5',
    categoria: '',
    imagen: '',
  })
  const [errors, setErrors] = useState({})

  useEffect(() => {
    if (isEdit) {
      const p = PRODUCTOS.find((x) => x.id === Number(id))
      if (p) {
        setForm({
          codigo: p.codigo,
          nombre: p.nombre,
          descripcion: p.descripcion || '',
          precio: String(p.precio),
          stock: String(p.stock),
          stockCritico: String(p.stockCritico ?? 5),
          categoria: p.categoria,
          imagen: p.imagen || '',
        })
      }
    }
  }, [id, isEdit])

  const set = (field) => (e) =>
    setForm((f) => ({ ...f, [field]: e.target.value }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    const err = {}

    if (!form.codigo.trim()) err.codigo = 'El código es obligatorio'
    else if (form.codigo.trim().length < 3) err.codigo = 'Mínimo 3 caracteres'

    if (!form.nombre.trim()) err.nombre = 'El nombre es obligatorio'
    else if (form.nombre.length > 100) err.nombre = 'Máximo 100 caracteres'

    if (form.precio === '') err.precio = 'El precio es obligatorio'
    else if (parseFloat(form.precio) < 0) err.precio = 'El precio no puede ser negativo'

    if (form.stock === '') err.stock = 'El stock es obligatorio'
    else if (!Number.isInteger(Number(form.stock)) || Number(form.stock) < 0)
      err.stock = 'Solo números enteros ≥ 0'

    if (
      form.stockCritico !== '' &&
      (!Number.isInteger(Number(form.stockCritico)) || Number(form.stockCritico) < 0)
    ) {
      err.stockCritico = 'Solo números enteros ≥ 0'
    }

    if (!form.categoria) err.categoria = 'Seleccione una categoría'

    setErrors(err)
    if (Object.keys(err).length) return

    try {
      const payload = {
        codigo: form.codigo.trim(),
        nombre: form.nombre.trim(),
        descripcion: form.descripcion.trim(),
        precio: Number(form.precio),
        stock: Number(form.stock),
        stockCritico: Number(form.stockCritico || 5),
        categoria: form.categoria,
        imagen: form.imagen.trim() || '/img/scar.jpg',
      }
      if (isEdit) {
        await actualizarProducto({ id: Number(id), ...payload })
        alert('Producto actualizado (stock incluido)')
      } else {
        await crearProducto(payload)
        alert('Producto guardado en la base de datos')
      }
      navigate('/admin/productos')
    } catch (error) {
      alert(error.message || 'No se pudo guardar el producto')
    }
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
        <h1>{isEdit ? 'Editar producto' : 'Nuevo producto'}</h1>
        <Link to="/admin/productos" className="btn btn-outline">
          Volver
        </Link>
      </div>

      <div className="form-container" style={{ maxWidth: 640, margin: 0 }}>
        <form onSubmit={handleSubmit} noValidate>
          {group(
            'codigo',
            'Código del producto *',
            <input
              value={form.codigo}
              maxLength={50}
              placeholder="Ej: AEG-001"
              onChange={set('codigo')}
            />
          )}
          {group(
            'nombre',
            'Nombre *',
            <input value={form.nombre} maxLength={100} onChange={set('nombre')} />
          )}
          {group(
            'descripcion',
            'Descripción',
            <textarea
              rows={4}
              maxLength={500}
              value={form.descripcion}
              onChange={set('descripcion')}
            />
          )}

          <div className="form-row">
            {group(
              'precio',
              'Precio *',
              <input
                type="number"
                min={0}
                step="0.01"
                value={form.precio}
                onChange={set('precio')}
              />
            )}
            {group(
              'stock',
              'Stock *',
              <input
                type="number"
                min={0}
                step={1}
                value={form.stock}
                onChange={set('stock')}
              />
            )}
          </div>

          <div className="form-row">
            {group(
              'stockCritico',
              'Stock crítico',
              <input
                type="number"
                min={0}
                step={1}
                value={form.stockCritico}
                onChange={set('stockCritico')}
              />
            )}
            {group(
              'categoria',
              'Categoría *',
              <select value={form.categoria} onChange={set('categoria')}>
                <option value="">Seleccione</option>
                {CATEGORIAS.map((c) => (
                  <option key={c} value={c}>
                    {c}
                  </option>
                ))}
              </select>
            )}
          </div>

          {group(
            'imagen',
            'URL de imagen (opcional)',
            <input
              value={form.imagen}
              placeholder="/img/nombre.jpg"
              onChange={set('imagen')}
            />
          )}

          <div className="form-actions">
            <button type="submit" className="btn btn-primary">
              Guardar producto
            </button>
          </div>
        </form>
      </div>
    </>
  )
}
