const express = require('express');
const router = express.Router();
const users_Controller = require('./UserControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all users
 * URL: /api/users?page=
 */
router.get('/', users_Controller.get_all_users);

// FIND user
router.get('/search', users_Controller.search_users);

// GET my profile
router.get('/me', auth_Controller.isAuthenticated, users_Controller.get_me);

// GET user
router.get('/:id', users_Controller.get_user);

// change password
router.put('/change-password', auth_Controller.isAuthenticated, users_Controller.update_password);

// reset password
router.put('/reset-password', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), users_Controller.reset_password);

/**
 * UPDATE user role
 * URL: /api/users/update-role?id=
 */
router.put('/update-role/:id', /*auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]),*/ users_Controller.update_user_role);

// UPDATE user info
router.put('/update/:id', auth_Controller.isAuthenticated, users_Controller.update_user_info);

// DELETE user
router.delete('/delete/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), users_Controller.delete_user);

// CREATE user
router.post('/create', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), users_Controller.create_user);

module.exports = router;

