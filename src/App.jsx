import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import Layout from './components/Layout'
import AdminLayout from './components/AdminLayout'

import Home from './pages/Home'
import Productos from './pages/Productos'
import ProductoDetalle from './pages/ProductoDetalle'
import Login from './pages/Login'
import Registro from './pages/Registro'
import Contacto from './pages/Contacto'
import Carrito from './pages/Carrito'
import Nosotros from './pages/Nosotros'
import Blogs from './pages/Blogs'
import BlogDetalle from './pages/BlogDetalle'

import Dashboard from './pages/admin/Dashboard'
import ProductosAdmin from './pages/admin/ProductosAdmin'
import ProductoForm from './pages/admin/ProductoForm'
import UsuariosAdmin from './pages/admin/UsuariosAdmin'
import UsuarioForm from './pages/admin/UsuarioForm'
import UsuariosOnline from './pages/admin/UsuariosOnline'
import DescuentosAdmin from './pages/admin/DescuentosAdmin'

export default function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <BrowserRouter>
          <Routes>
            {/* Tienda pública */}
            <Route element={<Layout />}>
              <Route path="/" element={<Home />} />
              <Route path="/productos" element={<Productos />} />
              <Route path="/producto/:id" element={<ProductoDetalle />} />
              <Route path="/login" element={<Login />} />
              <Route path="/registro" element={<Registro />} />
              <Route path="/contacto" element={<Contacto />} />
              <Route path="/carrito" element={<Carrito />} />
              <Route path="/nosotros" element={<Nosotros />} />
              <Route path="/blogs" element={<Blogs />} />
              <Route path="/blogs/:id" element={<BlogDetalle />} />
            </Route>

            {/* Admin */}
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="productos" element={<ProductosAdmin />} />
              <Route path="productos/nuevo" element={<ProductoForm />} />
              <Route path="productos/:id" element={<ProductoForm />} />
              <Route path="usuarios" element={<UsuariosAdmin />} />
              <Route path="usuarios/nuevo" element={<UsuarioForm />} />
              <Route path="usuarios/:id" element={<UsuarioForm />} />
              <Route path="online" element={<UsuariosOnline />} />
              <Route path="descuentos" element={<DescuentosAdmin />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </CartProvider>
    </AuthProvider>
  )
}
