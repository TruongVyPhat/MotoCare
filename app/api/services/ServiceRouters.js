const express = require('express');
const router = express.Router();
const service_Controller = require('./ServiceControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all services
 * URL: /api/service?page=
 */
router.get('/', service_Controller.get_all_services);

// GET service
router.get('/:id', service_Controller.get_service);

// CREATE products
router.post('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), service_Controller.create_service);

// UPDATE products
router.put('/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), service_Controller.update_service);

// DELETE product
router.delete('/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), service_Controller.delete_service);

module.exports = router;