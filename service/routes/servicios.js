const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener historial de servicios (Bautizos y Santas Cenas) con datos relacionados
// Esto requiere auth porque es el portal administrativo
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        s.id, s.tipo, s.fecha, s.hombres, s.mujeres,
        (s.hombres + s.mujeres) as total,
        c.nombre as sala_oracion,
        a.nombre + ' ' + a.apellidos as anciano
      FROM Servicios s
      LEFT JOIN SalasOracion c ON s.sala_id = c.id
      LEFT JOIN Ancianos a ON s.anciano_id = a.id
      ORDER BY s.fecha DESC
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Obtener conteos para el mapa (Público)
router.get('/totales-por-sala', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query(`
      SELECT 
        c.id as sala_id,
        c.nombre as sala_nombre,
        s.tipo,
        SUM(s.hombres) as hombres,
        SUM(s.mujeres) as mujeres
      FROM SalasOracion c
      LEFT JOIN Servicios s ON c.id = s.sala_id
      GROUP BY c.id, c.nombre, s.tipo
    `);
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Registrar un servicio (Público, no requiere auth porque lo llenan los ancianos desde el form público)
router.post('/', async (req, res) => {
  try {
    const { tipo, fecha, hombres, mujeres, anciano_id, sala_id } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('tipo', sql.VarChar, tipo)
      .input('fecha', sql.Date, fecha)
      .input('hombres', sql.Int, hombres || 0)
      .input('mujeres', sql.Int, mujeres || 0)
      .input('anciano_id', sql.Int, anciano_id)
      .input('sala_id', sql.Int, sala_id)
      .query(`
        INSERT INTO Servicios (tipo, fecha, hombres, mujeres, anciano_id, sala_id) 
        VALUES (@tipo, @fecha, @hombres, @mujeres, @anciano_id, @sala_id)
      `);
    res.status(201).json({ message: 'Servicio registrado exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar un servicio (Requiere auth)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Servicios WHERE id = @id');
    res.json({ message: 'Servicio eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
