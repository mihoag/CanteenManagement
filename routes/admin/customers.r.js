const express = require("express");
const router = express.Router();
const customersController = require('../../controllers/adminController/customersController');

router.get('/customers', customersController.showCustomers)
module.exports = router;