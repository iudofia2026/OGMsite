/**
 * Authentication Routes
 * Handles Google OAuth and email signup endpoints
 */

const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

// Google OAuth callback route
router.get('/google/callback', authController.googleCallback);

// Email signup route
router.post('/signup', authController.emailSignup);

// OAuth configuration route
router.get('/config', authController.getOAuthConfig);

module.exports = router;
