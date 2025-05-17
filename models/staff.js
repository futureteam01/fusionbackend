const mongoose = require('mongoose');

const staffSchema = new mongoose.Schema({
  email: {type: String, required: true, unique: true },
  username: { type: String, required: true, },
  password: { type: String, required: true },
  role:     { type: String, default: 'staff' }
  
});

module.exports = mongoose.model('Staff', staffSchema);
