const mongoose = require('mongoose');

// Crear el modelo de transacciones
const transactionSchema = new mongoose.Schema({
    contractAddress: String,
    userAddress: String,
    amountTon: Number,
    transactionHash: { type: String, unique: true }, // Aseguramos unicidad en el hash
    date: { type: Date, required: true }, // Fecha obligatoria
  });
  
const Transaction = mongoose.model("Transaction", transactionSchema);

module.exports = Transaction;  