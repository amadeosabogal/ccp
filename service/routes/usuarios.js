const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Middleware que verifica que el rol sea 'super'
const superOnly = (req, res, next) => {
  if (req.user?.rol !== 'super') {
    return res.status(403).json({ error: 'Acceso denegado. Solo para super administradores.' });
  }
  next();
};

// Obtener todos los usuarios (sin devolver el password)
router.get('/', authMiddleware, superOnly, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request()
      .query('SELECT id, nombre, usuario, rol, fecha_creacion FROM Usuarios ORDER BY fecha_creacion DESC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear un nuevo usuario
router.post('/', authMiddleware, superOnly, async (req, res) => {
  try {
    const { nombre, usuario, password, modulos } = req.body;

    // modulos es un array: ['servicios'], ['relatorios'], o ['servicios','relatorios']
    if (!nombre || !usuario || !password || !modulos || modulos.length === 0) {
      return res.status(400).json({ error: 'Todos los campos son requeridos' });
    }

    // Solo se pueden asignar módulos servicios o relatorios (no super)
    const modulosValidos = ['servicios', 'relatorios'];
    const invalidos = modulos.filter((m) => !modulosValidos.includes(m));
    if (invalidos.length > 0) {
      return res.status(403).json({ error: 'Módulo no permitido' });
    }

    const rol = modulos.join(','); // 'servicios' o 'relatorios' o 'servicios,relatorios'

    const pool = await poolPromise;

    // Verificar que el usuario no exista ya
    const existing = await pool.request()
      .input('usuario', sql.VarChar, usuario)
      .query('SELECT id FROM Usuarios WHERE usuario = @usuario');

    if (existing.recordset.length > 0) {
      return res.status(409).json({ error: 'El nombre de usuario ya existe' });
    }

    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('usuario', sql.VarChar, usuario)
      .input('password', sql.VarChar, password)
      .input('rol', sql.VarChar, rol)
      .query('INSERT INTO Usuarios (nombre, usuario, password, rol) VALUES (@nombre, @usuario, @password, @rol)');

    res.status(201).json({ message: 'Usuario creado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un usuario (no puede eliminarse a sí mismo ni a otros super)
router.delete('/:id', authMiddleware, superOnly, async (req, res) => {
  try {
    const { id } = req.params;

    // Verificar que no se elimina a un super
    const pool = await poolPromise;
    const check = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT rol FROM Usuarios WHERE id = @id');

    if (!check.recordset[0]) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (check.recordset[0].rol === 'super') {
      return res.status(403).json({ error: 'No se puede eliminar un super administrador' });
    }

    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Usuarios WHERE id = @id');

    res.json({ message: 'Usuario eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Cambiar contraseña de un usuario (solo super admin)
router.put('/:id/password', authMiddleware, superOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { password } = req.body;

    if (!password || password.length < 6) {
      return res.status(400).json({ error: 'La nueva contraseña debe tener al menos 6 caracteres' });
    }

    const pool = await poolPromise;
    
    // Verificar que el usuario exista
    const check = await pool.request()
      .input('id', sql.Int, id)
      .query('SELECT id, rol FROM Usuarios WHERE id = @id');

    if (!check.recordset[0]) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    if (check.recordset[0].rol === 'super') {
      return res.status(403).json({ error: 'No se puede cambiar la contraseña de otro super administrador por aquí' });
    }

    await pool.request()
      .input('id', sql.Int, id)
      .input('password', sql.VarChar, password)
      .query('UPDATE Usuarios SET password = @password WHERE id = @id');

    res.json({ message: 'Contraseña actualizada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
