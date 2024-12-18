const mongoose = require('mongoose');
const cron = require('node-cron');
const fetchAndSaveTransactions = require('./services/tonService')

// Conectar a MongoDB
mongoose.connect("mongodb://localhost:27017/tonTransactions", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Conectado a MongoDB"))
  .catch((err) => console.log("Error al conectar con MongoDB:", err));

// Configurar cron job para ejecutar la consulta cada 5 minutos
cron.schedule('*/5 * * * *', () => {
  console.log("Ejecutando cron job para obtener transacciones...");
  fetchAndSaveTransactions();
});

// Iniciar servidor (aunque no sea necesario para esta funcionalidad)
const express = require('express');
const app = express();
const port = 5000;

app.listen(port, () => {
  console.log(`Servidor backend escuchando en http://localhost:${port}`);
});
