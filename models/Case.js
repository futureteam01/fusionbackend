const mongoose = require('mongoose');

const CaseSchema = new mongoose.Schema({
  clientName: String,
  caseDate: Date,
  summary: String,
  status: { type: String, enum: ['Completed', 'Pending', 'Further Action'], default: 'Pending' },
  // createdBy: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'Staff', // or 'User' or 'Admin' depending on your system
  //   required: true},
  
});

module.exports = mongoose.model('Case', CaseSchema);
