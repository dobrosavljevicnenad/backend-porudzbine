const mongoose = require('mongoose');

const withdrawalSchema = new mongoose.Schema({
  company: { type: String, required: true },
  date: { type: String, required: true },
  amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Withdrawal', withdrawalSchema);
