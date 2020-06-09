const express = require('express');
const router = express.Router();
const brand_Controller = require('./BrandControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all brands
 * URL: /api/brands?page=
 */
router.get('/', brand_Controller.get_all_brands);

// GET brand
router.get('/:id', brand_Controller.get_brand);

// CREATE brand
router.post('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), brand_Controller.create_brand);

// UPDATE brand
router.put('/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), brand_Controller.update_brand);

// DELETE brand
router.delete('/:id', /*auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]),*/ brand_Controller.delete_brand);

module.exports = router;