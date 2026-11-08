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
  origin: (origin, callback) => {
    // Permitir solicitudes sin origen (curl, Postman, proxy) o desde cualquier dispositivo en la red local
    if (!origin || 
        origin.includes('localhost') || 
        origin.includes('127.0.0.1') || 
        /^http:\/\/(192\.168|10|172\.(1[6-9]|2\d|3[0-1]))\.\d+\.\d+(:\d+)?$/.test(origin)) {
      return callback(null, true);
    }
    // Permitir cualquier origen en entorno de desarrollo/red
    return callback(null, true);
  },
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
const leyendasRoutes = require('./routes/leyendas');
const ccbRoutes = require('./routes/ccb');

app.use('/api/auth', authRoutes);
app.use('/api/salas', salasRoutes);
app.use('/api/ancianos', ancianosRoutes);
app.use('/api/servicios', serviciosRoutes);
app.use('/api/usuarios', usuariosRoutes);
app.use('/api/leyendas', leyendasRoutes);
app.use('/api/ccb', ccbRoutes);

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: 'API de Congregacion Backend funcionando.' });
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});
