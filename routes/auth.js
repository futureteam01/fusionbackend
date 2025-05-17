const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();

// Initial admin signup (one-time use)
router.post('/register', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ msg: 'Username, email, and password are required.' });
    }

    // Check if an admin with this email already exists
    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ msg: 'Admin already exists with this email' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      username,
      email,
      password: hashedPassword,
      
    });

    await user.save();
    res.status(201).json({ msg: 'Admin registered successfully' });
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

  
  // Login
  
router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Ensure both fields are provided
    if (!email || !password) {
      return res.status(400).json({ msg: 'Email and password are required.' });
    }

    // Look for a user with the given email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ msg: 'Invalid email or password.' });
    }

    // Compare the entered password with the hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: 'Invalid email or password.' });
    }

    // Successful login
    res.status(200).json({
      msg: 'Login successful',
      user: {
        username: user.username,
        email: user.email,
        
      }
    });
  } catch (err) {
    console.error('Login error:', err);
    res.status(500).json({ msg: 'Server error. Please try again.' });
  }
});

module.exports = router;

  
  