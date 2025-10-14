const express = require('express');
const router = express.Router();
const Order = require('../models/Order');

// Kreiranje nove porudžbine
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();
    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Dohvatanje svih porudžbina
router.get('/', async (req, res) => {
  try {
    const orders = await Order.find().sort({ createdAt: -1 });
    res.json(orders);
  } catch (error) {
    res.status(500).json({ error: 'Greška servera' });
  }
});

// 🔹 Izmena porudžbine po ID-u
router.put('/:id', async (req, res) => {
  try {
    const updated = await Order.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true } // vraća novi dokument i validira unos
    );

    if (!updated) return res.status(404).json({ error: 'Nema takve porudžbine' });
    res.json({ message: 'Porudžbina izmenjena ✅', order: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Brisanje porudžbine po ID-u
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Order.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ error: 'Nema takve porudžbine' });
    res.json({ message: 'Porudžbina obrisana ✅' });
  } catch (error) {
    res.status(400).json({ error: 'Nevažeći ID' });
  }
});

module.exports = router;
