const express = require('express');
const router = express.Router();
const bill_Controller = require('./BillControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

router.get('/', auth_Controller.isAuthenticated, bill_Controller.get_all_bills);

router.post('/payment', auth_Controller.isAuthenticated, bill_Controller.create_bill);

module.exports = router;