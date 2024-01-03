const express = require("express");
const router = express.Router();
const customersController = require('../../controllers/adminController/customersController');

router.post('/seachCus', customersController.seachCus);
router.get('/', customersController.showCustomers)

module.exports = router;