// models/Case.js
const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  status: {
    type: String,
    enum: ['open', 'closed', 'further action'],
    default: 'open'
  },
  createdBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
}, { timestamps: true });

module.exports = mongoose.model('Case', caseSchema);
