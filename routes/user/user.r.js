const express = require('express')
const route = express.Router();
const homeController = require('./../../controllers/userController/homeController.c')
const orderController = require('./../../controllers/userController/orderController.c')

route.get('/order', orderController.showOrder);
route.get('/', homeController.showHome);

module.exports = route;