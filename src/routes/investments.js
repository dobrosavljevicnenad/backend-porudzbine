const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const Withdrawal = require('../models/Withdrawal');

// 🔹 Dobavi sve investicije
router.get('/', async (req, res) => {
  try {
    const investments = await Investment.find().sort({ date: -1 });
    res.json(investments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 🔹 Dodaj novu investiciju
router.post('/', async (req, res) => {
  try {
    const investment = new Investment(req.body);
    await investment.save();
    res.status(201).json(investment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Dodaj isplatu
router.post('/withdrawal', async (req, res) => {
  try {
    const withdrawal = new Withdrawal(req.body);
    await withdrawal.save();
    res.status(201).json(withdrawal);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// 🔹 Dobavi sve isplate
router.get('/withdrawals', async (req, res) => {
  try {
    const withdrawals = await Withdrawal.find().sort({ date: -1 });
    res.json(withdrawals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
