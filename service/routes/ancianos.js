const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener ancianos
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM Ancianos ORDER BY nombre ASC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear anciano
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { nombre, apellidos } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('nombre', sql.VarChar, nombre)
      .input('apellidos', sql.VarChar, apellidos)
      .query(`
        INSERT INTO Ancianos (nombre, apellidos) 
        VALUES (@nombre, @apellidos)
      `);
    res.status(201).json({ message: 'Anciano creado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Editar anciano
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, apellidos } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .input('nombre', sql.VarChar, nombre)
      .input('apellidos', sql.VarChar, apellidos)
      .query(`
        UPDATE Ancianos 
        SET nombre = @nombre, apellidos = @apellidos 
        WHERE id = @id
      `);
    res.json({ message: 'Anciano actualizado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar anciano
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.Int, id)
      .query('DELETE FROM Ancianos WHERE id = @id');
    res.json({ message: 'Anciano eliminado' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
