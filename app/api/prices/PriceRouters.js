const express = require('express');
const router = express.Router();
const price_Controller = require('./PriceControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all products
 * URL: /api/products?page=
 */
router.get('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), price_Controller.get_all_prices);

// get price by product_id
router.get('/get-by-product', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), price_Controller.get_price_by_productId);

// UPDATE products
router.put('/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), price_Controller.update_price);

module.exports = router;