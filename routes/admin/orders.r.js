const express = require("express");
const router = express.Router();
const ordersController = require('../../controllers/adminController/ordersController')

router.get('/orders', ordersController.showOrders)
module.exports = router;