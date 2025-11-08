const express = require('express');
const router = express.Router();
const Order = require('../models/Order');
const Stock = require('../models/Stock');

// 🔹 Dobavi trenutno stanje tabli (lager)
router.get('/stock', async (req, res) => {
  try {
    let stock = await Stock.findOne();

    // Ako ne postoji zapis, napravi novi sa početnim stanjem
    if (!stock) {
      stock = new Stock({ availableBoards: 40 });
      await stock.save();
    }

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Greška pri čitanju stanja' });
  }
});

// 🔹 Ažuriraj broj tabli (npr. kada admin promeni stanje ručno)
router.put('/stock', async (req, res) => {
  try {
    const { availableBoards } = req.body;

    if (availableBoards == null || isNaN(availableBoards)) {
      return res.status(400).json({ error: 'Neispravno prosleđen broj tabli' });
    }

    let stock = await Stock.findOne();
    if (!stock) {
      stock = new Stock({ availableBoards });
    } else {
      stock.availableBoards = availableBoards;
      stock.updatedAt = new Date();
    }

    await stock.save();
    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: 'Greška pri ažuriranju stanja' });
  }
});

// 🔹 Kreiranje nove porudžbine
router.post('/', async (req, res) => {
  try {
    const order = new Order(req.body);
    await order.save();

    // Smanji stanje u lageru nakon svake nove porudžbine
    const stock = await Stock.findOne();
    const quantity = Number(order.quantity) || 0;

    if (stock && !isNaN(quantity)) {
      stock.availableBoards = Math.max(0, stock.availableBoards - quantity);
      stock.updatedAt = new Date();
      await stock.save();
    }

    res.status(201).json(order);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Dohvatanje svih porudžbina
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
      { new: true, runValidators: true }
    );

    if (!updated) return res.status(404).json({ error: 'Nema takve porudžbine' });
    res.json({ message: 'Porudžbina izmenjena ✅', order: updated });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// 🔹 Brisanje porudžbine po ID-u
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
