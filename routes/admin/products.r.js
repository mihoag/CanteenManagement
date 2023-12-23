const express = require("express");
const router = express.Router();
const productsController = require('../../controllers/adminController/productsController')

router.get('/products', productsController.showProducts)
module.exports = router;