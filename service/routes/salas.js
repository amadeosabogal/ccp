const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las salas (Público, no requiere auth para el mapa)
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM SalasOracion ORDER BY nombre ASC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una sala (Requiere auth)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre, ubicacion, lat, lng } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('ubicacion', sql.VarChar, ubicacion)
      .input('lat', sql.Decimal(10, 7), lat)
      .input('lng', sql.Decimal(10, 7), lng)
      .query(`
        INSERT INTO SalasOracion (nombre, ubicacion, lat, lng) 
        VALUES (@nombre, @ubicacion, @lat, @lng)
      `);
    res.status(201).json({ message: 'Sala creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar sala (Requiere auth)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM SalasOracion WHERE id = @id');
    res.json({ message: 'Sala eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
