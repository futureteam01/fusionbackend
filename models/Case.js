const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  clientName: String,
  caseDate: Date,
  summary: String,
  status: { type: String, enum: ['Completed', 'Pending', 'Further Action'], default: 'Pending' },
  
});

module.exports = mongoose.model('Case', CaseSchema);
