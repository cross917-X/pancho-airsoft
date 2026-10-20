import { createContext, useContext, useEffect, useState } from 'react'

const CartContext = createContext(null)
const STORAGE_KEY = 'pancho_villa_carrito'

export function CartProvider({ children }) {
  const [items, setItems] = useState(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY)
      return raw ? JSON.parse(raw) : []
    } catch {
      return []
    }
  })

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items))
  }, [items])

  const agregar = (producto, cantidad = 1) => {
    setItems((prev) => {
      const existe = prev.find((i) => i.id === producto.id)
      if (existe) {
        return prev.map((i) =>
          i.id === producto.id
            ? { ...i, cantidad: i.cantidad + cantidad }
            : i
        )
      }
      return [
        ...prev,
        {
          id: producto.id,
          nombre: producto.nombre,
          precio: producto.precio,
          imagen: producto.imagen,
          cantidad,
        },
      ]
    })
  }

  const eliminar = (id) => {
    setItems((prev) => prev.filter((i) => i.id !== id))
  }

  const actualizarCantidad = (id, cantidad) => {
    const q = Math.max(1, cantidad)
    setItems((prev) =>
      prev.map((i) => (i.id === id ? { ...i, cantidad: q } : i))
    )
  }

  const vaciar = () => setItems([])

  const totalItems = items.reduce((s, i) => s + i.cantidad, 0)
  const totalPrecio = items.reduce((s, i) => s + i.precio * i.cantidad, 0)

  return (
    <CartContext.Provider
      value={{
        items,
        agregar,
        eliminar,
        actualizarCantidad,
        vaciar,
        totalItems,
        totalPrecio,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart debe usarse dentro de CartProvider')
  return ctx
}
