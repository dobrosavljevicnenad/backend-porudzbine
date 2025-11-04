const mongoose = require('mongoose');

const stockSchema = new mongoose.Schema({
  availableBoards: { type: Number, required: true, default: 0 },
  updatedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Stock', stockSchema);
