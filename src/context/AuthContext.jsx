import { createContext, useContext, useState } from 'react'
import { esAdmin } from '../utils/validaciones'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const raw = localStorage.getItem('pancho_villa_user')
      return raw ? JSON.parse(raw) : null
    } catch {
      return null
    }
  })

  // Puede recibir un email (modo viejo) o un objeto usuario de la API
  const login = (input) => {
    let data
    if (typeof input === 'string') {
      data = {
        email: input.trim().toLowerCase(),
        isAdmin: esAdmin(input),
      }
    } else {
      data = {
        codigo_hex: input.codigo_hex,
        email: input.email,
        nombre: input.nombre,
        apellidos: input.apellidos || '',
        tipo_usuario: input.tipo_usuario,
        isAdmin: Boolean(input.isAdmin) || input.tipo_usuario === 'Administrador' || esAdmin(input.email),
      }
    }
    setUser(data)
    localStorage.setItem('pancho_villa_user', JSON.stringify(data))
    return data
  }

  const logout = () => {
    setUser(null)
    localStorage.removeItem('pancho_villa_user')
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth debe usarse dentro de AuthProvider')
  return ctx
}
