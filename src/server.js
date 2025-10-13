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

// Healthcheck route za Fly.io
app.get('/health', (req, res) => res.send('OK'));

// Global error logging
process.on('uncaughtException', err => console.error('❌ Uncaught Exception:', err));
process.on('unhandledRejection', err => console.error('❌ Unhandled Rejection:', err));

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ Povezano na MongoDB'))
  .catch(err => console.error('❌ Greška prilikom povezivanja na MongoDB:', err));


// Pokreni server odmah, Fly voli da vidi proces odmah
app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server radi na portu ${PORT}`);
});
