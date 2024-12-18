const TonWeb = require('tonweb');
const Transaction = require('../models/transaction');

const tonweb = new TonWeb(new TonWeb.HttpProvider("https://toncenter.com/api/v2/jsonRPC", {
  apiKey: "df887db291e605e45683a7b489c64bff9c4538519cb07cb8ac72e963eca1bcbb"
}));

const contractAddress = "EQB9SktUHyZdb9y8maBaWrAtkIzJTJYq4NIilRhnMEfiXxac";

const fetchAndSaveTransactions = async () => {
  try {
    const contractAddressHex = new TonWeb.Address(contractAddress).toString(true, true, true);
    const txList = await tonweb.provider.getTransactions(contractAddressHex);

    for (const tx of txList) {
      const sender = tx.in_msg.source;
      const valueInTon = tx.in_msg.value / 1e9; // Convertir de nanoTON a TON
      const transactionHash = tx.transaction_id.hash;
      const transactionDate = tx.transaction_id.timestamp ? new Date(tx.transaction_id.timestamp * 1000) : new Date();

      const exists = await Transaction.findOne({ transactionHash });

      if (!exists) {
        const newTransaction = new Transaction({
          contractAddress,
          userAddress: sender,
          amountTon: valueInTon,
          transactionHash,
          date: transactionDate,
        });

        await newTransaction.save();
        console.log(`Transacción guardada: ${transactionHash}`);
      } else {
        console.log(`Transacción ya existe: ${transactionHash}`);
      }
    }
  } catch (error) {
    console.error("Error al obtener o guardar las transacciones:", error);
  }
};

module.exports = fetchAndSaveTransactions;
