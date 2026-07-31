const express = require('express');
const router = express.Router();
const journalData = require('../data/journalData');

// GET /api/journal/info - Basic info & anniversary date
router.get('/journal/info', (req, res) => {
  res.json({ success: true, data: journalData.info });
});

// GET /api/timeline - Timeline memories
router.get('/timeline', (req, res) => {
  res.json({ success: true, data: journalData.timeline });
});

// GET /api/gallery - Photo gallery items
router.get('/gallery', (req, res) => {
  res.json({ success: true, data: journalData.gallery });
});

// GET /api/reasons - Reasons I love you list
router.get('/reasons', (req, res) => {
  res.json({ success: true, data: journalData.reasons });
});

// GET /api/quiz - Quiz questions
router.get('/quiz', (req, res) => {
  res.json({ success: true, data: journalData.quiz });
});

// POST /api/quiz/submit - Record score
router.post('/quiz/submit', (req, res) => {
  const { score, total } = req.body;
  res.json({
    success: true,
    message: score === total ? "Soulmate Perfect Score!" : "Wonderful Effort!",
    score,
    total
  });
});

function getFormattedCurrentDate() {
  const now = new Date();
  const month = now.toLocaleString('en-US', { month: 'long' });
  const day = now.getDate();
  const year = now.getFullYear();
  const suffix = (day === 1 || day === 21 || day === 31) ? 'st' :
                 (day === 2 || day === 22) ? 'nd' :
                 (day === 3 || day === 23) ? 'rd' : 'th';
  return `${month} ${day}${suffix}, ${year}`;
}

// POST /api/surprise/unlock - Passcode verification for secret letter
router.post('/surprise/unlock', (req, res) => {
  const { key } = req.body;
  if (!key || !String(key).trim()) {
    return res.status(400).json({ success: false, message: "Please enter a passcode!" });
  }

  const dynamicLetter = {
    ...journalData.surprise.letter,
    date: getFormattedCurrentDate()
  };

  res.json({
    success: true,
    data: dynamicLetter
  });
});

module.exports = router;
