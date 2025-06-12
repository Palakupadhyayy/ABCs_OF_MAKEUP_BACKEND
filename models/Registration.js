const mongoose = require('mongoose');

const registrationSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  age:       Number,
  email:     String,
  height:    String,  // e.g. "5.7 ft" or "170 cm"
  skintype:  String,
  gender:    String,
  about:     String,
  imageUrl:  String   // stored filename
}, { timestamps: true });

module.exports = mongoose.model('Registration', registrationSchema);
