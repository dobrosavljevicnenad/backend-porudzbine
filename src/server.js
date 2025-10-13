const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const morgan = require('morgan');
require('dotenv').config();

const ordersRouter = require('./routes/orders');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
app.use('/api/orders', ordersRouter);

// Default route
app.get('/', (req, res) => {
  res.json({ ok: true, message: 'Maske backend radi ✅' });
});

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('✅ Povezano na MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server radi na portu ${PORT}`));
  })
  .catch(err => console.error('❌ Greška prilikom povezivanja na MongoDB:', err));
