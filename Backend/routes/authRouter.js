const express = require('express');
const { body } = require('express-validator');
const { createUser, loginUser, getUser } = require('../controller/authController');
const fetchuser = require('../middleware/fetchuser');
const router = express.Router();

// Login route - JWT based
router.post('/login', [
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password cannot be blank').exists(),
], loginUser);

// Check authentication status
router.get('/status', fetchuser, (req, res) => {
  res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
  res.setHeader('Pragma', 'no-cache');
  res.setHeader('Expires', '0');
  res.setHeader('Surrogate-Control', 'no-store');

  try {
    res.setHeader('Content-Type', 'application/json');
    res.json({ authenticated: true, user: req.user });
  } catch (error) {
    console.error('Error in status route:', error);
    res.status(500).json({ error: 'Server error' });
  }
});

// Route to check API status
router.get('/api/status', (req, res) => {
  res.json({ status: 'success', message: 'API is working correctly.' });
});

// Route to check if user is authenticated
router.get('/api/check-auth', fetchuser, (req, res) => {
  res.json({ authenticated: true, user: req.user });
});

// User creation route
router.post('/createuser', [
  body('name', 'Enter a valid name').isLength({ min: 3 }),
  body('email', 'Enter a valid email').isEmail(),
  body('password', 'Password must be at least 5 characters').isLength({ min: 5 }),
], createUser);

// Home route - requires authentication
router.get('/home', fetchuser, (req, res) => {
  res.render('home');
});

// Get user route - requires authentication
router.get('/getuser', fetchuser, getUser);

router.post('/logout', (req, res) => {
  res.clearCookie('token');
  res.json({ message: 'Logged out successfully' });
});

module.exports = router;
