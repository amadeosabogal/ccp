require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de Seguridad
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Rutas
const authRoutes = require('./routes/auth');
const salasRoutes = require('./routes/salas');
const ancianosRoutes = require('./routes/ancianos');
const serviciosRoutes = require('./routes/servicios');
const usuariosRoutes = require('./routes/usuarios');

app.use('/api/auth', authRoutes);
app.use('/api/salas', salasRoutes);
app.use('/api/ancianos', ancianosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/usuarios', usuariosRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Congregacion Backend funcionando.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
