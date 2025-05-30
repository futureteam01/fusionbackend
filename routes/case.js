const express = require('express');
const Case = require('../models/Case');

const router = express.Router();

// Create a Case
router.post('/create', async (req, res) => {
  try {
    const { title, status, summary, userId } = req.body;

    if (!userId) return res.status(400).json({ message: 'userId required' });

    const newCase = await Case.create({ title, status, summary, user: userId });
    res.status(201).json({ message: 'Case created successfully', case: newCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// Get all cases for a specific user
router.get('/case/:userId', async (req, res) => {
  try {
    const userId = req.params.userId;

    const userCases = await Case.find({ user: userId });

    res.status(200).json(userCases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.put('/edit/:id', async (req, res) => {
  try {
    const { title, status, summary, userId } = req.body;
    const existingCase = await Case.findById(req.params.id);

    if (!existingCase) return res.status(404).json({ message: 'Case not found' });
    if (existingCase.user.toString() !== userId) return res.status(403).json({ message: 'Not authorized' });

    const updated = await Case.findByIdAndUpdate(req.params.id, { title, status, summary }, { new: true });
    res.status(200).json({ message: 'Case updated', case: updated });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


// Get All Cases
router.get('/all-cases', async (req, res) => {
  try {
    const cases = await Case.find();
    res.status(200).json(cases);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Edit a Case
router.put('/edit/:id', async (req, res) => {
  try {
    const { title, status, summary } = req.body;

    const updatedCase = await Case.findByIdAndUpdate(
      req.params.id,
      { title, status, summary },
      { new: true }
    );

    if (!updatedCase) return res.status(404).json({ message: 'Case not found' });

    res.status(200).json({ message: 'Case updated', case: updatedCase });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Delete a Case
router.delete('/delete/:id', async (req, res) => {
  try {
    const deletedCase = await Case.findByIdAndDelete(req.params.id);
    if (!deletedCase) return res.status(404).json({ message: 'Case not found' });

    res.status(200).json({ message: 'Case deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
