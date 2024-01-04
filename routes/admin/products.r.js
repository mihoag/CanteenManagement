const express = require("express");
const router = express.Router();
const productsController = require('../../controllers/adminController/productsController')

router.get('/', productsController.showProducts)
router.get('/paging', productsController.page);
router.post('/add', productsController.addProduct);
module.exports = router;