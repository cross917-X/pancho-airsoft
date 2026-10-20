const express = require('express');
const cors = require('cors');
const crypto = require('crypto');
const db = require('./db');

const app = express();
app.use(cors());
app.use(express.json());

// Genera código hex de 10 caracteres
function generarCodigoHex() {
  return crypto.randomBytes(5).toString('hex').toUpperCase();
}

// GET productos
app.get('/api/productos', (req, res) => {
  const query = 'SELECT * FROM productos';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los productos' });
    }
    res.json(results);
  });
});

// GET usuarios (admin)
app.get('/api/usuarios', (req, res) => {
  const query =
    'SELECT codigo_hex, nombre, apellidos, email, rut, comuna, region, tipo_usuario, estado FROM usuarios';
  db.query(query, (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error al obtener los usuarios' });
    }
    res.json(results);
  });
});

// POST registro de usuario
app.post('/api/usuarios', (req, res) => {
  const {
    nombre,
    apellidos,
    email,
    password,
    rut,
    direccion,
    comuna,
    region,
    fecha_nacimiento,
    tipo_usuario,
  } = req.body;

  if (!nombre || !apellidos || !email || !password || !rut || !direccion) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  const codigo_hex = generarCodigoHex();
  const tipo = tipo_usuario || 'Cliente';

  const query = `
    INSERT INTO usuarios
    (codigo_hex, nombre, apellidos, email, password, rut, direccion, comuna, region, fecha_nacimiento, estado, tipo_usuario)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, 'activa', ?)
  `;

  const values = [
    codigo_hex,
    nombre,
    apellidos,
    email,
    password,
    rut,
    direccion,
    comuna || null,
    region || null,
    fecha_nacimiento || null,
    tipo,
  ];

  db.query(query, values, (err, result) => {
    if (err) {
      console.error(err);
      // Duplicado de email/rut/hex
      if (err.code === 'ER_DUP_ENTRY') {
        return res.status(409).json({ error: 'El email, RUT o código ya existe' });
      }
      return res
        .status(500)
        .json({ error: 'Error al registrar el usuario en la base de datos' });
    }

    res.status(201).json({
      message: 'Usuario registrado exitosamente',
      codigo_hex,
      email,
    });
  });
});

// POST login
app.post('/api/login', (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email y contraseña son obligatorios' });
  }

  const query = 'SELECT * FROM usuarios WHERE email = ? LIMIT 1';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error(err);
      return res.status(500).json({ error: 'Error en el login' });
    }

    if (!results.length) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    const user = results[0];

    if (user.estado === 'eliminada' || user.estado === 'eliminado') {
      return res.status(403).json({ error: 'Esta cuenta fue eliminada' });
    }

    // Comparación simple (como la tenían). Luego se puede hashear.
    if (String(user.password) !== String(password)) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Actualizar actividad si existen esas columnas (si fallan, no rompe el login)
    db.query(
      "UPDATE usuarios SET estado = 'en_linea', ultimo_acceso = NOW(), ultima_actividad = NOW() WHERE codigo_hex = ?",
      [user.codigo_hex],
      () => {}
    );

    const isAdmin =
      user.tipo_usuario === 'Administrador' ||
      ['cristian.alad@gmail.com', 'ariel.prad@gmail.com'].includes(
        String(user.email).toLowerCase()
      );

    res.json({
      message: 'Login exitoso',
      usuario: {
        codigo_hex: user.codigo_hex,
        email: user.email,
        nombre: user.nombre,
        apellidos: user.apellidos,
        tipo_usuario: user.tipo_usuario,
        isAdmin,
      },
    });
  });
});

const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Servidor backend corriendo en http://localhost:${PORT}`);
});
