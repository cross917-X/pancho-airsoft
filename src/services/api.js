const API_URL = import.meta.env.VITE_API_URL || 'http://localhost/pancho-villa-api'

async function request(path, options = {}) {
  const res = await fetch(`${API_URL}/${path}`, {
    headers: {
      'Content-Type': 'application/json',
      ...(options.headers || {}),
    },
    ...options,
  })

  const data = await res.json().catch(() => ({}))

  if (!res.ok || data.ok === false) {
    const msg = data.error || 'Error en la solicitud'
    throw new Error(msg)
  }

  return data
}

// ----- Productos -----
export function getProductos() {
  return request('productos.php')
}

export function getProducto(id) {
  return request(`productos.php?id=${id}`)
}

export function crearProducto(payload) {
  return request('productos.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

export function actualizarProducto(payload) {
  return request('productos.php', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

// ----- Auth -----
export function login(email, password) {
  return request('login.php', {
    method: 'POST',
    body: JSON.stringify({ email, password }),
  })
}

export function registro(payload) {
  return request('registro.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}

// ----- Carrito / compra -----
export function getCarrito(usuarioHex) {
  return request(`carrito.php?usuario_hex=${encodeURIComponent(usuarioHex)}`)
}

export function agregarAlCarrito(usuarioHex, productoId, cantidad = 1) {
  return request('carrito.php', {
    method: 'POST',
    body: JSON.stringify({
      usuario_hex: usuarioHex,
      producto_id: productoId,
      cantidad,
    }),
  })
}

export function vaciarCarrito(usuarioHex) {
  return request(
    `carrito.php?usuario_hex=${encodeURIComponent(usuarioHex)}&vaciar=1`,
    { method: 'DELETE' }
  )
}

export function comprar({ usuario_hex, items, codigo_descuento }) {
  return request('comprar.php', {
    method: 'POST',
    body: JSON.stringify({ usuario_hex, items, codigo_descuento }),
  })
}

// ----- Admin -----
export function getUsuariosOnline() {
  return request('usuarios_online.php')
}

export function getDescuentos() {
  return request('descuentos.php')
}

export function validarDescuento(codigo, tipo_usuario = 'Cliente') {
  return request(
    `descuentos.php?codigo=${encodeURIComponent(codigo)}&tipo_usuario=${encodeURIComponent(tipo_usuario)}`
  )
}

export function crearDescuento(payload) {
  return request('descuentos.php', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
}
export function getUsuarios() {
  return request('usuarios.php')
}

export function getUsuario(codigo_hex) {
  return request(`usuarios.php?codigo_hex=${encodeURIComponent(codigo_hex)}`)
}

export function actualizarUsuario(payload) {
  return request('usuarios.php', {
    method: 'PUT',
    body: JSON.stringify(payload),
  })
}

export { API_URL }
