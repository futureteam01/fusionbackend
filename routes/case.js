// routes/cases.js

const express = require('express');
const router = express.Router();
const Case = require('../models/Case');
const { isAuthenticated, isAdmin } = require('../middleware/auth');


router.post('/create-new', isAuthenticated, isAdmin, async (req, res) => {
  console.log('✅ Authenticated as:', req.session.user);

  const { title, summary, status } = req.body;

  try {
    const newCase = new Case({
      title,
      summary,
      status,
      createdBy: req.session.user.id
    });

    await newCase.save();
    res.status(201).json({ message: 'Case created successfully', case: newCase });
  } catch (err) {
    console.error('❌ Error saving case:', err.message);
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});



// Get all cases (admin) or own cases (staff)
router.get('/all-cases', async (req, res) => {
  try {
    const cases = await Case.find().populate('createdBy', 'email');
    res.json(cases);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


// Edit case (admin or owner only)
router.put('/edit:id', async (req, res) => {
  const { title, summary, status } = req.body;
  try {
    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { title, summary, status },
      { new: true }
    ).populate('createdBy', 'email');

    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });
    res.json(updatedCase);
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});

// Delete case (admin or owner only)
router.delete('/delete:id', async (req, res) => {
  try {
    const deleted = await Case.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Case not found' });
    res.json({ message: 'Case deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
  }
});


module.exports = router;
