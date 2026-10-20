# Pancho Villa Táctico – React

Tienda de réplicas Airsoft convertida a **React + Vite + JSX**.

## Requisitos

- Node.js 18 o superior
- npm

## Cómo ejecutar

```bash
cd pancho-villa-react
npm install
npm run dev
```

Abre la URL que muestra Vite (normalmente `http://localhost:5173`).

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo |
| `npm run build` | Build de producción en `dist/` |
| `npm run preview` | Previsualizar el build |

## Estructura

```
src/
  components/     Header, Footer, ProductCard, Layout, AdminLayout
  context/        CartContext, AuthContext
  data/           productos.js (catálogo + regiones)
  pages/          páginas de la tienda
  pages/admin/    panel de administración
  utils/          validaciones (RUT, email, precio)
  App.jsx         rutas (React Router)
  main.jsx        entrada
  index.css       estilos (mismo diseño que la versión HTML)
public/img/       imágenes de productos
```

## Funcionalidad

- Catálogo y detalle de productos
- Carrito con `localStorage`
- Login / registro con validaciones Duoc
- Admin (solo con correos admin)
- Blog, nosotros, contacto

### Cuentas administrador

- `Cristian.ALAD@gmail.com`
- `Ariel.PrAD@gmail.com`

Contraseña: cualquier texto de 4 a 10 caracteres (simulado).

## Notas

- No hay backend ni base de datos: productos, login y guardados del admin están **simulados**.
- Las validaciones de formularios son client-side en JSX.
- El diseño reutiliza el CSS original de Pancho Villa Táctico.
