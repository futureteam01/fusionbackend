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
router.get('/my-cases', async (req, res) => { // Add authentication middleware
  try {
    // Get staff ID from authenticated user instead of query parameter
    const staffId = req.user.id; // Assuming your auth middleware sets req.user
    
    const cases = await Case.find({ createdBy: staffId })
      .sort({ createdAt: -1 }); // Add sorting by date
      
    res.json({ 
      success: true,
      count: cases.length,
      data: cases
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ 
      success: false,
      msg: 'Server Error' 
    });
  }
});
module.exports = router;