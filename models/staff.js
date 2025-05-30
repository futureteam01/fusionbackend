const mongoose = require('mongoose');


const staffSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
}, { timestamps: true });



module.exports = mongoose.model('Staff', staffSchema);
