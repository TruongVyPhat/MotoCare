const express = require('express');
const router = express.Router();
const slot_Controller = require('./SlotControllers');
const auth_Controller = require('../auth/AuthControllers');
const ROLE = require('../helpers/constants').ROLE;
const permission = require('../middlewares/permission');

router.get('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), slot_Controller.get_all_slots);

// update amount slot
router.post('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), slot_Controller.create_slot);

router.delete('/', auth_Controller.isAuthenticated, permission.user_permission([ROLE.ADMIN]), slot_Controller.delete_slot);

module.exports = router;