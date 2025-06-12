const express       = require('express');
const router        = express.Router();
const path          = require('path');
const multer        = require('multer');
const Registration  = require('../models/Registration');

// ─── Multer storage configuration ─────────────────────────────────────────────
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // ensure this folder exists
  },
  filename: (req, file, cb) => {
    const timestamp = Date.now();
    const ext       = path.extname(file.originalname);
    cb(null, `${timestamp}${ext}`);
  }
});

// ─── Upload middleware ────────────────────────────────────────────────────────
const upload = multer({ storage });

// ─── Registration POST /api/register ──────────────────────────────────────────
router.post(
  '/register',
  upload.single('image'),
  async (req, res) => {
    try {
      const {
        firstName,
        lastName,
        age,
        email,
        heightFeet,
        heightCm,
        skintype,
        gender,
        about
      } = req.body;

      // Combine feet/cm into one string
      let height = '';
      if (heightFeet) height = `${heightFeet} ft`;
      else if (heightCm) height = `${heightCm} cm`;

      // Grab uploaded filename
      const imageUrl = req.file ? req.file.filename : null;

      // Save to MongoDB
      const newRegistration = new Registration({
        firstName,
        lastName,
        age,
        email,
        height,
        skintype,
        gender,
        about,
        imageUrl
      });

      await newRegistration.save();
      res.status(201).json({ message: 'Registration successful' });
    } catch (err) {
      console.error('Error in registration:', err);
      res.status(500).json({ message: 'Server error' });
    }
  }
);

module.exports = router;
