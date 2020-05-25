const express = require('express');
const router = express.Router();
const auth_controller = require('./AuthControllers');

// Login
router.post('/login', auth_controller.login);

//Logout
router.delete('/logout', auth_controller.isAuthenticated, auth_controller.logout);

module.exports = router;