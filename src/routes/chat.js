// routes/chat.js
const express = require('express');
const router = express.Router();
const OpenAI = require('openai'); // npm i openai
// OPTIONAL: import rate-limiter (express-rate-limit) to avoid abuse
// const rateLimit = require('express-rate-limit');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Primer prostog rate limiter-a (preporučujem)
// const limiter = rateLimit({ windowMs: 60*1000, max: 20 }); // 20 requests/min
// router.use(limiter);

// POST /api/chat
// body: { messages: [{role: "user", content: "..."}, ...] } - isto kao OpenAI chat format
router.post('/', async (req, res) => {
  try {
    const { messages } = req.body;
    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ error: 'Neispravan body: očekujem messages array' });
    }

    // Simple safety/size checks
    if (messages.length > 30) return res.status(400).json({ error: 'Previše poruka u zahtevu' });

    // Poziv OpenAI API-ja
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages,
      max_tokens: 800,   // kontrola troškova/tokens
      temperature: 0.2
    });

    // Vraćamo OpenAI odgovor klijentu
    // struktura zavisi od SDK verzije: prilagodi ako tvoj SDK vraća drugačije
    const assistantMessage = response.choices?.[0]?.message ?? null;
    res.json({ ok: true, assistant: assistantMessage, raw: response });
  } catch (err) {
    console.error('OpenAI error:', err);
    res.status(500).json({ error: 'Greška prilikom poziva AI servisa' });
  }
});

module.exports = router;
