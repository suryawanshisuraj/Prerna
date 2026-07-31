const express = require('express');
const cors = require('cors');
const apiRoutes = require('./routes/api');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', apiRoutes);

// Health check
app.get('/', (req, res) => {
  res.send('❤️ Digital Love Anniversary Journal API is running.');
});

// Start Server locally if not running on Vercel
if (process.env.NODE_ENV !== 'production' || !process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`✨ Server running on http://localhost:${PORT}`);
  });
}

module.exports = app;
