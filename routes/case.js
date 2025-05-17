// routes/cases.js
const express = require('express');
const Case = require('../models/Case');
// const auth = require('../middleware/auth');
const router = express.Router();

// Staff creates a case
router.post('/create-new', async (req, res) => {
  try {
    const { clientName, caseDate, summary, status } = req.body;

    const normalizedStatus = 
      status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();

    const newCase = new Case({
      clientName,
      caseDate,
      summary,
      status: normalizedStatus,
      
    });
    await newCase.save();
    res.status(201).json({ msg: 'Case created successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// Get all cases by logged-in staff
router.get('/my-cases', async (req, res) => {
  try {
    const { staffId } = req.query;

    if (!staffId) {
      return res.status(400).json({ msg: 'Staff ID is required.' });
    }

    const cases = await Case.find({ createdBy: staffId });
    res.json(cases);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;