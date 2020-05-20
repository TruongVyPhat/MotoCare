const express = require('express');
const router = express.Router();
const auth_controller = require('../auth/AuthController');

// Login
router.post('/login', auth_controller.login);

//Logout
router.post('/logout', auth_controller.isAuthenticated, auth_controller.logout);

module.exports = router;