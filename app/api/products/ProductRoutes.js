const express = require('express');
const router = express.Router();
const product_Controller = require('./ProductControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

/**
 * GET list all products
 * URL: /api/products?page=
 */
router.get('/', product_Controller.get_all_products);

router.get('/data-search', product_Controller.get_data_for_search);

// FIND products
router.get('/search', product_Controller.search_products);

// filter products by category_id and brand_id
router.get('/filter', product_Controller.filter_products);

// GET products
router.get('/:id', product_Controller.get_product);

// CREATE products
router.post('/create', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), product_Controller.create_product);

// UPDATE products
router.put('/update', /*auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]),*/ product_Controller.update_product);

// UPDATE product amount
router.put('/update-amount', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN, ROLE.STAFF]), product_Controller.update_product_amount);

// DELETE product
router.delete('/delete/:id', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), product_Controller.delete_product);

module.exports = router;