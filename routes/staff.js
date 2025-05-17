// routes/staff.js
const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Staff = require('../models/staff');
const router = express.Router();

// Admin creates staff

router.post('/create-staff', async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Username, email, and password are required.' });
    }

    const existingUser = await Staff.findOne({ $or: [{ username }, { email }] });
    if (existingUser) {
      return res.status(400).json({ msg: 'Username or email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const staff = new Staff({ email, username, password: hashedPassword, role: 'staff' });
    await staff.save();

    res.status(201).json({ msg: 'Staff created successfully', staff: {
      id: staff._id,
      username: staff.username,
      email: staff.email
    }});
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});



// POST /api/auth/login
router.post('/login-staff', async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ msg: 'Username and password are required.' });
    }

    const user = await Staff.findOne({ email});
    if (!user) return res.status(401).json({ msg: 'Invalid credentials' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });

    
    res.status(200).json({
      
      msg: 'Login successful',
      user: {id: user._id, username: user.username, email: user.email}
      
    });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});


module.exports = router;

