const mongoose = require('mongoose');

const investmentSchema = new mongoose.Schema({
  company: { type: String, required: true },
  date: { type: String, required: true },
  full_amount: { type: Number, required: true }
}, { timestamps: true });

module.exports = mongoose.model('Investment', investmentSchema);
