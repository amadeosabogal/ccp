const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const jwt = require('jsonwebtoken');
const rateLimit = require('express-rate-limit');
const authMiddleware = require('../middleware/authMiddleware');

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 10, // Limitar a 10 peticiones por IP
  message: { error: 'Demasiados intentos de inicio de sesión, inténtalo de nuevo después de 15 minutos.' }
});

// Endpoint de login
router.post('/login', loginLimiter, async (req, res) => {
  try {
    const { usuario, password, modulo } = req.body;

    if (!usuario || !password) {
      return res.status(400).json({ error: 'Usuario y contraseña son requeridos' });
    }

    if (!modulo) {
      return res.status(400).json({ error: 'Módulo de acceso no especificado' });
    }

    const pool = await poolPromise;
    const result = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT * FROM Usuarios WHERE usuario = @usuario');

    const user = result.recordset[0];

    if (!user) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Verificar que el usuario tenga acceso al módulo solicitado
    // El campo rol puede contener múltiples módulos separados por coma: 'servicios,relatorios'
    const rolesDelUsuario = user.rol ? user.rol.split(',').map(r => r.trim()) : [];
    if (!rolesDelUsuario.includes(modulo)) {
      return res.status(403).json({ error: `No tienes acceso al módulo de ${modulo}` });
    }

    // Verificar contraseña
    if (user.password !== password) {
      return res.status(401).json({ error: 'Credenciales inválidas' });
    }

    // Generar JWT incluyendo el rol
    const token = jwt.sign(
      { id: user.id, nombre: user.nombre, usuario: user.usuario, rol: user.rol },
      process.env.JWT_SECRET,
      { expiresIn: '8h' }
    );

    // Enviar el token como una cookie HttpOnly
    res.cookie('token', token, {
      httpOnly: true, // No accesible mediante JavaScript en el frontend
      secure: process.env.NODE_ENV === 'production', // Solo HTTPS en producción
      sameSite: 'strict', // Protección CSRF
      maxAge: 8 * 60 * 60 * 1000 // 8 horas
    });

    res.json({
      message: 'Login exitoso',
      user: {
        id: user.id,
        nombre: user.nombre,
        usuario: user.usuario,
        rol: user.rol
      }
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ error: 'Error del servidor' });
  }
});

// Endpoint para validar sesión actual (basada en la cookie)
router.get('/me', authMiddleware, (req, res) => {
  res.json({ user: req.user });
});

// Endpoint de logout (limpiar cookie)
router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Cierre de sesión exitoso' });
});

module.exports = router;
