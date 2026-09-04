const express = require('express');
const router = express.Router();
const { poolPromise, sql } = require('../config/db');
const authMiddleware = require('../middleware/authMiddleware');

// Obtener todas las leyendas
router.get('/', async (req, res) => {
  try {
    const pool = await poolPromise;
    const result = await pool.request().query('SELECT * FROM LeyendasMapa ORDER BY createdAt ASC');
    res.json(result.recordset);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Crear una nueva leyenda (Requiere auth)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { id, name, color } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.VarChar, id)
      .input('name', sql.NVarChar, name)
      .input('color', sql.VarChar, color)
      .query(`
        INSERT INTO LeyendasMapa (id, name, color) 
        VALUES (@id, @name, @color)
      `);
    res.status(201).json({ message: 'Leyenda creada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Actualizar una leyenda (Requiere auth)
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { name, color } = req.body;
    const pool = await poolPromise;
    await pool.request()
      .input('id', sql.VarChar, id)
      .input('name', sql.NVarChar, name)
      .input('color', sql.VarChar, color)
      .query(`
        UPDATE LeyendasMapa 
        SET name = @name, color = @color 
        WHERE id = @id
      `);
    res.json({ message: 'Leyenda actualizada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Eliminar leyenda (Requiere auth)
router.delete('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const pool = await poolPromise;
    
    // Opcional: También podríamos poner NULL en leyendaId de las SalasOracion
    await pool.request()
      .input('id', sql.VarChar, id)
      .query('UPDATE SalasOracion SET leyendaId = NULL WHERE leyendaId = @id');
      
    await pool.request()
      .input('id', sql.VarChar, id)
      .query('DELETE FROM LeyendasMapa WHERE id = @id');
      
    res.json({ message: 'Leyenda eliminada' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
