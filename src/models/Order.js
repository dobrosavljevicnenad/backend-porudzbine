const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  contactPlace: String,
  klimaDimensions: String,
  maskDimensions: String,
  deadline: Date,
  maskModel: String,
  address: String,
  phone: String,
  treatment: { type: String, enum: ['plastifikacija', 'farbanje'], default: 'plastifikacija' },
  shade: String,
  price: Number,
  comment: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Order', orderSchema);
