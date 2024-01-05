const express = require("express");
const router = express.Router();
const productsController = require('../../controllers/adminController/productsController')
const upload = require("../../utils/multer");

router.get('/', productsController.showProducts)
router.get('/paging', productsController.page);
router.post('/add',upload.single("image"), productsController.addProduct);
router.get('/get-product', productsController.getProduct);
router.post('/update', upload.single("image"), productsController.updateProduct);
module.exports = router;