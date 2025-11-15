const express = require('express');
const router = express.Router();
const Investment = require('../models/Investment');
const Withdrawal = require('../models/Withdrawal');
const CompanyHistory = require('../models/CompanyHistory');

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

    if(req.body.company){
      const exists = await CompanyHistory.findOne({name: req.body.company});
      if(!exists){
        await new CompanyHistory({name : req.body.company}).save();
      }
    }

    res.status(201).json(investment);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Investment.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Investment not found' });
    }

    res.json({ message: 'Investment deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
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

router.delete('/withdrawal/:id', async (req, res) => {
  try {
    const deleted = await Withdrawal.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ error: 'Withdrawal not found' });
    }

    res.json({ message: 'Withdrawal deleted successfully', id: req.params.id });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/companies', async (req, res) => {
  try {
    const companies = await CompanyHistory.find().sort({ name: 1 }); // sort po abecedi
    res.json(companies);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
