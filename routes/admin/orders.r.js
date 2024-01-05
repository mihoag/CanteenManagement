const express = require("express");
const router = express.Router();
const ordersController = require('../../controllers/adminController/ordersController')

router.get('/paging', ordersController.page);
router.get('/', ordersController.showOrders);
router.post('/add', ordersController.addOrder);
router.post('/update', ordersController.updatePayment);

module.exports = router;