const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { isAuthenticated, isAdmin } = require('../middleware/auth');

// Create staff
router.post('/create-staff', isAuthenticated, isAdmin, async (req, res) => {
  const { email, password } = req.body;
  const existing = await User.findOne({ email });
  if (existing) return res.status(400).json({ message: 'Email already exists' });
  const staff = new User({ name, email, password, role: 'staff' });
  await staff.save();
  res.status(201).json(staff);
});

// Get all staff
router.get('/all-staff', isAuthenticated, isAdmin, async (req, res) => {
  const staff = await User.find({ role: 'staff' });
  res.json(staff);
});

// Delete staff
router.delete('/staff:id', isAuthenticated, isAdmin, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: 'Staff deleted' });
});

module.exports = router;
