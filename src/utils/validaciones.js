export function validarEmail(email) {
  const permitidos = ['@gmail.com', '@email.com', '@hotmail.com']
  return permitidos.some((d) => email.toLowerCase().endsWith(d))
}

export function validarRut(rut) {
  rut = rut.replace(/\./g, '').replace(/-/g, '').toUpperCase()
  if (rut.length < 7 || rut.length > 9) return false
  const cuerpo = rut.slice(0, -1)
  const dv = rut.slice(-1)
  if (!/^\d+$/.test(cuerpo)) return false
  let suma = 0
  let multiplo = 2
  for (let i = cuerpo.length - 1; i >= 0; i--) {
    suma += parseInt(cuerpo.charAt(i), 10) * multiplo
    multiplo = multiplo === 7 ? 2 : multiplo + 1
  }
  const dvEsperado = 11 - (suma % 11)
  const dvCalc =
    dvEsperado === 11 ? '0' : dvEsperado === 10 ? 'K' : String(dvEsperado)
  return dv === dvCalc
}

export function formatearPrecio(precio) {
  return '$' + Number(precio).toLocaleString('es-CL')
}

export const ADMINS = [
  'cross917x@gmail.com',
  'ariel.prats.domingo@gmail.com',
]

export function esAdmin(email) {
  return ADMINS.includes(String(email).trim().toLowerCase())
}
