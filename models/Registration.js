const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age: Number,
  email: String,
  height: Number,
  skintype: String,
  imageUrl: String,
  gender: String,
  about: String,
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
