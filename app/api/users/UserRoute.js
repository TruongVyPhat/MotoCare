const express = require('express');
const router = express.Router();
const users_Controller = require('./UsersController');
const auth_controller = require('../auth/AuthController');
const ROLE = require('../helpers/constants').ROLE;
//const permission = require('../').user_permission;

// GET list all users.
// URL: /api/users?page=
// router.get('/', users_Controller.get_all_users);

// // FIND user
// router.get('/search', users_Controller.search_users);

// // GET my profile
router.get('/me', auth_controller.isAuthenticated, users_Controller.get_me);

// // GET user
router.get('/:id', users_Controller.get_user);

module.exports = router;
