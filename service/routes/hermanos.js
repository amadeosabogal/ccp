const express = require('express');
const router = express.Router();
const { poolPromise } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Los datos de los hermanos (nombre y domicilio) no son publicos:
// solo los pueden leer usuarios del modulo "relatorios" o el super administrador.
const requireRelatorios = (req, res, next) => {
  const rol = req.user?.rol || '';
  const roles = rol.split(',').map(r => r.trim());
  if (rol === 'super' || roles.includes('relatorios')) return next();
  return res.status(403).json({ error: 'No tienes acceso a los datos de los hermanos.' });
};

// Listar hermanos con su ubicacion (Requiere auth + rol)
router.get('/', authMiddleware, requireRelatorios, async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT id, nombre, categoria, bautizado, testimoniado, familia,
             direccion, lat, lng, ubicacionAproximada
      FROM HermanosMapa
      ORDER BY familia ASC, orden ASC, id ASC
    `);
    res.set('Cache-Control', 'no-store');
    res.json(result.recordset);
  } catch (error) {
    console.error('Error al listar hermanos:', error);
    res.status(500).json({ error: 'Error al obtener los hermanos.' });
  }
});

module.exports = router;
