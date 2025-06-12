const express = require('express');
const router = express.Router();
const Registration = require('../models/Registration');

router.post('/register', async (req, res) => {
  try {
    const registration = new Registration(req.body);
    await registration.save();
    res.status(201).json({ message: 'Registration successful' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
