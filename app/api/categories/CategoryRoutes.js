const express = require('express');
const router = express.Router();
const category_Controller = require('./CategoryControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all categories
 * URL: /api/categories?page=
 */
router.get('/', category_Controller.get_all_categories);

router.get('/:id', category_Controller.get_category);

router.post('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), category_Controller.create_category);

router.put('/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), category_Controller.update_category);

router.delete('/id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), category_Controller.delete_category);

module.exports = router;
