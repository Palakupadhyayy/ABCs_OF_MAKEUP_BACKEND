const express    = require('express');
const router     = express.Router();
const Contact    = require('../models/Contact');

// POST /api/contact
router.post('/contact', async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(201).json({ message: 'Contact saved' });
  } catch (err) {
    console.error('Error saving contact:', err);
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
