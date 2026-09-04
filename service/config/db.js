const sql = require('mssql');
require('dotenv').config();

const config = {
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  server: process.env.DB_SERVER,
  port: parseInt(process.env.DB_PORT || '1433'),
  database: process.env.DB_DATABASE,
  options: {
    encrypt: false, // Set to true if you're on Azure
    trustServerCertificate: true // Set to true for local dev/self-signed certs
  }
};

const poolPromise = new sql.ConnectionPool(config)
  .connect()
  .then(pool => {
    console.log('✅ Conectado a SQL Server (' + process.env.DB_DATABASE + ')');
    return pool;
  })
  .catch(err => {
    console.error('❌ Error de conexión a la base de datos:', err);
    process.exit(1);
  });

module.exports = {
  sql,
  poolPromise
};
